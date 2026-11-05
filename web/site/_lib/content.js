// Reads the site content (markdown with YAML frontmatter) from web/content.
// Every loader returns plain objects shaped the way the templates expect.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const UNCATEGORIZED = "_uncategorized";

function readMarkdownFile(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
  return { ...data, bodyMarkdown: content.trim() };
}

function walkMarkdownFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walkMarkdownFiles(full);
    return entry.isFile() && entry.name.endsWith(".md") ? [full] : [];
  });
}

/** content/pages/about-us/index.md -> "about-us"; .../team.md -> "about-us/team" */
function pagePathFromFile(filePath) {
  const parsed = path.parse(path.relative(path.join(CONTENT_ROOT, "pages"), filePath));
  const dir = parsed.dir.replace(/\\/g, "/");
  if (parsed.name === "index") return dir;
  return dir ? `${dir}/${parsed.name}` : parsed.name;
}

/** News/events/products use their `slug:`; if it's missing, fall back to the file name. */
function slugFor(doc, file) {
  return doc.slug || path.parse(file).name;
}

const withLinkText = (section) =>
  section?._type === "pageLinks" && Array.isArray(section.pageLinks)
    ? {
        ...section,
        pageLinks: section.pageLinks.map((link) => ({
          ...link,
          linkText: link.linkTextMarkdown || link.linkText || null,
        })),
      }
    : section;

/** Pages filed under _uncategorized (never given a category in the old CMS) are not published. */
export function isPublished(page) {
  return page.categorySlug !== UNCATEGORIZED && !page.urlPath.split("/").includes(UNCATEGORIZED);
}

export function getAllPages() {
  return walkMarkdownFiles(path.join(CONTENT_ROOT, "pages"))
    .map((file) => {
      const doc = readMarkdownFile(file);
      if (!doc || doc.type !== "page") return null;
      return {
        ...doc,
        slug: doc.slug ? { current: doc.slug } : null,
        body: doc.bodyMarkdown || null,
        bannerMsg: doc.bannerMsg ? { ...doc.bannerMsg, Message: doc.bannerMsg.messageMarkdown || null } : null,
        content: (doc.content || []).map(withLinkText),
        urlPath: pagePathFromFile(file),
      };
    })
    .filter(Boolean);
}

/** Title + URL for every published page, used by the header search box. */
export function getSearchIndex(publishedPages) {
  return publishedPages.map((page) => ({ id: page.id, title: page.title, path: `/${page.urlPath}/` }));
}

export function getHomePage() {
  const doc = readMarkdownFile(path.join(CONTENT_ROOT, "home.md"));
  if (!doc) return null;
  return {
    ...doc,
    introText: doc.bodyMarkdown || null,
    latestNews: doc.latestNewsMarkdown || null,
    newsLinks: {
      newsLinks: (doc.newsLinks || []).map((post) => ({ ...post, excerpt: post.excerptMarkdown || null })),
    },
  };
}

export function getAllEvents() {
  return walkMarkdownFiles(path.join(CONTENT_ROOT, "events"))
    .map((file) => {
      const doc = readMarkdownFile(file);
      if (!doc) return null;
      return {
        ...doc,
        _id: doc.id,
        slug: { current: slugFor(doc, file) },
        excerpt: doc.excerptMarkdown || null,
        body: doc.bodyMarkdown || null,
      };
    })
    .filter(Boolean)
    .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
}

/**
 * News posts. A post's `event:` only stores the event's slug and title, so it is
 * replaced with the full event (date, location, cost...) from content/events.
 */
export function getAllNews(events = getAllEvents()) {
  const eventsBySlug = new Map(events.map((e) => [e.slug.current, e]));
  return walkMarkdownFiles(path.join(CONTENT_ROOT, "news"))
    .map((file) => {
      const doc = readMarkdownFile(file);
      if (!doc) return null;
      const eventSlug = doc.event?.slug?.current || doc.event?.slug;
      return {
        ...doc,
        _id: doc.id,
        slug: { current: slugFor(doc, file) },
        excerpt: doc.excerptMarkdown || null,
        body: doc.bodyMarkdown || null,
        event: doc.event ? eventsBySlug.get(eventSlug) || null : null,
        content: (doc.content || []).map(withLinkText),
      };
    })
    .filter(Boolean)
    .sort((a, b) => String(b.publishDate || "").localeCompare(String(a.publishDate || "")));
}

// Same order the old CMS used: newest publishDate first, then by document id
// (its default order, which is what applies when publishDate is empty).
function compareShopProducts(a, b) {
  const da = String(a.publishDate || "");
  const db = String(b.publishDate || "");
  if (da !== db) return db.localeCompare(da);
  const ia = String(a.id || "");
  const ib = String(b.id || "");
  return ia < ib ? -1 : ia > ib ? 1 : 0;
}

/** Shop products that aren't hidden, in shop order. Files without a slug are drafts. */
export function getShopProducts() {
  return walkMarkdownFiles(path.join(CONTENT_ROOT, "shop"))
    .map((file) => {
      const doc = readMarkdownFile(file);
      if (!doc || !doc.slug || doc.hide) return null;
      return { ...doc, _id: doc.id, slug: { current: doc.slug }, body: doc.bodyMarkdown || null };
    })
    .filter(Boolean)
    .sort(compareShopProducts);
}

export function getOurWork() {
  const doc = readMarkdownFile(path.join(CONTENT_ROOT, "our-work.md"));
  if (!doc) return null;
  return {
    body: doc.bodyMarkdown || null,
    ourWork: (doc.ourWork || []).map((item) => ({ ...item, body: item.bodyMarkdown || null })),
  };
}

export function getSiteSettings() {
  const filePath = path.join(CONTENT_ROOT, "site-settings.json");
  return fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, "utf8")) : {};
}

/** Every video URL used anywhere in the given documents. */
export function collectVideoUrls(...docs) {
  const urls = new Set();
  const visit = (v) => {
    if (Array.isArray(v)) v.forEach(visit);
    else if (v && typeof v === "object") {
      if (v._type === "video" && v.url) urls.add(v.url);
      Object.values(v).forEach(visit);
    }
  };
  docs.forEach(visit);
  return [...urls];
}

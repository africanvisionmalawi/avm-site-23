import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content");

function readMarkdownFile(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { ...data, bodyMarkdown: content.trim() };
}

function walkMarkdownFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkMarkdownFiles(full));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      results.push(full);
    }
  }
  return results;
}

function pagePathFromFile(filePath) {
  const rel = path.relative(path.join(CONTENT_ROOT, "pages"), filePath);
  const parsed = path.parse(rel);
  const dir = parsed.dir === "" ? "" : parsed.dir.replace(/\\/g, "/");
  const name = parsed.name;

  if (name === "index") {
    return dir; // e.g. about-us or about-us/team/staff-stories
  }
  return dir ? `${dir}/${name}` : name;
}

function normalizePage(doc) {
  if (!doc) return null;
  const content = (doc.content || []).map((section) => {
    if (!section) return section;
    if (section._type === "pageLinks" && Array.isArray(section.pageLinks)) {
      return {
        ...section,
        pageLinks: section.pageLinks.map((link) => ({
          ...link,
          // Components historically expected Portable Text in linkText;
          // we now pass markdown strings and render via MarkdownContent.
          linkText: link.linkTextMarkdown || link.linkText || null,
        })),
      };
    }
    if (section._type === "blockPortableText") {
      return {
        ...section,
        markdown: section.markdown || null,
      };
    }
    return section;
  });

  return {
    ...doc,
    slug: doc.slug ? { current: doc.slug } : null,
    body: doc.bodyMarkdown || null,
    bodyMarkdown: doc.bodyMarkdown || null,
    bannerMsg: doc.bannerMsg
      ? {
          ...doc.bannerMsg,
          Message: doc.bannerMsg.messageMarkdown || null,
        }
      : null,
    content,
  };
}

export function getAllPages() {
  const files = walkMarkdownFiles(path.join(CONTENT_ROOT, "pages"));
  return files
    .map((file) => {
      const doc = readMarkdownFile(file);
      if (!doc || doc.type !== "page") return null;
      const urlPath = pagePathFromFile(file);
      return {
        ...normalizePage(doc),
        urlPath,
        filePath: file,
      };
    })
    .filter(Boolean);
}

export function getPageByPath(fullPath) {
  const normalized = (fullPath || "").replace(/^\/|\/$/g, "");
  if (!normalized) return null;

  const pages = getAllPages();
  return pages.find((page) => page.urlPath === normalized) || null;
}

export function getPageStaticPaths() {
  return getAllPages()
    .filter((page) => page.categorySlug !== "_uncategorized")
    .map((page) => ({
      params: {
        slug: page.urlPath.split("/").filter(Boolean),
      },
    }));
}

export function getHomePage() {
  const doc = readMarkdownFile(path.join(CONTENT_ROOT, "home.md"));
  if (!doc) return null;
  return {
    ...doc,
    introText: doc.bodyMarkdown || null,
    latestNews: doc.latestNewsMarkdown || null,
    newsLinks: {
      newsLinks: (doc.newsLinks || []).map((post) => ({
        ...post,
        excerpt: post.excerptMarkdown || null,
      })),
    },
  };
}

export function getAllNews() {
  const files = walkMarkdownFiles(path.join(CONTENT_ROOT, "news"));
  return files
    .map((file) => {
      const doc = readMarkdownFile(file);
      if (!doc) return null;
      return {
        ...doc,
        _id: doc.id,
        slug: { current: doc.slug },
        excerpt: doc.excerptMarkdown || null,
        body: doc.bodyMarkdown || null,
        content: (doc.content || []).map((section) => {
          if (section?._type === "pageLinks") {
            return {
              ...section,
              pageLinks: (section.pageLinks || []).map((link) => ({
                ...link,
                linkText: link.linkTextMarkdown || link.linkText || null,
              })),
            };
          }
          return section;
        }),
      };
    })
    .filter(Boolean)
    .sort((a, b) => String(b.publishDate || "").localeCompare(String(a.publishDate || "")));
}

export function getNewsBySlug(slug) {
  return getAllNews().find((post) => post.slug?.current === slug) || null;
}

export function getAllEvents() {
  const files = walkMarkdownFiles(path.join(CONTENT_ROOT, "events"));
  return files
    .map((file) => {
      const doc = readMarkdownFile(file);
      if (!doc) return null;
      return {
        ...doc,
        _id: doc.id,
        slug: { current: doc.slug },
        excerpt: doc.excerptMarkdown || null,
        body: doc.bodyMarkdown || null,
      };
    })
    .filter(Boolean)
    .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
}

export function getEventBySlug(slug) {
  return getAllEvents().find((event) => event.slug?.current === slug) || null;
}

export function getAllShopProducts({ includeHidden = false } = {}) {
  const files = walkMarkdownFiles(path.join(CONTENT_ROOT, "shop"));
  return files
    .map((file) => {
      const doc = readMarkdownFile(file);
      if (!doc) return null;
      if (!includeHidden && doc.hide) return null;
      return {
        ...doc,
        _id: doc.id,
        slug: { current: doc.slug },
        body: doc.bodyMarkdown || null,
      };
    })
    .filter(Boolean)
    .sort((a, b) => String(a.title || "").localeCompare(String(b.title || "")));
}

export function getShopProductBySlug(slug) {
  return (
    getAllShopProducts({ includeHidden: true }).find(
      (product) => product.slug?.current === slug
    ) || null
  );
}

export function getOurWork() {
  const doc = readMarkdownFile(path.join(CONTENT_ROOT, "our-work.md"));
  if (!doc) return null;
  return {
    body: doc.bodyMarkdown || null,
    ourWork: (doc.ourWork || []).map((item) => ({
      ...item,
      body: item.bodyMarkdown || null,
    })),
  };
}

export function getSiteSettings() {
  const filePath = path.join(CONTENT_ROOT, "site-settings.json");
  if (!fs.existsSync(filePath)) return {};
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

export function getPageCacheEntries() {
  return getAllPages()
    .filter((page) => page.categorySlug !== "_uncategorized")
    .map((page) => ({
      id: page.id,
      title: page.title,
      path: `/${page.urlPath}/`,
    }));
}

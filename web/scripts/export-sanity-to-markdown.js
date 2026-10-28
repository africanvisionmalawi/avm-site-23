/**
 * One-time (re-runnable) export of Sanity text content → local markdown.
 * Image assets stay on Sanity; refs / CDN URLs are preserved in frontmatter.
 *
 * Usage: NEXT_PUBLIC_SANITY_PROJECT_ID=hh4wbbfo node scripts/export-sanity-to-markdown.js
 */
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const sanityClient = require("@sanity/client");
const imageUrlBuilder = require("@sanity/image-url");

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "hh4wbbfo";
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const CONTENT_ROOT = path.join(__dirname, "..", "content");

const client = sanityClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2023-01-01",
  useCdn: false,
});

const builder = imageUrlBuilder(client);

function urlFor(source) {
  try {
    return builder.image(source).auto("format").url();
  } catch {
    return null;
  }
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeMarkdown(filePath, data, body = "") {
  ensureDir(path.dirname(filePath));
  const cleaned = JSON.parse(
    JSON.stringify(data, (_, value) => (value === undefined ? undefined : value))
  );
  const output = matter.stringify(body.trim() + "\n", cleaned);
  fs.writeFileSync(filePath, output);
  console.log("Wrote", path.relative(CONTENT_ROOT, filePath));
}

function writeJson(filePath, data) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n");
  console.log("Wrote", path.relative(CONTENT_ROOT, filePath));
}

function getMarkDef(markDefs = [], key) {
  return (markDefs || []).find((m) => m._key === key);
}

function applyMarks(text, marks = [], markDefs = []) {
  if (!text) return "";
  let result = text.replace(/\\/g, "\\\\").replace(/\*/g, "\\*").replace(/_/g, "\\_");
  const markList = marks || [];

  for (const mark of markList) {
    if (mark === "strong") result = `**${result}**`;
    else if (mark === "em") result = `_${result}_`;
    else if (mark === "underline") result = `<u>${result}</u>`;
    else if (mark === "strike-through") result = `~~${result}~~`;
    else if (mark === "code") result = `\`${result}\``;
    else if (mark === "highlight") result = `**${result}**`;
    else {
      const def = getMarkDef(markDefs, mark);
      if (def?._type === "link" && def.href) {
        result = `[${result}](${def.href})`;
      } else if (def?._type === "internalLink" && def.reference) {
        const slug = def.reference.slug?.current || "";
        const category = def.reference.category?.slug?.current || "";
        const href = `/${category ? category + "/" : ""}${slug}/`;
        result = `[${result}](${href})`;
      }
    }
  }
  return result;
}

function childrenToMarkdown(children = [], markDefs = []) {
  return (children || [])
    .map((child) => {
      if (child._type !== "span") return "";
      return applyMarks(child.text || "", child.marks || [], markDefs);
    })
    .join("");
}

function imageToMarkdown(block) {
  const alt = block.alt || block.caption || "";
  const src = urlFor(block) || urlFor(block.asset) || "";
  if (!src) return "";
  const caption = block.caption ? `\n*${block.caption}*\n` : "\n";
  return `![${alt}](${src})${caption}`;
}

function blockToMarkdown(block) {
  if (!block) return "";

  if (block._type === "mainImage" || block._type === "image" || block._type === "figure") {
    return imageToMarkdown(block);
  }
  if (block._type === "video") {
    const url = block.url || "";
    const text = block.text || "Video";
    return url ? `[${text}](${url})\n` : "";
  }
  if (block._type === "pdf") {
    const desc = block.description || "PDF";
    const fileUrl = block.asset?.url || "";
    return fileUrl ? `[${desc}](${fileUrl})\n` : `*${desc}*\n`;
  }
  if (block._type !== "block") {
    return "";
  }

  const text = childrenToMarkdown(block.children, block.markDefs);
  const style = block.style || "normal";

  if (block.listItem === "bullet") {
    const indent = "  ".repeat((block.level || 1) - 1);
    return `${indent}- ${text}`;
  }
  if (block.listItem === "number") {
    const indent = "  ".repeat((block.level || 1) - 1);
    return `${indent}1. ${text}`;
  }

  switch (style) {
    case "h1":
      return `# ${text}`;
    case "h2":
      return `## ${text}`;
    case "h3":
      return `### ${text}`;
    case "h4":
      return `#### ${text}`;
    case "blockquote":
      return `> ${text}`;
    default:
      return text;
  }
}

function portableTextToMarkdown(blocks) {
  if (!blocks) return "";
  if (typeof blocks === "string") return blocks;
  if (!Array.isArray(blocks)) return "";

  const lines = [];
  for (const block of blocks) {
    const md = blockToMarkdown(block);
    if (md !== "") lines.push(md);
  }
  return lines.join("\n\n").replace(/\n{3,}/g, "\n\n").trim();
}

/** Keep Sanity image shape for the existing Image / Hero components */
function keepImage(image) {
  if (!image) return null;
  return image;
}

function convertContentSections(content) {
  if (!Array.isArray(content)) return [];
  return content.map((section) => {
    if (!section) return section;
    const next = {
      _key: section._key,
      _type: section._type,
      disabled: section.disabled || false,
    };

    if (section._type === "blockPortableText") {
      next.markdown = portableTextToMarkdown(section.blocks);
    }

    if (section._type === "pageLinks") {
      next.displayHeading = section.displayHeading || false;
      next.heading = section.heading || null;
      next.pageLinks = (section.pageLinks || []).map((link) => {
        const converted = {
          _key: link._key,
          _type: link._type,
          featured: !!link.featured,
          hideLink: !!link.hideLink,
          linkTitle: link.linkTitle || null,
          extUrl: link.extUrl || null,
          photo: slimImage(link.photo),
          linkTextMarkdown: portableTextToMarkdown(link.linkText),
        };
        if (link.url) {
          converted.url = {
            slug: asSlug(link.url.slug),
            indexPage: !!link.url.indexPage,
            category: link.url.category
              ? {
                  title: link.url.category.title || null,
                  slug: asSlug(link.url.category.slug),
                }
              : null,
          };
        }
        return converted;
      });
    }

    if (section._type === "team") {
      next.heading = section.heading || null;
      next.team = (section.team || []).map((m) => ({
        _key: m._key,
        name: m.name || null,
        role: m.role || null,
        photo: slimImage(m.photo),
      }));
    }

    if (section._type === "hero") {
      next.title = section.title || null;
      next.image = slimImage(section.image);
      next.mobileImage = slimImage(section.mobileImage);
    }

    if (section._type === "photoGallery") {
      next.photos = (section.photos || []).map((p) => slimImage(p));
    }

    if (section._type === "videoGallery") {
      next.videos = section.videos || section.items || null;
      next.title = section.title || null;
      // keep remaining useful fields
      Object.keys(section).forEach((key) => {
        if (!(key in next) && !["blocks", "image", "mobileImage", "photos", "members", "pageLinks"].includes(key)) {
          next[key] = section[key];
        }
      });
    }

    if (section._type === "googlemap") {
      next.url = section.url || null;
      next.text = section.text || null;
    }

    if (section._type === "homePageSection") {
      next.introTextMarkdown = portableTextToMarkdown(section.introText);
      next.promoVideo = section.promoVideo || null;
    }

    if (section._type === "ourWorkSelect") {
      next.showOurWork = section.showOurWork;
    }

    return next;
  });
}

function convertBannerMsg(bannerMsg) {
  if (!bannerMsg) return null;
  return {
    source: bannerMsg.source || null,
    messageMarkdown: portableTextToMarkdown(bannerMsg.Message),
  };
}

/** Keep only the fields imageBuilder needs */
function slimImage(image) {
  if (!image) return null;
  const asset = image.asset;
  const ref =
    asset?._ref ||
    (asset?._id && asset._id.startsWith("image-") ? asset._id : null) ||
    (typeof asset === "string" ? asset : null);
  if (!ref && !asset) return image;
  return {
    _type: image._type || "figure",
    alt: image.alt || null,
    caption: image.caption || null,
    crop: image.crop || null,
    hotspot: image.hotspot || null,
    asset: ref
      ? { _type: "reference", _ref: ref.startsWith("image-") ? ref : `image-${ref}` }
      : asset,
  };
}

function slimHero(hero) {
  if (!hero) return null;
  return {
    _type: hero._type || "hero",
    image: slimImage(hero.image),
    mobileImage: slimImage(hero.mobileImage),
  };
}

function asSlug(value) {
  if (!value) return null;
  if (typeof value === "string") return { _type: "slug", current: value };
  if (value.current) return { _type: "slug", current: value.current };
  return value;
}

async function exportPages() {
  const pages = await client.fetch(`*[_type == "page"]{
    _id,
    title,
    pageHeading,
    description,
    indexPage,
    "slug": slug.current,
    "categoryTitle": category->title,
    "categorySlug": category->slug.current,
    hero,
    bannerMsg,
    body[]{ ..., asset-> },
    content[]{
      ...,
      pageLinks[]{
        ...,
        url->{
          "slug": slug.current,
          indexPage,
          category->{"slug": slug.current, title}
        }
      },
      photos[]{ ..., asset-> },
      image{ ..., asset-> },
      mobileImage{ ..., asset-> },
      team[]{ ..., photo{ ..., asset-> } },
      videos[]{ ... },
      blocks[]{ ..., asset-> }
    }
  }`);

  for (const page of pages) {
    const category = page.categorySlug || "_uncategorized";
    const slug = page.indexPage ? "index" : page.slug || page._id;
    const body = portableTextToMarkdown(page.body);
    const frontmatter = {
      type: "page",
      id: page._id,
      title: page.title || "",
      pageHeading: page.pageHeading || null,
      description: page.description || null,
      indexPage: !!page.indexPage,
      slug: page.slug || null,
      categoryTitle: page.categoryTitle || null,
      categorySlug: page.categorySlug || null,
      hero: slimHero(page.hero),
      bannerMsg: convertBannerMsg(page.bannerMsg),
      content: convertContentSections(page.content),
    };
    writeMarkdown(path.join(CONTENT_ROOT, "pages", category, `${slug}.md`), frontmatter, body);
  }
}

async function exportHome() {
  const home = await client.fetch(`*[_type == "homePage"][0]{
    title,
    subTitle,
    description,
    hero,
    introText,
    promoVideo,
    latestNews,
    newsLinks{
      _type,
      newsLinks[]{
        ...,
        url->{
          title,
          "slug": slug.current,
          publishDate,
          excerpt,
          photo
        }
      }
    },
    content[]{
      ...,
      blocks[]{ ..., asset-> }
    }
  }`);

  if (!home) return;

  const body = portableTextToMarkdown(home.introText);
  // Flatten news links so CardPost can read title/slug/excerpt/photo at the top level
  const newsLinks = (home.newsLinks?.newsLinks || [])
    .map((link) => {
      const article = link.url;
      if (!article) return null;
      return {
        _key: link._key,
        title: article.title || "",
        slug: asSlug(article.slug),
        publishDate: article.publishDate || null,
        photo: slimImage(article.photo),
        excerptMarkdown: portableTextToMarkdown(article.excerpt),
      };
    })
    .filter(Boolean);

  writeMarkdown(
    path.join(CONTENT_ROOT, "home.md"),
    {
      type: "homePage",
      title: home.title || "",
      subTitle: home.subTitle || null,
      description: home.description || null,
      hero: slimHero(home.hero),
      promoVideo: home.promoVideo || null,
      latestNewsMarkdown: portableTextToMarkdown(home.latestNews),
      newsLinks,
      content: convertContentSections(home.content),
    },
    body
  );
}

async function exportNews() {
  const posts = await client.fetch(`*[_type == "news"] | order(publishDate desc){
    _id,
    title,
    description,
    "slug": slug.current,
    publishDate,
    excerpt,
    hideHeaderPhoto,
    photo,
    tags,
    pageHeading,
    body[]{ ..., asset-> },
    content[]{
      ...,
      pageLinks[]{
        ...,
        url->{
          "slug": slug.current,
          indexPage,
          category->{"slug": slug.current, title}
        }
      },
      photos[]{ ..., asset-> },
      image{ ..., asset-> },
      blocks[]{ ..., asset-> }
    },
    event->{"slug": slug.current, title}
  }`);

  for (const post of posts) {
    const body = portableTextToMarkdown(post.body);
    writeMarkdown(
      path.join(CONTENT_ROOT, "news", `${post.slug || post._id}.md`),
      {
        type: "news",
        id: post._id,
        title: post.title || "",
        description: post.description || null,
        slug: post.slug,
        publishDate: post.publishDate || null,
        excerptMarkdown: portableTextToMarkdown(post.excerpt),
        hideHeaderPhoto: !!post.hideHeaderPhoto,
        photo: slimImage(post.photo),
        tags: post.tags || [],
        pageHeading: post.pageHeading || null,
        content: convertContentSections(post.content),
        event: post.event || null,
      },
      body
    );
  }
}

async function exportEvents() {
  const events = await client.fetch(`*[_type == "event"] | order(date desc){
    _id,
    title,
    "slug": slug.current,
    publishDate,
    excerpt,
    body[]{ ..., asset-> },
    date,
    endDate,
    allDay,
    hideTime,
    featured_image,
    noHero,
    tag,
    location,
    contact,
    telephone,
    cost,
    url,
    description
  }`);

  for (const event of events) {
    const body = portableTextToMarkdown(event.body);
    writeMarkdown(
      path.join(CONTENT_ROOT, "events", `${event.slug || event._id}.md`),
      {
        type: "event",
        id: event._id,
        title: event.title || "",
        description: event.description || null,
        slug: event.slug,
        publishDate: event.publishDate || null,
        excerptMarkdown: portableTextToMarkdown(event.excerpt),
        date: event.date || null,
        endDate: event.endDate || null,
        allDay: !!event.allDay,
        hideTime: !!event.hideTime,
        featured_image: slimImage(event.featured_image),
        noHero: !!event.noHero,
        tag: event.tag || null,
        location: event.location || null,
        contact: event.contact || null,
        telephone: event.telephone || null,
        cost: event.cost || null,
        url: event.url || null,
      },
      body
    );
  }
}

async function exportShop() {
  const products = await client.fetch(`*[_type == "shop"] | order(title asc){
    _id,
    title,
    description,
    "slug": slug.current,
    publishDate,
    hide,
    inStock,
    price,
    salePrice,
    tags,
    photoGallery,
    name,
    url,
    weight,
    length,
    width,
    height,
    body[]{ ..., asset-> }
  }`);

  for (const product of products) {
    const body = portableTextToMarkdown(product.body);
    writeMarkdown(
      path.join(CONTENT_ROOT, "shop", `${product.slug || product._id}.md`),
      {
        type: "shop",
        id: product._id,
        title: product.title || "",
        description: product.description || null,
        slug: product.slug,
        publishDate: product.publishDate || null,
        hide: !!product.hide,
        inStock: product.inStock,
        price: product.price,
        salePrice: product.salePrice,
        tags: product.tags || [],
        photoGallery: product.photoGallery
          ? {
              ...product.photoGallery,
              photos: (product.photoGallery.photos || []).map((p) => slimImage(p)),
            }
          : null,
        name: product.name || null,
        url: product.url || null,
        weight: product.weight || null,
        length: product.length || null,
        width: product.width || null,
        height: product.height || null,
      },
      body
    );
  }
}

async function exportOurWork() {
  const doc = await client.fetch(`*[_type == "ourWorkShared"][0]{
    body,
    ourWork[]{
      _key,
      _type,
      title,
      slug,
      body,
      photo,
      url->{
        "slug": slug.current,
        indexPage,
        category->{"slug": slug.current, title}
      }
    }
  }`);

  if (!doc) return;

  const ourWork = (doc.ourWork || []).map((item) => ({
    _key: item._key,
    _type: item._type,
    title: item.title || "",
    slug: asSlug(item.slug),
    bodyMarkdown: portableTextToMarkdown(item.body),
    photo: slimImage(item.photo),
    url: item.url || null,
  }));

  writeMarkdown(
    path.join(CONTENT_ROOT, "our-work.md"),
    {
      type: "ourWorkShared",
      ourWork,
    },
    portableTextToMarkdown(doc.body)
  );
}

async function exportSettingsAndCategories() {
  const settings = await client.fetch(`*[_type == "siteSettings"][0]{
    meta_title,
    meta_description,
    shopTags
  }`);
  writeJson(path.join(CONTENT_ROOT, "site-settings.json"), settings || {});

  const categories = await client.fetch(`*[_type == "pageCategory"]{
    title,
    "slug": slug.current
  }`);
  writeJson(path.join(CONTENT_ROOT, "categories.json"), categories || []);
}

async function main() {
  ensureDir(CONTENT_ROOT);
  console.log(`Exporting from Sanity project ${PROJECT_ID}/${DATASET} → ${CONTENT_ROOT}`);
  await exportPages();
  await exportHome();
  await exportNews();
  await exportEvents();
  await exportShop();
  await exportOurWork();
  await exportSettingsAndCategories();
  console.log("Export complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

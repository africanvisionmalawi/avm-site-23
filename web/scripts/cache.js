const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const PAGES_DIR = path.join(__dirname, "..", "content", "pages");

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
  const rel = path.relative(PAGES_DIR, filePath);
  const parsed = path.parse(rel);
  const dir = parsed.dir === "" ? "" : parsed.dir.replace(/\\/g, "/");
  const name = parsed.name;
  if (name === "index") return dir;
  return dir ? `${dir}/${name}` : name;
}

function getPages() {
  const pages = walkMarkdownFiles(PAGES_DIR)
    .map((file) => {
      const raw = fs.readFileSync(file, "utf8");
      const { data } = matter(raw);
      if (data.categorySlug === "_uncategorized") return null;
      const urlPath = pagePathFromFile(file);
      return {
        id: data.id,
        title: data.title,
        path: `/${urlPath}/`,
      };
    })
    .filter(Boolean);

  return JSON.stringify(pages);
}

function writePages() {
  const allPages = getPages();
  const fileContents = `export const pages = ${allPages}`;

  try {
    fs.readdirSync("cache");
  } catch (e) {
    fs.mkdirSync("cache");
  }

  fs.writeFile("cache/data.js", fileContents, function(err) {
    if (err) return console.log(err);
    console.log("Page data cached.");
  });
}

writePages();

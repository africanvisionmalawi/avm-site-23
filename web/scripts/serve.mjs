// Minimal static server for the built site with Netlify-style clean URLs:
// /about-us/team -> about-us/team.html. Usage: node scripts/serve.mjs [port] [dir]
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.argv[3] || "_site");
const port = Number(process.argv[2] || 8080);
const types = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".json": "application/json",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif",
  ".webp": "image/webp", ".woff2": "font/woff2", ".pdf": "application/pdf", ".ico": "image/x-icon", ".xml": "application/xml",
};

http
  .createServer((req, res) => {
    let urlPath;
    try {
      urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname).replace(/\/$/, "") || "/index";
    } catch {
      return res.writeHead(400).end("Bad request");
    }
    const base = path.join(root, path.normalize(urlPath));
    if (!base.startsWith(root)) return res.writeHead(403).end();
    const file = [base, `${base}.html`, path.join(base, "index.html")].find(
      (f) => fs.existsSync(f) && fs.statSync(f).isFile()
    );
    if (!file) {
      const notFound = path.join(root, "404.html");
      res.writeHead(404, { "Content-Type": types[".html"] });
      return res.end(fs.existsSync(notFound) ? fs.readFileSync(notFound) : "Not found");
    }
    res.writeHead(200, { "Content-Type": types[path.extname(file).toLowerCase()] || "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  })
  .listen(port, () => console.log(`Serving _site at http://localhost:${port}`));

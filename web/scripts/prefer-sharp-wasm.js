/**
 * On Netlify, remove native Linux sharp binaries so the sharp package
 * falls back to @img/sharp-wasm32 (WebAssembly), which works in serverless.
 */
const fs = require("fs");
const path = require("path");

if (!process.env.NETLIFY) {
  process.exit(0);
}

const imgDir = path.join(__dirname, "..", "node_modules", "@img");

if (!fs.existsSync(imgDir)) {
  process.exit(0);
}

for (const entry of fs.readdirSync(imgDir)) {
  if (/^sharp-linux|^sharp-linuxmusl/.test(entry)) {
    fs.rmSync(path.join(imgDir, entry), { recursive: true, force: true });
    console.log(`Removed native sharp binary: @img/${entry}`);
  }
}

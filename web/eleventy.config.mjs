// Event dates/times and "today" (upcoming vs past events) are UK time, whatever
// timezone the build machine uses (Netlify builds in UTC).
process.env.TZ = "Europe/London";

import fs from "node:fs";
import path from "node:path";
import browserslist from "browserslist";
import { bundle, browserslistToTargets } from "lightningcss";
import markdownIt from "markdown-it";
import { img, resizedUrl, srcset, generateImages } from "./site/_lib/image.js";

const md = markdownIt({ html: true, breaks: true, linkify: true, typographer: true });
const cssTargets = browserslistToTargets(browserslist("defaults"));

function buildCss(outputDir) {
  const { code } = bundle({
    filename: "site/css/site.css",
    minify: true,
    targets: cssTargets,
  });
  fs.mkdirSync(path.join(outputDir, "css"), { recursive: true });
  fs.writeFileSync(path.join(outputDir, "css/site.css"), code);
}

export default function (eleventyConfig) {
  // Static files: everything in public/ is served from the site root.
  eleventyConfig.addPassthroughCopy({ public: "/" });
  eleventyConfig.addPassthroughCopy({ "site/fonts": "fonts" });
  eleventyConfig.addPassthroughCopy({ "site/js": "js" });

  // CSS: site/css/site.css (global.css + the component styles), flattened and minified.
  eleventyConfig.addWatchTarget("site/css/");
  eleventyConfig.on("eleventy.before", ({ directories }) => buildCss(directories.output));

  // Resized images are generated once the pages have said which ones they need.
  eleventyConfig.on("eleventy.after", async ({ directories }) => {
    const n = await generateImages(directories.output);
    console.log(`[image] ${n} source images processed`);
  });

  // Content is read from ../content by site/_lib/content.js.
  eleventyConfig.addWatchTarget("content/");

  eleventyConfig.addFilter("md", (s) => (typeof s === "string" && s ? md.render(s) : ""));
  eleventyConfig.addFilter("img", img);
  eleventyConfig.addFilter("resizedUrl", resizedUrl);
  eleventyConfig.addFilter("srcset", srcset);
  eleventyConfig.addFilter("price", (p) => (p ? Number(p).toFixed(2) : "0.00"));
  eleventyConfig.addFilter("json", (v) => JSON.stringify(v));
  eleventyConfig.addFilter("featured", (links = [], featured) =>
    links.filter((e) => (featured ? e.featured === true : !e.featured))
  );
  eleventyConfig.addGlobalData("currentYear", () => String(new Date().getFullYear()));

  return {
    dir: { input: "site", output: "_site", includes: "_includes", data: "_data" },
    templateFormats: ["njk", "11ty.js"],
    htmlTemplateEngine: "njk",
  };
}

// Responsive images for local files in public/images.
//
// Templates call the `img` filter, which returns <img> markup matching what the
// old next/image component produced (same sizing/cropping behaviour) and records
// which resized versions are needed. `generateImages()` creates them after the build.
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import Image from "@11ty/eleventy-img";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const OUT_URL = "/img/opt";
const QUALITY = 60;
// Same breakpoints next/image used for full-width ("fill") images.
const FILL_WIDTHS = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

const jobs = new Map(); // src -> Set(widths)

const escapeAttr = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");

const hashOf = (src) => crypto.createHash("sha1").update(src).digest("hex").slice(0, 10);

function canResize(src) {
  return /\.(jpe?g|png|webp)$/i.test(src);
}

/** URL of a resized WebP version of `src` (queues it for generation). */
export function resizedUrl(src, width, intrinsicWidth) {
  if (!src || !canResize(src)) return src;
  const w = Math.round(intrinsicWidth ? Math.min(width, intrinsicWidth) : width);
  if (!jobs.has(src)) jobs.set(src, new Set());
  jobs.get(src).add(w);
  return `${OUT_URL}/${path.parse(src).name}-${hashOf(src)}-${w}.webp`;
}

/** "url 640w, url 1080w" for the given widths, never upscaling. */
export function srcset(src, widths, intrinsicWidth) {
  const usable = [...new Set(widths.map((w) => (intrinsicWidth ? Math.min(w, intrinsicWidth) : w)))];
  return usable.map((w) => `${resizedUrl(src, w, intrinsicWidth)} ${w}w`).join(", ");
}

const styleString = (obj) =>
  Object.entries(obj)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${k.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase())}:${v}`)
    .join(";");

/**
 * image: { src, width, height, alt, focus }
 * opts:  { maxWidth, maxHeight, fill, sizes, style, className, alt, priority }
 */
export function img(image, opts = {}) {
  if (!image?.src) return "";
  const { maxWidth, maxHeight, fill = false, sizes, style = {}, className = "", priority = false } = opts;
  const alt = opts.alt || image.alt || "";
  const aspect = image.width && image.height ? image.height / image.width : undefined;

  let width = maxWidth || image.width;
  let height = maxHeight;
  if (!height && width && aspect) height = Math.round(width * aspect);
  if (!width && height && aspect) width = Math.round(height / aspect);
  const cropped = Boolean(maxWidth && maxHeight);

  const css = {
    ...(fill
      ? { position: "absolute", height: "100%", width: "100%", left: 0, top: 0, right: 0, bottom: 0 }
      : {}),
    ...(cropped || fill ? { objectFit: "cover" } : {}),
    color: "transparent",
    ...(cropped && !fill ? { aspectRatio: `${width} / ${height}` } : {}),
    ...(image.focus ? { objectPosition: image.focus } : {}),
    ...style,
  };

  let srcAttr = image.src;
  let srcsetAttr = "";
  if (canResize(image.src)) {
    if (fill || sizes) {
      const widths = fill ? FILL_WIDTHS : [width, width * 2, width * 3].map(Math.round);
      srcsetAttr = srcset(image.src, widths, image.width);
      srcAttr = resizedUrl(image.src, fill ? 3840 : width * 2, image.width);
    } else {
      // Fixed size image: 1x and 2x versions.
      const one = resizedUrl(image.src, width, image.width);
      const two = resizedUrl(image.src, width * 2, image.width);
      srcsetAttr = one === two ? "" : `${one} 1x, ${two} 2x`;
      srcAttr = two;
    }
  }

  const attrs = [
    `alt="${escapeAttr(alt)}"`,
    priority ? `fetchpriority="high"` : `loading="lazy"`,
    fill ? "" : `width="${width}" height="${height}"`,
    `decoding="async"`,
    className ? `class="${escapeAttr(className)}"` : "",
    `style="${escapeAttr(styleString(css))}"`,
    sizes ? `sizes="${escapeAttr(sizes)}"` : "",
    srcsetAttr ? `srcset="${escapeAttr(srcsetAttr)}"` : "",
    `src="${escapeAttr(srcAttr)}"`,
  ].filter(Boolean);
  return `<img ${attrs.join(" ")}>`;
}

/** Create every resized image requested during the build. */
export async function generateImages(outputDir) {
  const outDir = path.join(outputDir, OUT_URL);
  const tasks = [...jobs].map(async ([src, widths]) => {
    const input = path.join(PUBLIC_DIR, src);
    if (!fs.existsSync(input)) {
      console.warn(`[image] missing ${src}`);
      return;
    }
    const name = `${path.parse(src).name}-${hashOf(src)}`;
    const todo = [...widths].filter((w) => !fs.existsSync(path.join(outDir, `${name}-${w}.webp`)));
    if (!todo.length) return;
    await Image(input, {
      widths: todo,
      formats: ["webp"],
      outputDir: outDir,
      sharpWebpOptions: { quality: QUALITY },
      filenameFormat: (id, s, w) => `${name}-${w}.webp`,
    });
  });
  await Promise.all(tasks);
  return jobs.size;
}

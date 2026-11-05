// All site content, loaded once per build. Templates read it as `db.*`.
import Fetch from "@11ty/eleventy-fetch";
import {
  getAllPages,
  getAllNews,
  getAllEvents,
  getShopProducts,
  getHomePage,
  getOurWork,
  getSiteSettings,
  getSearchIndex,
  isPublished,
  collectVideoUrls,
} from "../_lib/content.js";

function youTubeId(url) {
  const parts = url.replace(/(>|<)/gi, "").split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return parts[2] !== undefined ? parts[2].split(/[^0-9a-z_\-]/i)[0] : url;
}

/** Embed id + thumbnail for a video URL. Vimeo needs an oEmbed lookup (cached for 30 days). */
async function videoInfo(url) {
  if (/youtube|youtu\.be/.test(url)) {
    const id = youTubeId(url);
    return { type: "youtube", id, baseUrl: "//www.youtube.com/embed/", thumbnail: `//img.youtube.com/vi/${id}/0.jpg` };
  }
  try {
    const vid = await Fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}`, {
      duration: "30d",
      type: "json",
    });
    return { type: "vimeo", id: vid.video_id, baseUrl: "https://player.vimeo.com/video/", thumbnail: vid.thumbnail_url };
  } catch (e) {
    console.warn(`[videos] could not fetch ${url}: ${e.message}`);
    return { type: "vimeo", id: url.split("/").pop(), baseUrl: "https://player.vimeo.com/video/", thumbnail: "" };
  }
}

export default async function () {
  const publishedPages = getAllPages().filter(isPublished);
  const events = getAllEvents();
  const news = getAllNews(events);
  const home = getHomePage();

  const videoUrls = collectVideoUrls(publishedPages, news, events, home);
  const videos = Object.fromEntries(await Promise.all(videoUrls.map(async (u) => [u, await videoInfo(u)])));

  return {
    publishedPages,
    news,
    events,
    products: getShopProducts(),
    home,
    ourWork: getOurWork(),
    settings: getSiteSettings(),
    searchIndex: getSearchIndex(publishedPages),
    videos,
  };
}

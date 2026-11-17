// Helpers and derived data for the home, news, news archive and events pages.
// Note: the upcoming/past event split uses the build date, so schedule a daily build.
// The date logic is copied verbatim from the Next.js components/pages so the
// output is identical (including its quirks, e.g. dayjs(undefined) = "now").
import fs from "node:fs";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat.js";
import { format, isValid, parseISO } from "date-fns";
import matter from "gray-matter";
import markdownIt from "markdown-it";
import { walkMarkdownFiles } from "../_lib/content.js";

dayjs.extend(advancedFormat);

// components/common/EventDate.jsx and components/events/EventDate.js (identical logic).
function eventDateString(date, endDate, allDay, hideTime) {
  let dateString = "";
  let timeString = "";
  let timeStringEnd = "";
  if (
    endDate != null &&
    dayjs(endDate, "MMMM DD, YYYY").isAfter(dayjs(date).format("MMMM DD, YYYY"), "day")
  ) {
    if (allDay === false && hideTime === false) {
      timeString = ", " + dayjs(date).format("HH:mm") + " to " + dayjs(endDate).format("HH:mm");
    }
    dateString =
      dayjs(date).format("Do MMMM ") + " to " + dayjs(endDate).format("Do MMMM, YYYY") + timeString;
  } else {
    if (allDay === false && hideTime === false) {
      if (
        dayjs(endDate, "MMMM DD, YYYY").isAfter(dayjs(date).format("MMMM DD, YYYY"), "hour")
      ) {
        timeStringEnd = " to " + dayjs(endDate).format("HH:mm");
      }
      timeString = " at " + dayjs(date).format("HH:mm") + timeStringEnd;
    }
    dateString = dayjs(date).format("Do MMMM, YYYY ") + timeString;
  }
  return dateString;
}

// The upcoming/past split used by pages/events/index.jsx and PageIndex.jsx.
function isFuture(event) {
  const d = event.endDate ? event.endDate : event.date;
  return dayjs(d, "MMMM DD, YYYY").isAfter(dayjs().format("MMMM DD, YYYY"));
}

// pages/news/archive: markdown posts in newsposts/, newest first. Posts without a
// valid date are skipped (with a warning) rather than failing the whole build.
function archiveList() {
  return walkMarkdownFiles("newsposts")
    .map((slug) => {
      const { data, content } = matter(fs.readFileSync(slug, "utf8"));
      const parsed = data.date ? parseISO(data.date instanceof Date ? data.date.toISOString() : String(data.date)) : null;
      if (!parsed || !isValid(parsed)) {
        console.warn(`[newsposts] skipping ${slug}: missing or invalid date`);
        return null;
      }
      const date = format(parsed, "MMMM dd, yyyy");
      return { slug, data, frontmatter: { ...data, date }, content };
    })
    .filter(Boolean)
    .sort((post1, post2) =>
      new Date(post1.frontmatter.date) > new Date(post2.frontmatter.date) ? -1 : 1
    );
}

// pages/news/archive/[...slug].jsx renders with its own markdown-it options
// (no `breaks`, unlike the site-wide `md` filter), so archive posts match the old site.
const archiveMd = markdownIt({ html: true, linkify: true, typographer: true });

// Reuses the posts already read by archiveList(). As on the old site, the page uses
// the raw (not date-formatted) frontmatter and its URL comes from `path`.
function archivePosts(list) {
  return list.map(({ data: frontmatter, content }) => ({
    slug: decodeURI(frontmatter.path).replace(/newsposts\//, "").replace(/\.md/, ""),
    frontmatter,
    html: archiveMd.render(content.replace("http://www.africanvision.org.uk", ``)),
    canonical: `/news/archive/${frontmatter.path.replace(/\/posts\//, "")}`,
  }));
}

function splitEvents(events) {
  const future = [];
  const past = [];
  (events || []).forEach((event) => (isFuture(event) ? future : past).push(event));
  return { future, past };
}

export default function () {
  const archive = archiveList();
  return {
    eventDateString,
    splitEvents,
    archive,
    archivePosts: archivePosts(archive),
  };
}

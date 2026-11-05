// Helpers and derived data for the home, news, news archive and events pages.
// Note: the upcoming/past event split uses the build date, so schedule a daily build.
// The date logic is copied verbatim from the Next.js components/pages so the
// output is identical (including its quirks, e.g. dayjs(undefined) = "now").
import fs, { readdirSync } from "node:fs";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat.js";
import { format, parseISO } from "date-fns";
import matter from "gray-matter";
import markdownIt from "markdown-it";

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

// pages/news/archive: list of markdown posts in newsposts/, same reading and sorting code.
function getFileList(dirName) {
  let files = [];
  const items = readdirSync(dirName);
  for (const item of items) {
    if (fs.statSync(dirName + "/" + item).isDirectory()) {
      files = [...files, ...getFileList(`${dirName}/${item}`)];
    } else {
      files.push(`${dirName}/${item}`);
    }
  }
  return files;
}

function archiveList() {
  return getFileList("newsposts")
    .map((slug) => {
      const { data, content } = matter(fs.readFileSync(slug, "utf8"));
      const date = format(parseISO(data.date), "MMMM dd, yyyy");
      return { slug, frontmatter: { ...data, date }, content };
    })
    .sort((post1, post2) =>
      new Date(post1.frontmatter.date) > new Date(post2.frontmatter.date) ? -1 : 1
    );
}

// pages/news/archive/[...slug].jsx renders with its own markdown-it instance (no `breaks`).
const archiveMd = markdownIt({ html: true, linkify: true, typographer: true });

function archivePosts(list) {
  // getStaticPaths
  const slugs = list.map((post) =>
    decodeURI(post.frontmatter.path).replace(/newsposts\//, "").replace(/\.md/, "")
  );
  // getStaticProps (reads the file again; frontmatter is NOT date-formatted here)
  return slugs.map((slug) => {
    const { data: frontmatter, content } = matter(fs.readFileSync(`newsposts/${slug}.md`, "utf-8"));
    return {
      slug,
      frontmatter,
      html: archiveMd.render(content.replace("http://www.africanvision.org.uk", ``)),
      canonical: `/news/archive/${frontmatter.path.replace(/\/posts\//, "")}`,
    };
  });
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

import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

export const getFeaturedLinks = (array, featured) => {
  // this gets both featued and non featured links, depending on the value of
  // the second element passed in
  // console.log("array ", array);
  // console.log("featured ", featured);
  let featuredLinks = array.filter((e) => e.featured === featured);
  return featuredLinks;
};

/**
 * Returns the current date in YYYY-MM-DD format
 */
export const getCurrentDate = () => {
  const d = new Date();
  let month = (d.getMonth() + 1).toString();
  if (month.length < 2) {
    month = `0${month}`;
  }
  let day = d.getDate().toString();
  if (day.length < 2) {
    day = `0${day}`;
  }
  return `${d.getFullYear()}-${month}-${day}`;
};

/**
 * Returns the current date in YYYY-MM-DD format
 */
export const getCurrentYear = () => {
  const d = new Date();
  return `${d.getFullYear()}`;
};

export const getEvents = (events) => {
  let futureEvents = [];
  let pastEvents = [];
  events.foreach(({ node: event }) => {
    if (
      dayjs(event.frontmatter.date, "MMMM DD, YYYY").isAfter(
        dayjs().format("MMMM DD, YYYY")
      )
    ) {
      futureEvents.push(event);
    } else {
      pastEvents.push(event);
    }
    const showEvents = { futureEvents, pastEvents };
    return showEvents;
  });
};

export const priceFormatted = (price) => {
  if (price) {
    return price.toFixed(2);
  }
  return 0.0;
};

export const slugToTitle = (slug) => {
  return slug.replace("-", " ");
};

export const getPath = (cat, slug) => {
  if (cat && slug) {
    const pathPrefix = cat === "other" ? "/" : cat + "/";
    const path = `/${pathPrefix}${slug === cat ? "" : slug + "/"}`;
    // const path = pathPrefix + cat === slug ? "/" : slug;
    return path;
  }
  return null;
};

// in post.js

export default {
  title: "Page Links",
  name: "pageLinks",
  type: "object",
  fields: [
    {
      type: "array",
      name: "pageLinks",
      of: [{ type: "pageLinkPhoto" }],
    },
    {
      title: "Hide page link",
      name: "hidePageLink",
      type: "boolean",
    },
    {
      title: "Hide Headings",
      name: "hideHeadings",
      type: "boolean",
    },
    {
      title: "Remove Box Background",
      name: "removeBoxBackground",
      type: "boolean",
    },
  ],
  options: {
    collapsible: true,
    collapsed: true,
  },
  preview: {
    select: {
      title: "Page Links (click to view)",
      // pageLink0: "pageLinkPhoto.0.linkTitle", // <- authors.0 is a reference to author, and the preview component will automatically resolve the reference and return the name
      // pageLink1: "pageLinkPhoto.1.linkTitle",
      // pageLink2: "pageLinkPhoto.2.linkTitle",
      // pageLink3: "pageLinkPhoto.3.linkTitle",
    },
    // prepare: ({ title, pageLink0 }) => {
    //   const pageLinks = [
    //     pageLink0,
    //     // pageLink1,
    //     // pageLink2,
    //     // pageLink3
    //   ].filter(Boolean);
    //   const subtitle = pageLinks.length > 0 ? `by ${pageLinks.join(", ")}` : "";
    //   // const hasMoreLinks = Boolean(pageLink3);
    //   return {
    //     title,
    //     // subtitle: hasMoreLinks ? `${subtitle}…` : subtitle,
    //   };
    // },
    prepare({}) {
      return {
        title: "Page Links (click to view/edit)",
      };
    },
  },
};

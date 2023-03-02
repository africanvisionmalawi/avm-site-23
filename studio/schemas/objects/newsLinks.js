// in post.js

export default {
  name: "newsLinks",
  type: "object",
  fields: [
    {
      type: "array",
      name: "newsLinks",
      of: [{ type: "newsLink" }],
    },
  ],
  preview: {
    select: {
      title: "News Links (click to view)",
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
        title: "News Links (click to view/edit)",
      };
    },
  },
};

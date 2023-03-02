export default {
  title: "Home Page Section",
  type: "object",
  name: "homePageSection",
  fields: [
    {
      title: "Intro Text",
      name: "introText",
      type: "bodyPortableText",
    },
    {
      title: "Promo video",
      name: "promoVideo",
      type: "video",
    },
  ],
  preview: {
    select: {
      title: "Homepage Section (click to view/edit)",
    },
    prepare({}) {
      return {
        title: "Homepage Section (click to view/edit)",
      };
    },
  },
};

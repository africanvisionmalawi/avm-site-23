// in post.js

export default {
  title: "Home Page",
  name: "homePage",
  type: "document",
  __experimental_actions: [/*'create',*/ "update", /*'delete',*/ "publish"],
  fields: [
    {
      title: "Page Title",
      name: "title",
      type: "string",
    },
    {
      title: "Sub Title",
      name: "subTitle",
      type: "string",
    },
    {
      title: "Hero Image",
      name: "hero",
      type: "hero",
    },
    {
      title: "Latest News",
      name: "latestNews",
      type: "bodyPortableText",
    },
    {
      title: "Promo video",
      name: "promoVideo",
      type: "video",
    },
    {
      title: "Intro Text",
      name: "introText",
      type: "bodyPortableText",
    },
    // {
    //   title: "Videos",
    //   name: "videos",
    //   type: "videoGallery",
    // },
    {
      name: "content",
      type: "array",
      title: "Page sections",
      description: "Add, edit, and reorder sections",
      of: [
        { type: "pageLinks" },
        { type: "videoGallery" },
        { type: "photoGallery" },
        { type: "hero" },
        { type: "blockPortableText" },
        { type: "team" },
      ],
    },
    {
      name: "newsLinks",
      type: "newsLinks",
      title: "News Links",
      description: "Add a link to a news article",
    },
    // {
    //   title: "Page Links",
    //   name: "inks",
    //   type: "pageLinks",
    // },
    // {
    //   title: "Photo gallery",
    //   name: "gallery",
    //   type: "photoGallery",
    // },
    // {
    //   title: "Tags",
    //   name: "tags",
    //   type: "tags",
    // },
    {
      title: "Index page?",
      name: "indexPage",
      type: "boolean",
      hidden: true,
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      hidden: true,
      options: {
        source: (doc) => `${doc.title}`,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Meta Description",
      name: "description",
      type: "string",
    },
  ],
};

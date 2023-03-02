// in post.js

export default {
  title: "Page",
  name: "page",
  type: "document",
  fields: [
    {
      title: "Page Title",
      name: "title",
      type: "string",
    },
    {
      title: "Page Heading (optional)",
      description:
        "Use if you want to display a different heading at the top of the page",
      name: "pageHeading",
      type: "string",
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      title: "Category",
      name: "category",
      type: "reference",
      description: "Which top level folder is the page located",
      to: [{ type: "pageCategory" }],
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      description:
        "This will have whatever category you select above prefixed to it",
      options: {
        source: (doc) => `${doc.title}`,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Index page?",
      name: "indexPage",
      type: "boolean",
      description:
        "Select if this is an index page with links to other pages in that category",
    },
    {
      title: "Hero Image",
      name: "hero",
      type: "hero",
    },
    {
      title: "Banner message",
      name: "bannerMsg",
      type: "bannerMsg",
    },
    {
      title: "Body",
      name: "body",
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
        { type: "homePageSection" },
        { type: "ourWorkSelect" },
        { type: "googlemap" },
      ],
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
      title: "Meta Description",
      name: "description",
      type: "string",
    },
  ],
};

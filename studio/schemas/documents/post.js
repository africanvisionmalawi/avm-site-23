// in post.js

export default {
  title: "Post",
  name: "post",
  type: "document",
  fields: [
    {
      title: "Published",
      name: "published",
      type: "boolean",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Featured Image",
      name: "featured_image",
      type: "image",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Title",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Date",
      name: "date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Meta Description",
      name: "meta_description",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Tags",
      name: "tags",
      type: "tags",
    },
    {
      title: "Body",
      name: "body",
      type: "richText",
    },
    {
      title: "PDF Upload",
      name: "pdf",
      type: "file",
    },
  ],
};

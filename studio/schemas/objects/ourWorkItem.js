// in post.js

export default {
  name: "ourWorkItem",
  type: "object",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Page to link to",
      name: "url",
      type: "reference",
      to: [{ type: "page" }],
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
      title: "Body",
      name: "body",
      type: "richText",
    },
    {
      title: "Photo",
      name: "photo",
      type: "figure",
    },
  ],
};

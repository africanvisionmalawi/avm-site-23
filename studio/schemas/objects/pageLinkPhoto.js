export default {
  type: "object",
  name: "pageLinkPhoto",
  title: "Page link",
  fields: [
    {
      name: "photo",
      type: "figure",
    },
    {
      name: "linkTitle",
      type: "string",
    },
    {
      name: "linkText",
      type: "richTextSimple",
    },
    {
      title: "Featured Link?",
      name: "featured",
      type: "boolean",
    },
    {
      title: "Page to link to",
      name: "url",
      type: "reference",
      to: [{ type: "page" }],
    },
    {
      title: "Or External URL",
      name: "extUrl",
      type: "string",
    },
    {
      title: "Hide link",
      name: "hideLink",
      type: "boolean",
    },
  ],
  preview: {
    select: {
      title: "linkTitle",
      media: "photo",
    },
    prepare({ title, media }) {
      return {
        title: title,
        media,
      };
    },
  },
};

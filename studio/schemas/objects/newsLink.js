export default {
  type: "object",
  name: "newsLink",
  fields: [
    {
      title: "News article to link to",
      name: "url",
      type: "reference",
      to: [{ type: "news" }],
    },
  ],
  preview: {
    select: {
      title: "url.slug.current",
    },
    prepare({ title }) {
      return {
        title: title,
      };
    },
  },
};

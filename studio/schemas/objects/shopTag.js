export default {
  type: "object",
  name: "shopTag",
  fields: [
    {
      name: "title",
      type: "string",
    },
    {
      name: "value",
      type: "slug",
      options: {
        source: "title",
      },
    },
  ],
};

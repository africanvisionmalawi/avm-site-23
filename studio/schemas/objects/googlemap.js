// youtube.js
export default {
  title: "Googlemap",
  name: "googlemap",
  type: "object",
  fields: [
    {
      title: "Googlemap URL",
      name: "url",
      type: "url",
    },
    {
      title: "Text",
      name: "text",
      type: "string",
    },
  ],
  preview: {
    select: {
      title: "Googlemap (click to view)",
    },

    prepare({}) {
      return {
        title: "Googlemap (click to view/edit)",
      };
    },
  },
};

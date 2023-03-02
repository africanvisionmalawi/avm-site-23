// in post.js

export default {
  title: "Video Gallery",
  name: "videoGallery",
  type: "object",
  fields: [
    {
      type: "array",
      name: "videos",
      of: [{ type: "video" }],
    },
  ],
  options: {
    collapsible: true,
    collapsed: true,
  },
  preview: {
    prepare({}) {
      return {
        title: "Video gallery (click to view/edit)",
      };
    },
  },
};

export default {
  title: "Hero",
  type: "object",
  name: "hero",
  fields: [
    {
      name: "image",
      type: "mainImage",
    },
    {
      name: "mobileImage",
      type: "mainImage",
      title: "Mobile version of image (optional)",
    },
  ],
  options: {
    collapsible: true,
    collapsed: true,
  },
};

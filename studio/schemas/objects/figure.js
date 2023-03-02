export default {
  name: "figure",
  title: "Image",
  type: "image",
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: "alt",
      type: "string",
      title: "Alternative text",
      validation: (Rule) =>
        Rule.error("You have to fill out the alternative text.").required(),
      description: "Important for SEO and accessiblity.",
      options: {
        isHighlighted: true,
      },
    },
    {
      title: "Caption",
      description: "Text displayed below the photo where available",
      name: "caption",
      type: "string",
      options: {
        isHighlighted: true,
      },
    },
  ],
  preview: {
    select: {
      media: "figure",
      imageUrl: "asset.url",
      title: "alt",
    },
  },
};

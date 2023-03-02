export default {
  type: "object",
  name: "teamMember",
  fields: [
    {
      name: "photo",
      type: "figure",
    },
    {
      name: "name",
      type: "string",
    },
    {
      name: "role",
      type: "string",
    },
  ],
  preview: {
    select: {
      title: "name",
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

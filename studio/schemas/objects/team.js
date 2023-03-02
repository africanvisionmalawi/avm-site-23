export default {
  title: "Team",
  name: "team",
  type: "object",
  fields: [
    {
      title: "Heading",
      name: "heading",
      type: "string",
    },
    {
      type: "array",
      name: "team",
      title: "Team members",
      of: [{ type: "teamMember" }],
    },
  ],
  preview: {
    select: {
      title: "Team (click to view)",
    },

    prepare({}) {
      return {
        title: "Team (click to view/edit)",
      };
    },
  },
};

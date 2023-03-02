export default {
  title: "Our Work",
  name: "ourWorkShared",
  type: "document",
  __experimental_actions: [/*'create',*/ "update", /*'delete',*/ "publish"],
  fields: [
    {
      title: "Intro text",
      name: "body",
      type: "richTextSimple",
      validation: (Rule) => Rule.required(),
    },
    {
      type: "array",
      name: "ourWork",
      of: [{ type: "ourWorkItem" }],
    },
    // {
    //   type: "array",
    //   name: "team",
    //   title: "Team members",
    //   of: [{ type: "teamMember" }],
    // },
  ],
  preview: {
    select: {
      title: "Our Work (click to view)",
    },
    prepare({}) {
      return {
        title: "Our Work (click to view/edit)",
      };
    },
  },
};

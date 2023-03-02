// in post.js

export default {
  title: "Site Settings",
  name: "siteSettings",
  type: "document",
  __experimental_actions: [/*'create',*/ "update", /*'delete',*/ "publish"],
  fields: [
    {
      title: "Meta Title",
      name: "meta_title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Meta Description",
      name: "meta_description",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Shop Categories",
      name: "shopTags",
      type: "array",
      of: [
        {
          type: "shopTag",
        },
      ],
    },
  ],
};

// in post.js

export default {
  title: "Event",
  name: "event",
  type: "document",
  fields: [
    {
      title: "Featured Image",
      name: "featured_image",
      type: "image",
    },
    {
      title: "Title",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Brief summary of the event (used on index page)",
      name: "excerpt",
      type: "richTextSimple",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Main description of the event",
      name: "body",
      type: "richText",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Start Date",
      name: "date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "End Date",
      name: "endDate",
      type: "datetime",
    },
    {
      title: "All day event?",
      name: "allDay",
      type: "boolean",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Hide the time?",
      name: "hideTime",
      type: "boolean",
    },
    {
      title: "Location",
      name: "location",
      type: "string",
    },
    {
      title: "Name of Contact",
      name: "contact",
      type: "string",
    },
    {
      title: "Telephone",
      name: "telephone",
      type: "string",
    },
    {
      title: "Cost (in £)",
      name: "cost",
      type: "number",
    },
    {
      title: "Url link",
      name: "url",
      type: "string",
    },
    {
      title: "Tags",
      name: "tags",
      type: "tags",
    },
    {
      title: "Meta Description",
      name: "meta_description",
      type: "string",
    },
  ],
};

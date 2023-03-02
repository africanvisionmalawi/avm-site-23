// in post.js
import { ImNewspaper } from "react-icons/im";

export default {
  title: "News",
  name: "news",
  type: "document",
  icon: ImNewspaper,
  fields: [
    {
      title: "Page Title",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Publish date",
      name: "publishDate",
      type: "date",
      options: {
        dateFormat: "YYYY-MM-DD",
        calendarTodayLabel: "Today",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      description:
        "This will have whatever category you select above prefixed to it",
      options: {
        source: (doc) => `${doc.title}`,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Featured photo",
      name: "photo",
      type: "figure",
    },
    {
      title: "Excerpt",
      name: "excerpt",
      description:
        "Text used when the news articles is linked to from anotehr page",
      type: "bodyPortableText",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Body",
      name: "body",
      type: "bodyPortableText",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "content",
      type: "array",
      title: "Page sections",
      description: "Add, edit, and reorder sections",
      of: [{ type: "photoGallery" }, { type: "blockPortableText" }],
    },
    {
      title: "Tags",
      name: "tags",
      type: "tags",
    },
    {
      title: "Meta Description",
      name: "description",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
  ],
};

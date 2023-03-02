// in post.js

export default {
  title: "Body Text",
  name: "blockPortableText",
  type: "object",
  fields: [
    {
      name: "blocks",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
  preview: {
    select: {
      blocks: "blocks",
    },
    prepare(value) {
      const block = (value.blocks || []).find(
        (block) => block._type === "block"
      );
      return {
        title: block
          ? block.children
              .filter((child) => child._type === "span")
              .map((span) => span.text)
              .join("")
          : "No title",
      };
    },
  },
};

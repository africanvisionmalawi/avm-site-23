import { PortableText } from "components/portable-text/BasePortableText";

const md = require("markdown-it")({
  html: true,
  linkify: true,
  typographer: true,
});

/**
 * Renders local markdown (preferred) or legacy Sanity Portable Text arrays.
 */
export const MarkdownContent = ({ content, className }) => {
  if (!content) return null;

  if (typeof content === "string") {
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: md.render(content) }}
      />
    );
  }

  if (Array.isArray(content)) {
    return <PortableText blocks={content} />;
  }

  return null;
};

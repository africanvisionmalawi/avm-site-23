import { Video } from "components/videos";
import Figure from "./Figure";
import File from "./File";

const components = {
  types: {
    mainImage: Figure,
    image: Figure,
    video: ({ node }) => <Video url={node.url} text={node.text} />,
    pdf: File,
  },
  marks: {
    center: (props) => <div className="text-center">{props.children}</div>,
    highlight: (props) => (
      <span className="font-bold text-brand-primary">{props.children}</span>
    ),
    link: (props) => (
      <a href={props?.value?.href} target="_blank" rel="noopener">
        {props.children}
      </a>
    ),
    internalLink: ({ mark, children }) => {
      if (mark?.reference) {
        const { slug = {}, category = {} } = mark.reference;
        const href = `/${
          category?.slug.current ? category?.slug.current + "/" : ""
        }${slug.current || ""}/`;
        return <a href={href}>{children}</a>;
      }
      return null;
    },
  },
};

export default components;

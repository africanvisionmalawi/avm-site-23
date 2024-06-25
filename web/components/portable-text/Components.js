import { Video } from "components/videos";
import { removeTrailingSash } from "lib/helpers";
import Figure from "./Figure";
import File from "./File";

const components = {
  types: {
    mainImage: Figure,
    image: Figure,
    video: (props) => <Video props={props.value} />,
    pdf: File,
  },
  marks: {
    center: (props) => <div className="text-center">{props.children}</div>,
    highlight: (props) => (
      <span className="font-bold text-brand-primary">{props.children}</span>
    ),
    link: (props) => {
      // console.log("props ", props);
      return (
        <a
          href={removeTrailingSash(props?.value?.href)}
          target={props?.value?.blank ? "_blank" : "_self"}
          rel="noopener"
        >
          {props.children}
        </a>
      );
    },
    internalLink: ({ mark, children }) => {
      // console.log("data ", mark, children);
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

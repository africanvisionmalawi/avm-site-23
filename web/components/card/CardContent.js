import { MoreButton } from "components/card/MoreButton";
import { PortableText } from "components/portable-text/BasePortableText";
import styles from "./card.module.css";

export const CardContent = ({ title, url, linkText }) => {
  // console.log("linkText ", linkText);
  // console.log("url is ", url);
  return (
    <div className={styles.contentCont}>
      {title ? <h3 className={styles.contentHeading}>{title}</h3> : null}
      {/* {props.displayLocation && <span>{props.location}</span>} */}
      {linkText ? <PortableText blocks={linkText} /> : null}
      {/* TODO: add hideLink here */}
      {url ? <MoreButton url={url} /> : null}
    </div>
  );
};

import { PortableText } from "components/portable-text/BasePortableText";
import styles from "./bannerMsg.module.css";

export const BannerMsg = ({ msg, source }) => {
  return (
    <div className={styles.container}>
      {msg ? <PortableText blocks={msg} /> : null}
      {source ? <div className={styles.citation}>{source}</div> : null}
    </div>
  );
};

// const Content = styled.div`
//   font-family: "Roboto", sans-serif;
//   font-size: 1.6em;
//   text-align: center;
// `;

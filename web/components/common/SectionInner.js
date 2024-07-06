import styles from "./sectionInner.module.css";

export const SectionInner = ({ children }) => {
  return <section className={styles.section}>{children}</section>;
};

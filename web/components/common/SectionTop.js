import styles from "./sectionTop.module.css";

export const SectionTop = ({ children }) => {
  return <div className={styles.section}>{children}</div>;
};

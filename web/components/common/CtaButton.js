import styles from "ctaButton.module.css";

export const CtaButton = ({ link, text, placement }) => (
  <span className={styles.ctaButton}>
    <a href={link} className={`${styles.buttonLink} ${placement}`}>
      {text}
    </a>
  </span>
);

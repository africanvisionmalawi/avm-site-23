import styles from "./navTags.module.css";

export const NavTags = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        {props.tags.map((tag) => {
          return (
            <span
              className={`${styles.tag} ${
                props.active === tag.value.current ? "active" : null
              }`}
            >
              <a href={`${props.tagsBase}${tag.value.current}`}>{tag.title}</a>
            </span>
          );
        })}
      </div>
    </div>
  );
};

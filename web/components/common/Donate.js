import { CtaButton } from "./CtaButton";
import styles from "./donate.module.css";

export const Donate = (props) => {
  const {
    displayImage = true,
    link = "https://www.charitycheckout.co.uk/1113786/",
    text = "Donate",
  } = props;
  return (
    <>
      {displayImage ? (
        <div className={styles.withPhoto}>
          <div className={styles.inner}>
            <p>
              Donate now to help us help children &amp; vulnerable people in
              Malawi.
            </p>
            <CtaButton link={link} text={text} placement="alt" />
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <CtaButton link={link} text={text} placement="alt" />
        </div>
      )}
    </>
  );
};

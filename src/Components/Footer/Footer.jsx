import styles from "./Footer.module.scss";
import Button from "../Button/Button";

const Footer = () => {
  return (
    <div className={styles.foot}>
      <p>Made in React</p>
      <a
        href="https://www.etsy.com/au/shop/TheHallowedLibrary"
        target="_blank"
        className={styles.foot__link}>
        <button className={styles.foot__link__btn}>
          The Hallowed Library Etsy Store
        </button>
      </a>
    </div>
  );
};

export default Footer;

import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.foot}>
      <p>Made in React</p>
      <a
        href="https://www.etsy.com/au/shop/TheHallowedLibrary"
        target="_blank"
        className={styles.foot__link}>
        The Hallowed Library Etsy Store
      </a>
    </div>
  );
};

export default Footer;

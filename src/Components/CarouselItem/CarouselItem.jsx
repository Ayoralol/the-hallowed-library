import styles from "./CarouselItem.module.scss";

const CarouselItem = ({image, onClick}) => {
  return (
    <div className={styles.wrap}>
      <img
        src={image}
        alt={image + "image"}
        className={styles.wrap__image}
        onClick={onClick}
      />
    </div>
  );
};

export default CarouselItem;

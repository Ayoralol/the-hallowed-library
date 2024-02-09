import styles from "./CarouselItem.module.scss";

const CarouselItem = ({item}) => {
  return (
    <div className={styles.wrap}>
      <img
        src={item.featuredImage}
        alt={item.name + "image"}
        className={styles.wrap__image}
      />
    </div>
  );
};

export default CarouselItem;

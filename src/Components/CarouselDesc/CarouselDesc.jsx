import styles from "./CarouselDesc.module.scss";
import Button from "../Button/Button";

const CarouselDesc = ({item, navigate}) => {
  const {name, price} = item;
  const split = name.split(" - ");
  const title = split[0];
  const author = split[1];
  return (
    <div className={styles.wrap}>
      <p>{title}</p>
      <p>{author}</p>
      <Button onClick={navigate} size="mid">
        Buy for ${price.toFixed(2)}
      </Button>
    </div>
  );
};

export default CarouselDesc;

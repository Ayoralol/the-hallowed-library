import styles from "./CartCard.module.scss";

const CartCard = ({item}) => {
  return (
    <div className={styles.wrap}>
      <img
        src={item.image}
        alt={item.name + "image"}
        className={styles.wrap__image}
      />
      <div className={styles.wrap__info}>
        <div className={styles.wrap__info__text}>
          {item.name.split(" ").slice(0, 4).join(" ")}
        </div>
        <div className={styles.wrap__info__text}>${item.price.toFixed(2)}</div>
        <div className={styles.wrap__info__text}>Quantity: {item.quantity}</div>
        <div className={styles.wrap__info__text}>
          Total Price: ${(item.price * item.quantity).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default CartCard;

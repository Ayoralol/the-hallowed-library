import {useContext, useEffect, useState} from "react";
import {UsersContext} from "../../Context/UsersContextProvider";
import CartCard from "../../Components/CartCard/CartCard";
import {
  getUserCartItems,
  emptyCart,
  purchaseCartItems,
} from "../../../services/products";
import Button from "../../Components/Button/Button";
import styles from "./Cart.module.scss";

const Cart = ({onBackgroundClick}) => {
  const {isLoggedIn, userId, getCartItems} = useContext(UsersContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      getUserCartItems(userId).then(setCartItems);
    }
  }, [isLoggedIn, userId, getCartItems]);

  const handlePropagation = (e) => {
    e.stopPropagation();
  };

  const calcTotalItems = () => {
    return cartItems.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
  };

  const calcTotal = () => {
    return cartItems.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
  };

  return (
    <div onClick={onBackgroundClick} className={styles.back}>
      {isLoggedIn ? (
        <div onClick={handlePropagation} className={styles.container}>
          <div className={styles.container__totals}>
            <div>Total Items: {calcTotalItems()}</div>
            <div>Total Price: ${calcTotal().toFixed(2)}</div>
          </div>
          <div className={styles.container__buy}>
            <Button
              onClick={() => {
                purchaseCartItems(userId);
                setCartItems([]);
              }}
              size={"sml"}>
              Purchase Items
            </Button>
            <Button
              onClick={() => {
                emptyCart(userId);
                setCartItems([]);
              }}
              size={"sml"}>
              Empty Cart
            </Button>
          </div>
          <div className={styles.container__items}>
            {cartItems.map((item) => (
              <CartCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.container}>Please Log in to view cart</div>
      )}
    </div>
  );
};

export default Cart;

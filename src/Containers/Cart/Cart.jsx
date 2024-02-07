import {useContext, useEffect, useState} from "react";
import {UsersContext} from "../../Context/UsersContextProvider";
import CartCard from "../../Components/CartCard/CartCard";
import {
  getUserCartItems,
  emptyCart,
  purchaseCartItems,
} from "../../../services/products";
import Button from "../../Components/Button/Button";

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
    <div onClick={onBackgroundClick}>
      {isLoggedIn ? (
        <div onClick={handlePropagation}>
          {cartItems.map((item) => (
            <CartCard key={item.id} item={item} />
          ))}
          <div>Total Items: {calcTotalItems()}</div>
          <div>Total Price: ${calcTotal().toFixed(2)}</div>
          <Button
            onClick={() => {
              purchaseCartItems(userId);
              setCartItems([]);
            }}>
            Purchase Items
          </Button>
          <Button
            onClick={() => {
              emptyCart(userId);
              setCartItems([]);
            }}>
            Empty Cart
          </Button>
        </div>
      ) : (
        <div>Please Log in to view cart</div>
      )}
    </div>
  );
};

export default Cart;

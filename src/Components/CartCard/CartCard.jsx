import React from "react";

const CartCard = ({item}) => {
  return (
    <div>
      <img src={item.image} alt={item.name + "image"} />
      <div>{item.name}</div>
      <div>${item.price.toFixed(2)}</div>
      <div>Quantity: {item.quantity}</div>
      <div>Total Price: ${(item.price * item.quantity).toFixed(2)}</div>
    </div>
  );
};

export default CartCard;

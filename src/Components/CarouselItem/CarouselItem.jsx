import React from "react";
import styles from "./CarouselItem.module.scss";

const CarouselItem = ({name, image, price, onClick}) => {
  return (
    <div onClick={onClick}>
      <img src={image} alt={image + "image"} />
      <p>{name}</p>
      <p>{price}</p>
    </div>
  );
};

export default CarouselItem;

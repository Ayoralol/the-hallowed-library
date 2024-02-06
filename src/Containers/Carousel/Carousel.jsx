import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import CarouselItem from "../../Components/CarouselItem/CarouselItem";
import styles from "./Carousel.module.scss";

const Carousel = ({items}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % items.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((currentIndex - 1 + items.length) % items.length);
  };

  const handleNavigate = (id) => {
    navigate(`/products/${id}`);
  };

  if (!items[currentIndex]) {
    return null; // or some fallback UI
  }

  return (
    <div>
      <button onClick={handlePrevious}>Previous</button>
      <CarouselItem
        key={items[currentIndex].id}
        name={items[currentIndex].name}
        image={items[currentIndex].image}
        price={items[currentIndex].price.toFixed(2)}
        onClick={() => handleNavigate(items[currentIndex].id)}
      />
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Carousel;

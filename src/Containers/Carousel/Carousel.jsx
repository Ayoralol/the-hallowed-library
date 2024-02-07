import {useState} from "react";
import {useNavigate} from "react-router-dom";
import CarouselItem from "../../Components/CarouselItem/CarouselItem";
import Button from "../../Components/Button/Button";
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
    return null;
  }

  return (
    <div className={styles.wrap}>
      <Button onClick={handlePrevious}>Previous</Button>
      <CarouselItem
        key={items[currentIndex].id}
        image={items[currentIndex].image}
        onClick={() => handleNavigate(items[currentIndex].id)}
      />
      <Button onClick={handleNext}>Next</Button>
    </div>
  );
};

export default Carousel;

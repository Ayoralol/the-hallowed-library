import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import CarouselItem from "../../Components/CarouselItem/CarouselItem";
import CarouselDesc from "../../Components/CarouselDesc/CarouselDesc";
import Button from "../../Components/Button/Button";
import styles from "./Carousel.module.scss";

const Carousel = ({items}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    items.forEach((item) => {
      const img = new Image();
      img.src = item.featuredImage;
    });
  }, [items]);

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
      <div className={styles.wrap__item}>
        <CarouselDesc
          item={items[currentIndex]}
          navigate={() => handleNavigate(items[currentIndex].id)}
        />
        <CarouselItem key={items[currentIndex].id} item={items[currentIndex]} />
      </div>
      <div className={styles.wrap__btn}>
        <Button onClick={handlePrevious}>Previous</Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
};

export default Carousel;

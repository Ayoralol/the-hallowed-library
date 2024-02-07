import Carousel from "../Carousel/Carousel";
import Description from "../../Components/Description/Description";
import styles from "./HomePage.module.scss";

const HomePage = ({products, bundles}) => {
  const featuredProducts = products.filter(
    (product) => product.featured === true
  );

  return (
    <div>
      <div className={styles.wrap}>
        <Carousel items={featuredProducts} />
        <Carousel items={bundles} />
      </div>
      <Description />
    </div>
  );
};

export default HomePage;

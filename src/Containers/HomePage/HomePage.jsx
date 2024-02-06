import React from "react";
import Carousel from "../Carousel/Carousel";
import Description from "../../Components/Description/Description";

const HomePage = ({products, bundles}) => {
  const featuredProducts = products.filter(
    (product) => product.featured === true
  );

  return (
    <div>
      <div>
        <Carousel items={featuredProducts} />
        <Carousel items={bundles} />
      </div>
      <Description />
    </div>
  );
};

export default HomePage;

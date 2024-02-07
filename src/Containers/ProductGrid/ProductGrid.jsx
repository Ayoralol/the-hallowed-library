import {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import ProductCard from "../../Components/ProductCard/ProductCard";
import {UsersContext} from "../../Context/UsersContextProvider";
import styles from "./ProductGrid.module.scss";

const ProductGrid = ({products, bundles}) => {
  const {favorites} = useContext(UsersContext);
  const [sortOption, setSortOption] = useState("default");
  const allProducts = products.concat(bundles);
  const navigate = useNavigate();

  let sortedProducts;
  switch (sortOption) {
    case "name":
      sortedProducts = [...allProducts].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      break;
    case "price":
      sortedProducts = [...allProducts].sort((a, b) => a.price - b.price);
      break;
    case "bundles":
      sortedProducts = bundles;
      break;
    case "favorites":
      sortedProducts = allProducts.filter((product) =>
        favorites.includes(product.id)
      );
      break;
    default:
      sortedProducts = allProducts;
  }

  const handleCardClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__sort}>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className={styles.container__sort__dropdown}>
          <option
            value="default"
            className={styles.container__sort__dropdown__option}>
            Default
          </option>
          <option
            value="name"
            className={styles.container__sort__dropdown__option}>
            Sort by Name
          </option>
          <option
            value="price"
            className={styles.container__sort__dropdown__option}>
            Sort by Price
          </option>
          <option
            value="bundles"
            className={styles.container__sort__dropdown__option}>
            Show only Bundles
          </option>
          <option
            value="favorites"
            className={styles.container__sort__dropdown__option}>
            Show Favorites
          </option>
        </select>
      </div>
      <div className={styles.container__products}>
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price.toFixed(2)}
            image={product.image}
            onClick={() => handleCardClick(product.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;

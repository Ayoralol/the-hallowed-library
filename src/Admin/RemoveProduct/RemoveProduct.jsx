import {useContext, useState, useEffect} from "react";
import ProductCard from "../../Components/ProductCard/ProductCard";
import {UsersContext} from "../../Context/UsersContextProvider";
import Button from "../../Components/Button/Button";
import {removeProductById, getAllProducts} from "../../../services/products.js";
import styles from "./RemoveProduct.module.scss";
import {useMediaQuery} from "@mui/material";

const RemoveProduct = ({products: initialProducts}) => {
  const {isAdmin} = useContext(UsersContext);
  const [products, setProducts] = useState(initialProducts);

  const secondLayout = useMediaQuery(
    "(orientation: landscape) and (min-width: 915px)"
  );

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  if (!isAdmin) {
    return (
      <p className={styles.no_admin}>You do not have admin access, sorry!</p>
    );
  }

  const handleClick = async (id) => {
    if (window.confirm("Are you sure you wish to remove this product?")) {
      try {
        await removeProductById(id);
        const updatedProducts = await getAllProducts();
        setProducts(updatedProducts);
      } catch (error) {
        console.error("Error removing product: ", error);
      }
    }
  };

  const defaultLayout = products.map((product) => (
    <div key={product.id} className={styles.wrap__product}>
      <ProductCard image={product.image} name={product.name} adminSec={true} />
      <Button onClick={() => handleClick(product.id)}>Remove</Button>
    </div>
  ));

  return (
    <div className={styles.wrap}>
      {!secondLayout ? (
        defaultLayout
      ) : (
        <div className={styles.wrap__grid}>{defaultLayout}</div>
      )}
    </div>
  );
};

export default RemoveProduct;

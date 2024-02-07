import {useState, useContext} from "react";
import {addBookmark} from "../../../services/products.js";
import {UsersContext} from "../../Context/UsersContextProvider";
import styles from "./AddProduct.module.scss";
import Button from "../../Components/Button/Button.jsx";

const AddProduct = () => {
  const {isAdmin} = useContext(UsersContext);

  if (!isAdmin) {
    return (
      <p className={styles.no_admin}>You do not have admin access, sorry!</p>
    );
  }

  const [product, setProduct] = useState({
    name: "",
    inStock: 0,
    image: "",
    price: "",
  });

  const handleChange = (e) => {
    const value =
      e.target.type === "number" ? parseFloat(e.target.value) : e.target.value;
    setProduct({
      ...product,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addBookmark(product);
      setProduct({
        name: "",
        inStock: 5,
        image: "",
        price: "",
      });
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  return (
    <div className={styles.wrap}>
      <form onSubmit={handleSubmit} className={styles.wrap__form}>
        <label className={styles.wrap__form__input}>
          <p>Name:</p>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </label>
        <label className={styles.wrap__form__input}>
          <p>In Stock:</p>
          <input
            type="number"
            name="inStock"
            value={product.inStock}
            onChange={handleChange}
            required
          />
        </label>
        <label className={styles.wrap__form__input}>
          <p>Image URL:</p>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            required
          />
        </label>
        <label className={styles.wrap__form__input}>
          <p>Price:</p>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </label>
        <Button type="submit" size={"sml"}>
          Add Product
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;

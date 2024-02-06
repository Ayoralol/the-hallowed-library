import {useState, useContext} from "react";
import {addBookmark} from "../../../services/products.js";
import {UsersContext} from "../../Context/UsersContextProvider";

const AddProduct = () => {
  const {isAdmin} = useContext(UsersContext);

  if (!isAdmin) {
    return <p>You do not have admin access, sorry!</p>;
  }

  const [product, setProduct] = useState({
    name: "",
    inStock: 5,
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
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        In Stock:
        <input
          type="number"
          name="inStock"
          value={product.inStock}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Image URL:
        <input
          type="text"
          name="image"
          value={product.image}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;

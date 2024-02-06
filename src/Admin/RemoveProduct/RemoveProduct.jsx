import {useContext, useState, useEffect} from "react";
import ProductCard from "../../Components/ProductCard/ProductCard";
import {UsersContext} from "../../Context/UsersContextProvider";
import Button from "../../Components/Button/Button";
import {removeProductById, getAllProducts} from "../../../services/products.js";

const RemoveProduct = ({products: initialProducts}) => {
  const {isAdmin} = useContext(UsersContext);
  const [products, setProducts] = useState(initialProducts);

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  if (!isAdmin) {
    return <p>You do not have admin access, sorry!</p>;
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

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <ProductCard
            image={product.image}
            name={product.name}
            adminSec={true}
          />
          <Button onClick={() => handleClick(product.id)}>Remove</Button>
        </div>
      ))}
    </div>
  );
};

export default RemoveProduct;

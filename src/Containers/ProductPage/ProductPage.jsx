import {useEffect, useState, useContext} from "react";
import {useParams} from "react-router-dom";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../../config/firebase";
import {
  addToCart,
  getProductById,
  getBundleById,
} from "../../../services/products";
import Button from "../../Components/Button/Button";
import {UsersContext} from "../../Context/UsersContextProvider";

const ProductPage = ({products, bundles}) => {
  const {id} = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [productAmount, setProductAmount] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState("cornerPoint");
  const [orderAmount, setOrderAmount] = useState(1);

  const {userId, favorites, toggleFavorite} = useContext(UsersContext);

  const findProduct = async () => {
    setLoading(true);
    setData(null);
    setProductAmount(0);
    let productOrBundle;

    for (const product of products) {
      if (product.id === id) {
        productOrBundle = await getProductById(id);
        setProductAmount(productOrBundle.inStock);
        break;
      }
    }

    if (!productOrBundle) {
      for (const bundle of bundles) {
        if (bundle.id === id) {
          productOrBundle = await getBundleById(id);
          let minInStock = Infinity;
          for (const productId of bundle.productIDs) {
            const productDocRef = doc(db, "product", productId);
            const productDocSnap = await getDoc(productDocRef);
            if (productDocSnap.exists()) {
              const product = productDocSnap.data();
              if (product.inStock < minInStock) {
                minInStock = product.inStock;
              }
            }
          }
          setProductAmount(minInStock);
          break;
        }
      }
    }

    setData(productOrBundle);
    setLoading(false);
  };

  useEffect(() => {
    findProduct();
  }, [products, bundles]);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    const productIds = data.productIDs ? data.productIDs : [id];
    await addToCart(userId, productIds, orderAmount, selectedStyle);
    await findProduct();
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : data ? (
        <div>
          <h1>{data.name}</h1>
          <img src={data.image} alt={data.name} />
          <button onClick={() => toggleFavorite(id)}>
            {favorites.includes(id) ? "Unfavorite" : "Favorite"}
          </button>
          <p>Price: ${data.price.toFixed(2)}</p>
          <p>Amount in Stock: {productAmount}</p>
          <form>
            <label>
              Corners:
              <select
                value={selectedStyle}
                onChange={(e) => {
                  setSelectedStyle(e.target.value);
                  console.log(selectedStyle);
                }}>
                <option value="cornerPoint">Pointed</option>
                <option value="cornerRound">Round</option>
              </select>
            </label>
            <label>
              Order Amount:
              <input
                type="number"
                min="1"
                max={productAmount}
                value={orderAmount}
                onChange={(e) =>
                  setOrderAmount(Math.min(e.target.value, productAmount))
                }
              />
            </label>
            <Button onClick={handleAddToCart}>Add to Cart</Button>
          </form>
        </div>
      ) : (
        <p>Product not found :(</p>
      )}
    </div>
  );
};

export default ProductPage;

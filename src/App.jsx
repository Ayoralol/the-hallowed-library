import "./App.scss";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AdminPage from "./Admin/AdminPage/AdminPage";
import HomePage from "./Containers/HomePage/HomePage";
import ProductGrid from "./Containers/ProductGrid/ProductGrid";
import ProductPage from "./Containers/ProductPage/ProductPage";
import Navigation from "./Containers/Navigation/Navigation";
import Footer from "./Components/Footer/Footer";
import AddProduct from "./Admin/AddProduct/AddProduct";
import RemoveProduct from "./Admin/RemoveProduct/RemoveProduct";
import UsersContextProvider from "./Context/UsersContextProvider";
import {useState, useEffect} from "react";
import {getAllProducts, getAllBundles} from "../services/products.js";

function App() {
  const [products, setProducts] = useState([]);
  const [bundles, setBundles] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getAllProducts();
        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    const fetchBundles = async () => {
      try {
        const allBundles = await getAllBundles();
        setBundles(allBundles);
      } catch (error) {
        console.error("Error fetching bundles: ", error);
      }
    };

    fetchProducts();
    fetchBundles();
  }, []);

  return (
    <>
      <UsersContextProvider>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route
              path="/"
              element={<HomePage products={products} bundles={bundles} />}
            />
            <Route
              path="/products"
              element={<ProductGrid products={products} bundles={bundles} />}
            />
            <Route
              path="/products/:id"
              element={<ProductPage products={products} bundles={bundles} />}
            />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/add" element={<AddProduct />} />
            <Route
              path="/admin/remove"
              element={<RemoveProduct products={products} />}
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </UsersContextProvider>
    </>
  );
}

export default App;

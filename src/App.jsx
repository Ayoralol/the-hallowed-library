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

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductGrid />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/add" element={<AddProduct />} />
          <Route path="/admin/remove" element={<RemoveProduct />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

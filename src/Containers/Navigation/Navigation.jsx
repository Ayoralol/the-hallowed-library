import React from "react";
import {useNavigate} from "react-router-dom";
import Cart from "../Cart/Cart";
import Login from "../Login/Login";
import Button from "../../Components/Button/Button";

const Navigation = () => {
  const navigate = useNavigate();

  const handleClick = (path) => () => {
    navigate(path);
  };

  return (
    <div>
      <Button onClick={handleClick("/")}>Home</Button>
      <Button onClick={handleClick("/products")}>Products</Button>
      <Button onClick={handleClick("/admin")}>Admin</Button>
      <Cart />
      <Login />
    </div>
  );
};

export default Navigation;

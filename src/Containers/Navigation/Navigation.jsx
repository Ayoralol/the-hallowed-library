import {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import Cart from "../Cart/Cart";
import Login from "../Login/Login";
import Button from "../../Components/Button/Button";
import {UsersContext} from "../../Context/UsersContextProvider";
import icon from "../../assets/icon.png";
import styles from "./Navigation.module.scss";
import {useMediaQuery} from "@mui/material";

const Navigation = () => {
  const {userName, isAdmin, isLoggedIn, logoutUser} = useContext(UsersContext);
  const navigate = useNavigate();
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const secondLayout = useMediaQuery(
    "(orientation: landscape) and (min-width: 915px)"
  );

  const handleClick = (path) => () => {
    navigate(path);
  };

  const handleBackgroundClick = (e) => {
    setShowCart(false);
    setShowLogin(false);
  };

  const handleLogout = () => {
    if (window.confirm("Logout?")) {
      logoutUser();
    }
  };

  return (
    <div className={styles.nav}>
      <img
        src={icon}
        alt="The Hallowed Library Icon"
        className={styles.nav__image}
      />
      {secondLayout && (
        <h1 className={styles.nav__title}>The Hallowed Library</h1>
      )}
      <div className={styles.nav__btn_wrap}>
        <Button onClick={handleClick("/")}>Home</Button>
        <Button onClick={handleClick("/products")}>Products</Button>
        {isAdmin && <Button onClick={handleClick("/admin")}>Admin</Button>}
        {isLoggedIn ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <Button
            onClick={
              !showLogin ? () => setShowLogin(true) : handleBackgroundClick
            }>
            Login
          </Button>
        )}
        {showLogin && <Login onBackgroundClick={handleBackgroundClick} />}
        <Button
          onClick={!showCart ? () => setShowCart(true) : handleBackgroundClick}>
          Cart
        </Button>
        {showCart && <Cart onBackgroundClick={handleBackgroundClick} />}
      </div>
    </div>
  );
};

export default Navigation;

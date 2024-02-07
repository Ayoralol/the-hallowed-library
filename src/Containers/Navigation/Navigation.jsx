import {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import Cart from "../Cart/Cart";
import Login from "../Login/Login";
import Button from "../../Components/Button/Button";
import {UsersContext} from "../../Context/UsersContextProvider";

const Navigation = () => {
  const {userName, isAdmin, isLoggedIn, logoutUser} = useContext(UsersContext);
  const navigate = useNavigate();
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

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
    <div>
      <Button onClick={handleClick("/")}>Home</Button>
      <Button onClick={handleClick("/products")}>Products</Button>
      {isAdmin && <Button onClick={handleClick("/admin")}>Admin</Button>}
      {isLoggedIn && <p>Welcome {userName}</p>}
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
  );
};

export default Navigation;

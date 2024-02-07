import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import Button from "../../Components/Button/Button";
import {UsersContext} from "../../Context/UsersContextProvider";
import {addStockToProducts} from "../../../services/products";
import styles from "./AdminPage.module.scss";

const AdminPage = ({}) => {
  const {isAdmin} = useContext(UsersContext);

  if (!isAdmin) {
    return (
      <p className={styles.no_admin}>You do not have admin access, sorry!</p>
    );
  }

  const navigate = useNavigate();

  const handleClick = (path) => () => {
    navigate(path);
  };

  return (
    <div className={styles.wrap}>
      <Button onClick={handleClick("/admin/add")} size={"mid"}>
        Add Products
      </Button>
      <Button onClick={handleClick("/admin/remove")} size={"mid"}>
        Remove Products
      </Button>
      <Button onClick={() => addStockToProducts()} size={"mid"}>
        Add 5 to all stock
      </Button>
    </div>
  );
};

export default AdminPage;

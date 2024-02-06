import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import Button from "../../Components/Button/Button";
import {UsersContext} from "../../Context/UsersContextProvider";

const AdminPage = ({}) => {
  const {isAdmin} = useContext(UsersContext);

  if (!isAdmin) {
    return <p>You do not have admin access, sorry!</p>;
  }

  const navigate = useNavigate();

  const handleClick = (path) => () => {
    navigate(path);
  };

  return (
    <div>
      <Button onClick={handleClick("/admin/add")}>Add Products</Button>
      <Button onClick={handleClick("/admin/remove")}>Remove Products</Button>
    </div>
  );
};

export default AdminPage;

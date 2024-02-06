import {useContext} from "react";
import {UsersContext} from "../../Context/UsersContextProvider";

const ProductCard = ({id, name, price, image, onClick, adminSec = false}) => {
  const {favorites, toggleFavorite} = useContext(UsersContext);
  return (
    <div onClick={onClick}>
      <img src={image} alt={name + " image"} />
      <p>{name}</p>
      {price && <p>${price}</p>}
      {!adminSec && (
        <button onClick={() => toggleFavorite(id)}>
          {favorites.includes(id) ? "Unfavorite" : "Favorite"}
        </button>
      )}
    </div>
  );
};

export default ProductCard;

import {useContext} from "react";
import {UsersContext} from "../../Context/UsersContextProvider";
import Button from "../Button/Button";
import styles from "./ProductCard.module.scss";
import {useMediaQuery} from "@mui/material";

const ProductCard = ({id, name, price, image, onClick, adminSec = false}) => {
  const {favorites, toggleFavorite} = useContext(UsersContext);

  const secondLayout = useMediaQuery(
    "(orientation: landscape) and (min-width: 915px)"
  );

  return (
    <div className={styles.wrap}>
      <img
        src={image}
        alt={name + " image"}
        onClick={onClick}
        className={styles.wrap__image}
      />
      <div className={styles.wrap__info}>
        {!adminSec && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(id);
            }}
            size={secondLayout ? "sml" : undefined}>
            {favorites.includes(id) ? "Unfavorite" : "Favorite"}
          </Button>
        )}
        <p>{name.split(" ").slice(0, 6).join(" ")}</p>
        {price && <p>${price}</p>}
      </div>
    </div>
  );
};

export default ProductCard;

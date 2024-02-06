import {createContext, useState, useEffect} from "react";
import {
  logInUser,
  updateUserFavorites,
  getUserFavorites,
} from "../../services/products.js";

export const UsersContext = createContext();

const UsersContextProvider = ({children}) => {
  const [userName, setUserName] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [userId, setUserId] = useState(null);

  // TEMPORARY LOGIN ON LOAD//////////
  useEffect(() => {
    authenticateUser("ReeceSmith", 28);
  }, []);
  // TEMPORARY LOGIN ON LOAD /////////

  useEffect(() => {
    const fetchFavorites = async () => {
      if (userId) {
        try {
          const userFavorites = await getUserFavorites(userId);
          setFavorites(userFavorites);
        } catch (error) {
          console.error("Error fetching user's favorites: ", error);
        }
      }
    };

    fetchFavorites();
  }, [userId]);

  const authenticateUser = async (name, age) => {
    try {
      const {userId, user} = await logInUser(name, age);
      setUserName(user.userName);
      setIsAdmin(user.isAdmin);
      setIsLoggedIn(true);
      setUserId(userId);
    } catch (error) {
      console.error("Error authenticating user: ", error);
      setIsLoggedIn(false);
    }
  };

  const logoutUser = () => {
    setUserName(null);
    setIsAdmin(false);
    setIsLoggedIn(false);
  };

  const toggleFavorite = async (itemId) => {
    if (!userName) {
      window.alert("You must be logged in to favorite items.");
      return;
    }
    const newFavorites = favorites.includes(itemId)
      ? favorites.filter((id) => id !== itemId)
      : [...favorites, itemId];
    setFavorites(newFavorites);
    try {
      await updateUserFavorites(userName, newFavorites);
    } catch (error) {
      console.error("Error updating user's favorites: ", error);
    }
  };

  return (
    <UsersContext.Provider
      value={{
        userName,
        isAdmin,
        isLoggedIn,
        authenticateUser,
        logoutUser,
        favorites,
        setFavorites,
        toggleFavorite,
        userId,
      }}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContextProvider;

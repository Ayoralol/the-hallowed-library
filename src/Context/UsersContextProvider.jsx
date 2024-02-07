import {createContext, useState, useEffect} from "react";
import {
  logInUser,
  updateUserFavorites,
  getUserFavorites,
  addUser,
} from "../../services/products.js";

export const UsersContext = createContext();

const UsersContextProvider = ({children}) => {
  const [userName, setUserName] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [userId, setUserId] = useState(null);

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

  const createUser = async (name, age) => {
    try {
      await addUser(name, age);
      return true;
    } catch {
      window.alert("Error creating user");
      return false;
    }
  };

  const authenticateUser = async (name, age) => {
    try {
      const {userId, user} = await logInUser(name, age);
      setUserName(user.userName);
      setIsAdmin(user.isAdmin);
      setIsLoggedIn(true);
      setUserId(userId);
      return true;
    } catch (error) {
      window.alert(`Error authenticating user: ${error.message}`);
      setIsLoggedIn(false);
      return false;
    }
  };

  const logoutUser = () => {
    setUserName(null);
    setIsAdmin(false);
    setIsLoggedIn(false);
    setFavorites([]);
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
        createUser,
      }}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContextProvider;

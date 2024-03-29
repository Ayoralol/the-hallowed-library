import {
  collection,
  query,
  where,
  doc,
  getDocs,
  getDoc,
  deleteDoc,
  addDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import {db} from "../config/firebase";

export const getAllProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "product"));

    const products = querySnapshot.docs.map((doc) => {
      return {id: doc.id, ...doc.data()};
    });

    return products;
  } catch (error) {
    console.error("Error fetching products: ", error);
    throw error;
  }
};

export const getProductById = async (id) => {
  const docRef = doc(db, "product", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error("Product not found");
  }

  return {id: docSnap.id, ...docSnap.data()};
};

export const removeProductById = async (id) => {
  try {
    await deleteDoc(doc(db, "product", id));
  } catch (error) {
    console.error("Error removing product: ", error);
    throw error;
  }
};

export const getAllBundles = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "bundles"));

    const bundles = querySnapshot.docs.map((doc) => {
      return {id: doc.id, ...doc.data()};
    });

    return bundles;
  } catch (error) {
    console.error("Error fetching bundles: ", error);
    throw error;
  }
};

export const getBundleById = async (id) => {
  const docRef = doc(db, "bundles", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error("Bundle not found");
  }

  return {id: docSnap.id, ...docSnap.data()};
};

export const deleteProductById = async (id) => {
  try {
    await deleteDoc(doc(db, "product", id));
  } catch (error) {
    throw new Error("Not a valid product id");
  }
};

export const addBookmark = async (bookmark) => {
  try {
    const newBookmark = {
      ...bookmark,
      styles: {cornerPoint: true, cornerRound: true},
      featured: false,
    };
    const docRef = await addDoc(collection(db, "product"), newBookmark);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));

  const dataToReturn = querySnapshot.docs.map((doc) => {
    return {id: doc.id, ...doc.data()};
  });

  return dataToReturn;
};

export const addUser = async (userName, userAge) => {
  try {
    const users = await getAllUsers();
    const userExists = users.some(
      (existingUser) => existingUser.userName === userName
    );

    if (userExists) {
      throw new Error("User already exists");
    }

    const newUser = {
      userName: userName,
      userAge: Number(userAge),
      cart: {},
      favorites: [],
      isAdmin: false,
    };
    const docRef = await addDoc(collection(db, "users"), newUser);
  } catch (error) {
    console.error("Error adding new user: ", error);
    throw error;
  }
};

export const logInUser = async (userName, userAge) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("userName", "==", userName));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("Username or Age incorrect");
    }

    const userDoc = querySnapshot.docs[0];
    const user = userDoc.data();

    if (user.userAge !== Number(userAge)) {
      throw new Error("Username or Age incorrect");
    }

    return {userId: userDoc.id, user};
  } catch (error) {
    console.error("Error logging in user: ", error);
    throw error;
  }
};

export const getUserFavorites = async (userId) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      throw new Error("User not found");
    }

    let user = userDocSnap.data();

    return user.favorites;
  } catch (error) {
    console.error("Error fetching user's favorites: ", error);
    throw error;
  }
};

export const updateUserFavorites = async (userName, favorites) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("userName", "==", userName));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      await updateDoc(userDoc.ref, {favorites});
    } else {
      console.error("User not found: ", userName);
    }
  } catch (error) {
    console.error("Error updating user's favorites: ", error);
    throw error;
  }
};

export const addToCart = async (userId, productIds, productAmount, style) => {
  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);

  if (!userDocSnap.exists()) {
    throw new Error("User not found");
  }

  let user = userDocSnap.data();

  if (!user.cart) {
    user.cart = {};
  }

  for (let i = 0; i < productIds.length; i++) {
    const productId = productIds[i];
    const productDocRef = doc(db, "product", productId);
    const productDocSnap = await getDoc(productDocRef);

    if (!productDocSnap.exists()) {
      throw new Error(`Product ID ${productId} not found`);
    }

    let product = productDocSnap.data();

    if (product.inStock < productAmount) {
      throw new Error(`Not enough stock for product ID ${productId}`);
    }

    product.inStock -= productAmount;

    await updateDoc(productDocRef, product);

    if (!user.cart[productId]) {
      user.cart[productId] = {orderAmount: 0, style: style};
    }
    user.cart[productId].orderAmount += productAmount;
  }

  await updateDoc(userDocRef, user);
};

export const addStockToProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "product"));

    const batch = writeBatch(db);

    querySnapshot.docs.forEach((docSnapshot) => {
      const productRef = doc(db, "product", docSnapshot.id);
      batch.update(productRef, {inStock: docSnapshot.data().inStock + 5});
    });

    await batch.commit();
    console.log("Stock added to all products");
  } catch (error) {
    console.error("Error adding stock to products: ", error);
    throw error;
  }
};

export const getUserCartItems = async (userId) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      throw new Error("User not found");
    }

    const user = userDocSnap.data();
    const cart = user.cart || {};

    const cartItems = [];

    for (const productId in cart) {
      const productDocRef = doc(db, "product", productId);
      const productDocSnap = await getDoc(productDocRef);

      if (!productDocSnap.exists()) {
        throw new Error(`Product ID ${productId} not found`);
      }

      const product = productDocSnap.data();
      const orderAmount = cart[productId].orderAmount;
      const style = cart[productId].style;

      cartItems.push({
        id: productId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: orderAmount,
        style: style,
      });
    }
    console.log(cartItems);
    return cartItems;
  } catch (error) {
    console.error("Error fetching cart items: ", error);
    throw error;
  }
};

export const emptyCart = async (userId) => {
  if (!window.confirm("Are you sure you want to empty the cart?")) {
    return;
  }

  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);

  if (!userDocSnap.exists()) {
    throw new Error("User not found");
  }

  const user = userDocSnap.data();
  const cart = user.cart || {};

  for (const productId in cart) {
    const productDocRef = doc(db, "product", productId);
    const productDocSnap = await getDoc(productDocRef);

    if (!productDocSnap.exists()) {
      throw new Error(`Product ID ${productId} not found`);
    }

    const product = productDocSnap.data();
    product.inStock += cart[productId].orderAmount;

    await updateDoc(productDocRef, product);
  }

  user.cart = {};
  await updateDoc(userDocRef, user);
};

export const purchaseCartItems = async (userId) => {
  if (!window.confirm("Are you sure you want to purchase the items?")) {
    return;
  }

  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);

  if (!userDocSnap.exists()) {
    throw new Error("User not found");
  }

  const user = userDocSnap.data();
  user.cart = {};
  await updateDoc(userDocRef, user);

  window.alert("Items purchased!");
};

import React, { createContext, useState, useContext, useMemo } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  
  const [ cart, setCart] = useState([]);
  const [ favorites, setFavourites] = useState([]);


  const addToCart = ( item ) => {

    const existingOrder = cart.find((cartItem) => cartItem.item.itemID === item.itemID);

    const newOrder = {
      item: item,
      quantity: 1,
      userID: 'usR-12988229382',
      totalPrice: item?.price,
      // paid: false,
      deliveryAddress: {},
      // specialInstructions: "",
    };

    if (existingOrder) {
      // Update qty if exixts
          setCart((prevItems) =>
            prevItems.map((cartItem) =>
              cartItem.item.itemID === existingOrder.item.itemID ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            )
          );
    } else {
      setCart([...cart, newOrder]);
    }    
  };

  const addToFavorites = ( item ) => {
    const existingItem = favorites.find((favItem) => favItem.itemID === item.itemID);
    if (!existingItem) {
      setFavourites([...favorites, item]);
    };
  }

  const removeFromFavorites = (itemId) => {
    setFavourites((prevItems) => prevItems.filter((favItem) => favItem.itemID !== itemId));
  };

  const reduceCart = (item) => {
    // Check if the item already exists in the cart
    const existingItem = cart.find((order) => order.item.itemID === item.itemID);
  
      if (existingItem) {
        setCart((prevItems) =>
          prevItems.map((cartItem) =>
            cartItem.item.itemID === item.itemID && cartItem.quantity > 1 ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
          )
        );
      } 
  };

  const incrementCart = (item) => {
    // Check if the item already exists in the cart
    const existingItem = cart.find((order) => order.item.itemID === item.itemID);
  
      if (existingItem) {
        setCart((prevItems) =>
          prevItems.map((cartItem) =>
            cartItem.item.itemID === item.itemID ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
          )
        );
      } 
  };

  // Function to remove an item from the cart
  const removeFromCart = (itemId) => {
    setCart((prevItems) => prevItems.filter((cartItem) => cartItem.item.itemID !== itemId));
  };

  // Function to clear the cart
  const clearCart = () => {
    setCart([]);
  };

  // Function to calculate the total price of all items in the cart
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + ( item.totalPrice ), 0);
  };

  // Function to calculate the total price of all items in the cart
  const calculateTotalDiscount = () => {
    return cart.reduce((total, order) => total + ( order?.item?.globalPrice ), 0);
  };

  //This calculates the total number of items in the cart
  const calculateTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  //This finds the total quantity of an Item
  const getItemQuantity = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.item.itemID === item.itemID);
    return existingItem.quantity;
  };

  // Update cart item quantity
  const updateCartItemQuantity = (itemId, quantity) => {
    setCart((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  


  // Memoize the total price calculation to avoid unnecessary recalculations
  const totalPrice = useMemo(calculateTotalPrice, [cart]);
  // total number fof item in the cart
  const totalItems = useMemo(calculateTotalItems, [cart]);
  // Total discount
  const totalDiscount = useMemo(calculateTotalDiscount, [cart]);


  return (
    <CartContext.Provider
      value={{
        cart,
        favorites,
        totalDiscount,
        addToCart,
        reduceCart,
        incrementCart,
        getItemQuantity,
        removeFromCart,
        clearCart,
        updateCartItemQuantity,
        addToFavorites,
        removeFromFavorites,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
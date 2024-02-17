import React, { createContext, useState, useContext, useMemo } from 'react';

// Create a cart context
const CartContext = createContext();

// Custom hook to access the cart context
export function useCart() {
  return useContext(CartContext);
}

// // Cart context provider component
export function CartProvider({ children }) {
  
  const [ cartItems, setCartItems] = useState([]);
  const [ itemOrder, setItemOrder] = useState({});

// Function to add an item to the cart
  const addToCart = (item) => {
  // Check if the item already exists in the cart
  const existingItem = cartItems.find((cartItem) => cartItem.itemID === item.itemID);

    if (existingItem) {
      // If the item exists, update its quantity
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem.itemID === item.itemID ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
      );
    } else {
      // If the item doesn't exist, add it as a new entry in the cart
      setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
    }
  };

  const reduceCart = (item) => {
    // Check if the item already exists in the cart
    const existingItem = cartItems.find((cartItem) => cartItem.itemID === item.itemID);
  
      if (existingItem) {
        // If the item exists, update its quantity
        setCartItems((prevItems) =>
          prevItems.map((cartItem) =>
            cartItem.itemID === item.itemID && cartItem.quantity > 1 ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
          )
        );
      } 
      // else {
        // If the item doesn't exist, add it as a new entry in the cart
        // setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
      // }
    };

  // Function to remove an item from the cart
  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.itemID !== itemId));
  };

  // Function to clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Function to calculate the total price of all items in the cart
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + ( item.price * item.quantity ), 0);
  };

  // Function to calculate the total discount amount of all items in the cart
  const calculateTotalDiscount = () => {
    return cartItems.reduce((total, item) => total + ( item.discount * item.price ), 0);
  };

  //This calculates the total number of items in the cart
  const calculateTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  //This finds the total quantity of an Item
  const getItemQuantity = (cartItem) => {
    const existingItem = cartItems.find((cartItem) => cartItem.itemID === item.itemID);
    return existingItem.quantity;
  };

  // Update cart item quantity
  const updateCartItemQuantity = (itemId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  


  // Memoize the total price calculation to avoid unnecessary recalculations
  const totalPrice = useMemo(calculateTotalPrice, [cartItems]);
  // total number fof item in the cart
  const totalItems = useMemo(calculateTotalItems, [cartItems]);
  //Total discount
  const totalDiscount = useMemo(calculateTotalDiscount, [cartItems]);


  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        reduceCart,
        getItemQuantity,
        removeFromCart,
        clearCart,
        updateCartItemQuantity,
        totalPrice,
        totalItems,
        totalDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
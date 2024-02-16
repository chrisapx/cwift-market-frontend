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


// ... (previous code)

// Cart context provider component
// export function CartProvider({ children }) {
//   const [cartItems, setCartItems] = useState([]);
//   const [cartCreated, setCartCreated] = useState('');

//   // Function to add an item to the cart
//   const addToCart = (item) => {
//     const existingItem = cartItems.find((cartItem) => cartItem.item.itemID === item.itemID);

//     if (existingItem) {
//       // If the item exists, update its quantity
//       setCartItems((prevItems) =>
//         prevItems.map((cartItem) =>
//           cartItem.item.itemID === item.itemID
//             ? { ...cartItem, quantity: cartItem.quantity + 1 }
//             : cartItem
//         )
//       );
//     } else {
//       // If the item doesn't exist, add it as a new entry in the cart
//       setCartItems((prevItems) => [...prevItems, { item: item, quantity: 1 }]);
//     }

//     // Create an order for the added item
//     const newOrder = {
//       item: item,
//       quantity: 1, // default quantity for a new item in the order
//       userID: 'user123', // replace with actual user ID
//     };

//     // TODO: Make a POST request to create the order
//     // Assume you have an appropriate API endpoint for creating orders
//     fetch('https://inventory.nalmart.com/orders', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newOrder),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log('Order created:', data);
//       })
//       .catch((error) => {
//         console.error('Error creating order:', error);
//       });

//     // Check if the cart has been created
//     if (!cartCreated) {
//       // If the cart hasn't been created, make a POST request to create the cart
//       fetch('https://inventory.nalmart.com/cart', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           itemOrders: cartItems.map((cartItem) => ({
//             item: cartItem.item,
//             quantity: cartItem.quantity,
//           })),
//           totalPrice: calculateTotalPrice(),
//         }),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           console.log('Cart created:', data);
//           setCartCreated(data.getCartID);
//         })
//         .catch((error) => {
//           console.error('Error creating cart:', error);
//         });
//     } else {
//       // If the cart has been created, make a PUT request to update the cart
//       fetch('https://inventory.nalmart.com/cart?cartID=' +cartCreated, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           itemOrders: cartItems.map((cartItem) => ({
//             item: cartItem.item,
//             quantity: cartItem.quantity,
//           })),
//           totalPrice: calculateTotalPrice(),
//         }),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           console.log('Cart updated:', data);
//         })
//         .catch((error) => {
//           console.error('Error updating cart:', error);
//         }, []);
//     }
//   };

//   // ... (rest of your existing code)

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         // ...other functions
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

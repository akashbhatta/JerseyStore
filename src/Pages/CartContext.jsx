import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  /* ================= ADD TO CART ================= */
  const addToCart = (item) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);

      // If item already exists, increase quantity
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      // Otherwise add new item
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  /* ================= REMOVE FROM CART ================= */
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  /* ================= TOGGLE CART ================= */
  const toggleCart = () => {
    setCartOpen((prev) => !prev);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartOpen,
        addToCart,
        removeFromCart,
        toggleCart,
        setCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

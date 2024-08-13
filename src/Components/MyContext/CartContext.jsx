import { createContext, useState } from 'react';
export const CartContext = createContext();
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const addToCart = (property) => {
    setCart((prevCart) => [...prevCart, property]);
  };

  const removeFromCart = (propertyId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== propertyId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

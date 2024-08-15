import React, { createContext, useContext, useState } from 'react';
import { useAuth } from '../../Components/MyContext/Authcontext';
import { toast } from 'react-toastify';
import { useBooking } from '../../Components/MyContext/BookingContext';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const { currentUser } = useAuth();
  const { bookProperty } = useBooking();

  const addToCart = (property) => {
    if (currentUser) {
      setCart((prevCart) => [...prevCart, property]);
      toast.success('Property added to cart!');
    } else {
      toast.error("Login first to add property to cart");
      console.log("User not logged in");
    }
  };

  const removeFromCart = (propertyId) => {
    if (currentUser) {
      setCart((prevCart) => prevCart.filter((property) => property.id !== propertyId));
    } else {
      toast.error("Login first to remove property from cart");
      console.log("User not logged in");
    }
  };

  const increaseQuantity = (propertyId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === propertyId ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  };

  const decreaseQuantity = (propertyId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === propertyId && (item.quantity || 1) > 1
          ? { ...item, quantity: (item.quantity || 1) - 1 }
          : item
      )
    );
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  };

  const bookAllItems = (bookingDetails) => {
    if (currentUser) {
      const totalAmount = calculateTotal();
      bookProperty(
        {
          totalAmount,
          items: cart.map(item => ({ ...item, quantity: item.quantity || 1 })),
        },
        bookingDetails,
        removeFromCart,
        currentUser,
        true
      );
    } else {
      toast.error("Login first to book all items");
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, bookAllItems }}>
      {children}
    </CartContext.Provider>
  );
}

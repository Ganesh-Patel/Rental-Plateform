import { createContext, useContext, useState } from 'react';
import { useAuth } from '../../Components/MyContext/Authcontext';
export const CartContext = createContext();
import { toast } from 'react-toastify';
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const {currentUser} = useAuth(); 

  const addToCart = (property) => {
    if (currentUser) {
      const isAlreadyInCart = cart.some((item) => item.id === property.id);
  
      if (isAlreadyInCart) {
        toast.warning('This property is already in your cart.');
      } else {
        setCart((prevCart) => [...prevCart, property]);
        toast.success('Property added to cart!');
      }
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

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

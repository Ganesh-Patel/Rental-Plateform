import React, { useContext } from 'react';
import { CartContext } from '../../MyContext/CartContext'; // Ensure the path is correct
import PropertyCard from '../Properties/PropertyCard/PropertyCard';
import Checkout from './Checkout/Checkout'; // Import the Checkout component
import { FaTrash } from 'react-icons/fa';

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 mt-8 min-h-96 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cart.map((property, index) => (
              <div key={index} className="relative">
                <PropertyCard
                  title={property.title}
                  location={property.location}
                  price={property.price}
                  rating={property.rating}
                  bedrooms={property.bedrooms}
                  bathrooms={property.bathrooms}
                  squareFeet={property.squareFeet}
                  description={property.description}
                  id={property.id}
                  fromCartPage={true}
                />
                <div className="relative">
                  {/* Your property details here */}
                  <FaTrash
                    onClick={() => removeFromCart(property.id)}
                    className="absolute bottom-2 right-12 cursor-pointer text-red-500"
                    size={24} // Adjust size if needed
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Checkout />
    </div>
  );
}

export default Cart;

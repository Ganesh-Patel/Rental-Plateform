import React, { useContext } from 'react';
import { CartContext } from '../../MyContext/CartContext'; // Ensure the path is correct
import PropertyCard from '../Properties/PropertyCard/PropertyCard';

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 mt-8 min-h-96">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              />
              <button
                onClick={() => removeFromCart(property.id)}
                className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;

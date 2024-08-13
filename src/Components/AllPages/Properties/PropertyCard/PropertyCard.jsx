import React, { useContext } from 'react';
import { FaStar, FaCartPlus, FaInfoCircle } from 'react-icons/fa';
import { CartContext } from '../../../MyContext/CartContext';
import { Link } from 'react-router-dom';

function PropertyCard({ title, location, price, rating, bedrooms, bathrooms, squareFeet, description ,id}) {
    const { addToCart } = useContext(CartContext);
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
      {/* Property Details */}
      <Link to={`/property/${id}`}>
      <div className="flex flex-col items-start">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <div className="text-gray-600 text-sm mb-2">
          {location.neighborhood}, {location.city}
        </div>
        <div className="flex items-center text-yellow-500 mb-2">
          <FaStar className="mr-1" />
          <span>{rating}</span>
        </div>
        <p className="text-gray-700 mb-4">{description}</p>
        <div className="text-gray-800 mb-2">
          <strong>{bedrooms} Bedrooms</strong> | <strong>{bathrooms} Bathrooms</strong> | <strong>{squareFeet} sq ft</strong>
        </div>
        <div className="text-lg font-semibold text-gray-900 mb-4">${price} / month</div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center mt-4">
        <button className="bg-teal-500 text-white py-2 px-4 rounded-lg flex items-center hover:bg-teal-600 transition duration-300 ease-in-out" onClick={() => addToCart({ title, location, price, rating, bedrooms, bathrooms, squareFeet, description })}>
          <FaCartPlus className="mr-2" />
          Add to Cart
        </button>
        <button className="bg-gray-800 text-white py-2 px-4 rounded-lg flex items-center hover:bg-gray-700 transition duration-300 ease-in-out">
          <FaInfoCircle className="mr-2" />
          View Details
        </button>
      </div>
    </Link>
    </div>
  );
}

export default PropertyCard;

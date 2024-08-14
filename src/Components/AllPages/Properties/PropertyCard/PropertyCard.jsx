import React, { useContext, useState } from 'react';
import { FaStar, FaShareAlt, FaCalendarCheck, FaCartPlus, FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useBooking } from '../../../MyContext/BookingContext';
import { useAuth } from '../../../MyContext/Authcontext';
import { CartContext } from '../../../MyContext/CartContext';
import Modal from '../Modal/Modal'; 
import { toast } from 'react-toastify';

function PropertyCard({ title, location, price, rating, bedrooms, bathrooms, squareFeet, description, id, fromCartPage }) {
  const { bookProperty } = useBooking();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart, removeFromCart } = useContext(CartContext);
  const { currentUser, userName } = useAuth();

  const handleBookNow = () => {
    if (currentUser) {
      setIsModalOpen(true);
    } else {
      toast.error("Login first to book your property");
    }
  };

  const confirmBooking = () => {
    if (currentUser) {
      const bookingDetails = {
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        payment: price,
        userName: userName
      };
      bookProperty({ title, location, price, rating, bedrooms, bathrooms, squareFeet, description, id }, bookingDetails);
      setIsModalOpen(false);
      removeFromCart(id);
    } else {
      toast.error("Login first to book");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto flex flex-col justify-between" style={{ minHeight: '300px' }}>
      {/* Property Details */}
      <div className="flex-1">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">{title}</h2>
        <div className="text-gray-600 text-xs sm:text-sm mb-2">
          {location.neighborhood}, {location.city}
        </div>
        <div className="flex items-center text-yellow-500 mb-2 text-sm">
          <FaStar className="mr-1" />
          <span>{rating}</span>
        </div>
        <p className="text-gray-700 mb-4 text-xs sm:text-sm">{description}</p>
        <div className="text-xs sm:text-sm text-gray-800 mb-4">
          <strong>{bedrooms} Bedrooms</strong> | <strong>{bathrooms} Bathrooms</strong> | <strong>{squareFeet} sq ft</strong>
        </div>
        <div className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">${price} / month</div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row  gap-4 mt-4">
        {!fromCartPage ? (
          <>
            <button
              className="bg-teal-500 text-white py-2 px-4 rounded-lg flex items-center text-xs sm:text-sm hover:bg-teal-600 transition duration-300 ease-in-out"
              onClick={() => addToCart({ title, location, price, rating, bedrooms, bathrooms, squareFeet, description, id })}
            >
              <FaCartPlus className="mr-1 text-sm sm:text-base" />
              <span className="sm:inline">Add to Cart</span>
            </button>
            <Link to={`/property/${id}`}>
              <button className="bg-gray-800 text-white py-2 px-4 rounded-lg flex items-center text-xs sm:text-sm hover:bg-gray-700 transition duration-300 ease-in-out">
                <FaInfoCircle className="mr-1 text-sm sm:text-base" />
                <span className=" sm:inline">View Details</span>
              </button>
            </Link>
          </>
        ) : (
          <div className="flex flex-col sm:flex-row gap-2">
            <button className="bg-teal-500 text-white py-2 px-4 rounded-lg flex items-center text-xs sm:text-sm hover:bg-teal-600 transition duration-300 ease-in-out">
              <FaShareAlt className="mr-1 text-sm sm:text-base" />
              <span className="hidden sm:inline">Share</span>
            </button>
            <button onClick={handleBookNow} className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center text-xs sm:text-sm hover:bg-blue-600 transition duration-300 ease-in-out">
              <FaCalendarCheck className="mr-1 text-sm sm:text-base" />
              <span className="hidden sm:inline">Book Now</span>
            </button>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <Modal
          title="Confirm Booking"
          onClose={() => setIsModalOpen(false)}
          onConfirm={confirmBooking}
        >
          <p>Are you sure you want to book this property?</p>
        </Modal>
      )}
    </div>
  );
}

export default PropertyCard;

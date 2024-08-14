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
  const {addToCart,removeFromCart}=useContext(CartContext);

  const { currentUser,userName} = useAuth();


  const handleBookNow = () => {
    if ( currentUser) {
      setIsModalOpen(true);
    } else {
      toast.error("Login first to book your property");
      console.log("User not logged in");
    }
  };

  const confirmBooking = () => {
    if ( currentUser) {
      const bookingDetails = {
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        payment: price,
        userName: userName
      };
      console.log(bookingDetails);
      bookProperty({ title, location, price, rating, bedrooms, bathrooms, squareFeet, description, id }, bookingDetails);
      setIsModalOpen(false);
      removeFromCart(id);
    } else {
      // Redirect to login or show an error
      toast.error("Login logged in to book");
      console.log("User not logged in");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl w-[350px]">
      {/* Property Details */}
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
      <div className="flex justify-between gap-4 items-center mt-4">
        {!fromCartPage ? (
          <>
            <button
              className="bg-teal-500 text-white py-2 px-4 rounded-lg flex items-center hover:bg-teal-600 transition duration-300 ease-in-out "
              onClick={() => addToCart({ title, location, price, rating, bedrooms, bathrooms, squareFeet, description, id })}
            >
              <FaCartPlus className="mr-2" />
              Add to Cart
            </button>
            <Link to={`/property/${id}`}>
              <button className="bg-gray-800 text-white py-2 px-4 rounded-lg flex items-center hover:bg-gray-700 transition duration-300 ease-in-out">
                <FaInfoCircle className="mr-2" />
                View Details
              </button>
            </Link>
          </>
        ) : (
          <div className="flex space-x-4">
            <button className="bg-teal-500 text-white py-2 px-4 rounded-lg flex items-center hover:bg-teal-600 transition duration-300 ease-in-out">
              <FaShareAlt className="mr-2" />
              Share
            </button>
            <button onClick={handleBookNow} className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center hover:bg-blue-600 transition duration-300 ease-in-out">
              <FaCalendarCheck className="mr-2" />
              Book Now
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

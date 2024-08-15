import React, { useContext, useState } from 'react';
import { FaStar, FaCartPlus, FaInfoCircle, FaCalendarCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useBooking } from '../../../MyContext/BookingContext';
import { useAuth } from '../../../MyContext/Authcontext';
import { CartContext } from '../../../MyContext/CartContext';
import Modal from '../Modal/Modal'; 
import { toast } from 'react-toastify';

function PropertyCard({ title, location, price, rating, bedrooms, bathrooms, squareFeet, description, id, fromCartPage }) {
  const { bookProperty } = useBooking();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({ userName: '', userEmail: '', userContact: '', address: '' });
  const { addToCart, removeFromCart , increaseQuantity, decreaseQuantity, cart} = useContext(CartContext);
  const { currentUser, userName } = useAuth();

  const handleBookNow = () => {
    if (currentUser) {
      setIsBookingModalOpen(true);
    } else {
      toast.error("Login first to book your property");
    }
  };

  const handleBookingDetailsChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails(prevDetails => ({ ...prevDetails, [name]: value }));
  };

  const confirmBooking = (id) => {
    console.log('your id for which are you going to book', id)
    if (currentUser) {
      const quantity = cart.find(item => item.id === id)?.quantity || 1;
      console.log('your quantity for which are you going to book', quantity)
      const tamount=price*quantity;
      bookProperty({ title, location, totalAmount: tamount, rating, bedrooms, bathrooms, squareFeet, description, id, quantity }, bookingDetails,removeFromCart,currentUser,false);
      console.log(price)
      setIsBookingModalOpen(false);
    } else {
      toast.error("Login first to book");
    }
  };

  const handleIncreaseQuantity = (id) => {
    increaseQuantity(id);
  };

  const handleDecreaseQuantity = (id) => {
    if (cart.find(item => item.id === id)?.quantity > 1) {
      decreaseQuantity(id);
    }else{
      removeFromCart(id);
      toast.error("Property removed from cart");
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
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        {!fromCartPage ? (
          <>
            <button
              className="bg-teal-500 text-white py-2 px-4 rounded-lg flex items-center text-xs sm:text-sm hover:bg-teal-600 transition duration-300 ease-in-out"
              onClick={() => addToCart({ title, location, price, rating, bedrooms, bathrooms, squareFeet, description, id, quantity: 1 })}
            >
              <FaCartPlus className="mr-1 text-sm sm:text-base" />
              <span className="sm:inline">Add to Cart</span>
            </button>
            <Link to={`/property/${id}`}>
              <button className="bg-gray-800 text-white py-2 px-4 rounded-lg flex items-center text-xs sm:text-sm hover:bg-gray-700 transition duration-300 ease-in-out">
                <FaInfoCircle className="mr-1 text-sm sm:text-base" />
                <span className="sm:inline">View Details</span>
              </button>
            </Link>
          </>
        ) : (
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleDecreaseQuantity(id)} 
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out"
              >
                -
              </button>
              <span className="text-lg font-semibold">{cart.find(item => item.id === id)?.quantity || 1}</span>
              <button 
                  onClick={() => handleIncreaseQuantity(id)} 
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out"
              >
                +
              </button>
            </div>
            <button 
              onClick={handleBookNow} 
              className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center text-xs sm:text-sm hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              <FaCalendarCheck className="mr-1 text-sm sm:text-base" />
              <span className="sm:inline">Book Now</span>
            </button>
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      {isBookingModalOpen && (
        <Modal
          title="Enter Booking Details"
          onClose={() => setIsBookingModalOpen(false)}
          onConfirm={() => confirmBooking(id)}
        >
          <form className="flex flex-col gap-4">
            <input 
              type="text" 
              name="userName" 
              placeholder="Full Name" 
              value={bookingDetails.userName} 
              onChange={handleBookingDetailsChange} 
              className="p-2 border rounded"
            />
            <input 
              type="email" 
              name="userEmail" 
              placeholder="Email Address" 
              value={bookingDetails.userEmail} 
              onChange={handleBookingDetailsChange} 
              className="p-2 border rounded"
            />
            <input 
              type="text" 
              name="userContact" 
              placeholder="Contact Number" 
              value={bookingDetails.userContact} 
              onChange={handleBookingDetailsChange} 
              className="p-2 border rounded"
            />
            <textarea 
              name="address" 
              placeholder="Address" 
              value={bookingDetails.address} 
              onChange={handleBookingDetailsChange} 
              className="p-2 border rounded"
            />
          </form>
        </Modal>
      )}
    </div>
  );
}

export default PropertyCard;

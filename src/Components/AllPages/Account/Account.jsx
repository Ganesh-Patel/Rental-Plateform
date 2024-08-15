import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../MyContext/Authcontext.jsx';
import { useBooking } from '../../MyContext/BookingContext';
import { FaUserCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Account = () => {
  const { currentUser, logout, userName } = useAuth();
  const { getUserBookings, cancelBooking } = useBooking(); 
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const fetchBookings = async () => {
        try {
          const userBookings = await getUserBookings(userName);
          console.log("User bookings:", userBookings); 
          setBookings(userBookings);
        } catch (error) {
          toast.error('Failed to fetch bookings');
          console.error("Error fetching bookings:", error);
        }
      };

      fetchBookings();
    }
  }, [userName, getUserBookings]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      // Update the booking list to reflect the cancellation
      setBookings(bookings.map(booking =>
        booking.id === bookingId ? { ...booking, status: 'canceled' } : booking
      ));
    } catch (error) {
      toast.error('Failed to cancel booking');
      console.error("Error canceling booking:", error);
    }
  };

  if (!currentUser) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: "url('https://s3.us-west-1.wasabisys.com/rover-images-mred/MRD11063904/08032023200640_1600_0.webp')",
        }}
      >
        <div className="absolute left-16 bg-white bg-opacity-5 backdrop-blur-md p-10 rounded-lg shadow-lg">
          <h2 className="text-4xl font-extrabold text-teal-900 mb-6 text-center">You are not logged in</h2>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              to="/login"
              className="bg-teal-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-teal-700 transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-gray-400 text-gray-900 font-semibold py-3 px-6 rounded-full hover:bg-gray-500 transition duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const accountDetails = {
    username: userName || 'User',
    fullName: userName || 'John Doe',
    email: currentUser.email,
    phone: '+1-234-567-8901', 
    address: '1234 Elm Street, New York, NY, 10001', 
    membership: 'Premium', 
    joinDate: currentUser.metadata.creationTime,
    profilePicture: currentUser.photoURL || 'https://www.shutterstock.com/image-vector/man-icon-vector-260nw-1040084344.jpg', 
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 mt-8 min-h-96">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-4">
            {accountDetails.profilePicture ? (
              <img
                src={accountDetails.profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUserCircle className="text-gray-500 text-6xl" />
            )}
          </div>
          <div className="flex flex-col items-center space-y-2">
            <h2 className="text-2xl font-semibold text-gray-900">{accountDetails.fullName}</h2>
            <p className="text-gray-600">@{accountDetails.username}</p>
            <p className="text-gray-600">{accountDetails.email}</p>
            <p className="text-gray-600">{accountDetails.phone}</p>
            <p className="text-gray-600">{accountDetails.address}</p>
            <p className="text-gray-600"><strong>Membership:</strong> {accountDetails.membership}</p>
            <p className="text-gray-600"><strong>Joined:</strong> {new Date(accountDetails.joinDate).toLocaleDateString()}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 mt-4"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Booking Details</h3>
        <div className="bg-gray-100 p-4 rounded-lg">
          {bookings.length > 0 ? (
            <ul className="space-y-4">
              {bookings.flat().map((booking, index) => (
                <li key={index} className="bg-white shadow-md rounded-lg p-4 mb-4">
                  <p className="text-gray-600">Description: {booking.description}</p>
                  <p className="text-gray-600">
                    Location: {booking.location ? `${booking.location.city}, ${booking.location.neighborhood}, ${booking.location.landmark} (${booking.location.postalCode})` : 'N/A'}
                  </p>
                  <p className="text-gray-600">Price: ${booking.price}</p>
                  <p className="text-gray-600">Date: {booking.date}</p>
                  <p className="text-gray-600">Time: {booking.time}</p>
                  <p className="text-gray-600">Booked By: {booking.userName}</p>
                  {booking.status === 'canceled' ? (
                    <p className="text-red-500 font-semibold">Booking Canceled</p>
                  ) : (
                    <button
                      onClick={() => handleCancelBooking(booking.id)}
                      className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 mt-2"
                    >
                      Cancel Booking
                    </button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No bookings found.</p>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Details</h3>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-600">You can add additional sections here, like Order History, Saved Items, etc.</p>
        </div>
      </div>
    </div>
  );
};

export default Account;

import React, { useContext, useState } from 'react';
import { CartContext } from '../../../MyContext/CartContext';
import { useAuth } from '../../../MyContext/Authcontext';
import { toast } from 'react-toastify';

function Checkout() {
    const { cart, bookAllItems } = useContext(CartContext);
    const { currentUser } = useAuth();
    const [bookingDetails, setBookingDetails] = useState({
      userName: '',
      userEmail: '',
      userContact: '',
      address: ''
    });
  
    const handleBookingDetailsChange = (e) => {
      const { name, value } = e.target;
      setBookingDetails(prevDetails => ({ ...prevDetails, [name]: value }));
    };
  
    const handleBookAll = () => {
      if (currentUser) {
        bookAllItems(bookingDetails, currentUser); 
        toast.success("All items have been booked!");
      } else {
        toast.error("Login first to book all items");
      }
    };
  
    const calculateTotal = () => {
      return cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0).toFixed(2);
    };
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-4">Checkout</h3>
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold">{item.title}</h4>
                <p className="text-gray-500">Quantity: {item.quantity || 1}</p>
              </div>
              <div className="flex items-center space-x-2">
                <p className="font-semibold">${(item.price * (item.quantity || 1)).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        <hr className="my-4" />
        <div className="flex justify-between font-bold text-xl">
          <span>Total</span>
          <span>${calculateTotal()}</span>
        </div>
        <form className="mt-6 space-y-4">
          <input
            type="text"
            name="userName"
            placeholder="Full Name"
            value={bookingDetails.userName}
            onChange={handleBookingDetailsChange}
            className="p-2 border rounded w-full"
          />
          <input
            type="email"
            name="userEmail"
            placeholder="Email Address"
            value={bookingDetails.userEmail}
            onChange={handleBookingDetailsChange}
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            name="userContact"
            placeholder="Contact Number"
            value={bookingDetails.userContact}
            onChange={handleBookingDetailsChange}
            className="p-2 border rounded w-full"
          />
          <textarea
            name="address"
            placeholder="Address"
            value={bookingDetails.address}
            onChange={handleBookingDetailsChange}
            className="p-2 border rounded w-full"
          />
        </form>
        <button
          onClick={handleBookAll}
          className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg"
        >
          Book All
        </button>
      </div>
    );
}

export default Checkout;

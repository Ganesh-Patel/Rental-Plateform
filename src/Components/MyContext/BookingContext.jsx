
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { CartContext } from './CartContext';

const BookingContext = createContext();

export function BookingProvider({ children }) {
    const [bookings, setBookings] = useState([]);
    console.log('prevBookings:', bookings);

    const bookProperty = (property, bookingDetails) => {
        console.log(property, bookingDetails);
        setBookings(prevBookings => {
          const newBookings = [...prevBookings, { ...property, ...bookingDetails }];
          console.log('New bookings array:', newBookings); 
          return newBookings;
        });
        toast.success('Property booked successfully!');
      };
    
      useEffect(() => {
        console.log('Updated bookings:', bookings);
      }, [bookings]); //

 const getUserBookings = async (userName) => {
   
    return [bookings.filter((booking) => booking.userName === userName)]; 
  };

    return (
        <BookingContext.Provider value={{ bookings, bookProperty,getUserBookings }}>
            {children}
        </BookingContext.Provider>
    );
}

export function useBooking() {
    return useContext(BookingContext);
}

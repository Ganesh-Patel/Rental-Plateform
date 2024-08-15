import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const BookingContext = createContext();

export function BookingProvider({ children }) {
    const [bookings, setBookings] = useState([]);

    const bookProperty = (orderDetails, bookingDetails, removeFromCart, currentUser, isBulk = false) => {
        const amountInPaise = parseInt(orderDetails.totalAmount * 100); 
        console.log('isBulk', isBulk)

        const options = {
            key: "rzp_test_FxRK4tM1aleKRe",
            amount: amountInPaise,
            currency: 'INR',
            name: 'Totality Corp',
            description: 'Test Transaction',
            image: 'https://i.pinimg.com/736x/8a/b0/12/8ab0121c7d7a90f6415b4b0edaf035d9.jpg',
            handler: function (response) {
                if (isBulk) {
                    // Handle bulk booking
                    setBookings(prevBookings => [
                        ...prevBookings,
                        ...orderDetails.items.map(item => ({
                            ...item,
                            ...bookingDetails,
                            currentUser,
                            transactionId: response.razorpay_order_id,
                            paymentId: response.razorpay_payment_id,
                        }))
                    ]);
                    orderDetails.items.forEach(item => removeFromCart(item.id));
                } else {
                    // Handle single booking
                    setBookings(prevBookings => [
                        ...prevBookings,
                        {
                            ...orderDetails,
                            ...bookingDetails,
                            currentUser,
                            transactionId: response.razorpay_order_id,
                            paymentId: response.razorpay_payment_id,
                        }
                    ]);
                    removeFromCart(orderDetails.id);
                }
                toast.success('Payment Successful! Property booked successfully!');
            },
            prefill: {
                name: bookingDetails.userName,
                email: bookingDetails.userEmail,
                contact: bookingDetails.userContact,
            },
            notes: {
                address: bookingDetails.address
            },
            theme: {
                color: '#F7CA01'
            }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    useEffect(() => {
        console.log('Updated bookings:', bookings);
    }, [bookings]);

    const getUserBookings = async (userName) => {
        const filteredBookings = bookings.filter(
            booking => booking.userName.toLowerCase() === userName.toLowerCase()
        );
        return filteredBookings;
    };
    
    const cancelBooking = async (bookingId) => {
        setBookings(prevBookings => 
          prevBookings.map(booking => 
            booking.id === bookingId ? { ...booking, status: 'canceled' } : booking
          )
        );
      };

    return (
        <BookingContext.Provider value={{ bookProperty, bookings, getUserBookings, cancelBooking }}>
            {children}
        </BookingContext.Provider>
    );
}

export function useBooking() {
    return useContext(BookingContext);
}

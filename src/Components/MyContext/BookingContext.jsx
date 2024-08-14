import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const BookingContext = createContext();

export function BookingProvider({ children }) {
    const [bookings, setBookings] = useState([]);

    const bookProperty = (property, bookingDetails) => {
        const amountInPaise = parseInt(bookingDetails.payment * 100*82.5);
        console.log(bookingDetails.payment)
        console.log('amountInPaise', amountInPaise);

        const options = {
            key: "rzp_test_FxRK4tM1aleKRe",
            amount: amountInPaise, 
            currency: 'INR',
            name: 'Totality corp',
            description: 'Test Transaction',
            image: 'https://i.pinimg.com/736x/8a/b0/12/8ab0121c7d7a90f6415b4b0edaf035d9.jpg',
            handler: function (response) {
                setBookings(prevBookings => [
                    ...prevBookings,
                    {
                        ...property,
                        ...bookingDetails,
                        paymentId: response.razorpay_payment_id,
                    }
                ]);
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
        return bookings.filter((booking) => booking.userName === userName);
    };

    return (
        <BookingContext.Provider value={{ bookings, bookProperty, getUserBookings }}>
            {children}
        </BookingContext.Provider>
    );
}

export function useBooking() {
    return useContext(BookingContext);
}

// Testimonials.js
import React from 'react';
import testimonialsData from '../../Data/testimonialsData';

const Testimonials = () => {
  return (
   
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Clients Say</h2>
        <div className="flex  justify-center gap-4 flex-wrap">
          {testimonialsData.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-1/2 lg:w-1/4">
              <p className="text-gray-600 mb-4">{testimonial.quote}</p>
              <p className="font-semibold">{testimonial.clientName}</p>
            </div>
          ))}
        </div>
      </div>

  );
};

export default Testimonials;

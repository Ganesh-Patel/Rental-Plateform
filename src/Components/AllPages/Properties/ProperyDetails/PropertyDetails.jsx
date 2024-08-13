import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PropertiesContext } from '../../../MyContext/PropertiesContext';
import { CartContext } from '../../../MyContext/CartContext';
import { useAuth } from '../../../MyContext/Authcontext';

function PropertyDetails() {
  const { id } = useParams();
  const { properties } = useContext(PropertiesContext);
  const { addToCart } = useContext(CartContext);
  const user = useContext(useAuth);

  const property = properties.find((property) => property.id === parseInt(id));
    if (!property) {
      return <p>Property Details not found</p>;
    }

    return (
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 mt-8 min-h-96" >
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{property.title}</h1>

        {/* Location Details */}
        <p className="text-lg text-gray-700 mb-8">
          <strong>Location: </strong>
          {property.location.city}, {property.location.neighborhood}, {property.location.landmark}, {property.location.postalCode}
        </p>

        {/* Image Placeholder */}
        <img src="/path/to/your/image.jpg" alt={property.title} className="w-full h-auto rounded-lg mb-8" />

        {/* Price and Description */}
        <p className="text-xl font-semibold mb-4">${property.price}</p>
        <p className="text-lg mb-4">{property.description}</p>

        {/* Property Details */}
        <div className="grid grid-cols-2 gap-4">
          <p><strong>Type:</strong> {property.type}</p>
          <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
          <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
          <p><strong>Square Feet:</strong> {property.squareFeet}</p>
          <p><strong>Rating:</strong> {property.rating} Stars</p>
          <p><strong>Availability:</strong> {property.availability}</p>
        </div>

        {/* Owner Details */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold">Owner Details</h3>
          <p><strong>Name:</strong> {property.owner.name}</p>
          <p><strong>Contact:</strong> {property.owner.contact}</p>
          <p><strong>Phone:</strong> {property.owner.phone}</p>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex space-x-4">
          <button
            onClick={() => addToCart(property)}
            className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600"
          >
            Add to Cart
          </button>
          <button
            onClick={() => console.log('Save functionality to be implemented')}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
          >
            Save Property
          </button>
        </div>
      </div>
    );
 
}

export default PropertyDetails;
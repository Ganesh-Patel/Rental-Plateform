import React, { useContext } from 'react';
import PropertyCard from './PropertyCard/PropertyCard'; 
import {PropertiesContext} from '../../MyContext/PropertiesContext';


function Properties() {
  const { properties } = useContext(PropertiesContext);
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 mt-8">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Available Properties</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property, index) => (
          <PropertyCard
            key={index} 
            id={property.id}
            title={property.title}
            location={property.location}
            price={property.price}
            rating={property.rating}
            bedrooms={property.bedrooms}
            bathrooms={property.bathrooms}
            squareFeet={property.squareFeet}
            description={property.description}
          />
        ))}
      </div>
    </div>
  );
}

export default Properties;

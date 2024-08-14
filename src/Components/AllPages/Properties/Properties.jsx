import React, { useContext, useState } from 'react';
import PropertyCard from './PropertyCard/PropertyCard';
import { PropertiesContext } from '../../MyContext/PropertiesContext';
import { useSearch } from '../../MyContext/SearchContext';
import FilterSidebar from '../../filters/FilterSidebar';

function Properties() {
  const { properties } = useContext(PropertiesContext);
  const { searchTerm } = useSearch();
  const [filters, setFilters] = useState({
    location: [],
    price: '',
    rating: '',
    propertyType: [],
    bedrooms: '',
  });

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
  };

  const filteredProperties = properties.filter((property) => {
    const searchLower = searchTerm.toLowerCase();

    const matchesSearchTerm = (
      property.title.toLowerCase().includes(searchLower) ||
      property.location.city.toLowerCase().includes(searchLower) ||
      property.location.neighborhood.toLowerCase().includes(searchLower) ||
      property.location.landmark.toLowerCase().includes(searchLower) ||
      property.location.postalCode.toLowerCase().includes(searchLower) ||
      property.price.toString().includes(searchTerm) ||
      property.rating.toString().includes(searchTerm) ||
      property.owner.name.toLowerCase().includes(searchLower) ||
      property.owner.contact.toLowerCase().includes(searchLower) ||
      property.owner.phone.includes(searchTerm) ||
      property.listedBy.toLowerCase().includes(searchLower) ||
      property.ownedBy.toLowerCase().includes(searchLower) ||
      property.type.toLowerCase().includes(searchLower) ||
      property.bedrooms.toString().includes(searchTerm) ||
      property.bathrooms.toString().includes(searchTerm) ||
      property.squareFeet.toString().includes(searchTerm) ||
      property.availability.toLowerCase().includes(searchLower) ||
      property.description.toLowerCase().includes(searchLower)
    );

    const matchesFilters = (
      (filters.location.length === 0 || filters.location.includes(property.location.city)) &&
      (filters.propertyType.length === 0 || filters.propertyType.includes(property.type)) &&
      (filters.price === '' || property.price <= parseFloat(filters.price)) &&
      (filters.rating === '' || property.rating >= parseFloat(filters.rating)) &&
      (filters.bedrooms === '' || property.bedrooms >= parseInt(filters.bedrooms))
    );

    return matchesSearchTerm && matchesFilters;
  });

  return (
    <div className="flex gap-4 justify-between max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 mt-8">
      <div className="">
        <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
      </div>
      <div className="flex-1">
        <div className="flex flex-wrap gap-2">
        {filteredProperties.length > 0 ? (
            filteredProperties.map((property, index) => (
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
            ))
          ) : (
            <div className="flex items-center justify-center min-h-[200px] text-center text-gray-500">
              <p className="text-lg font-semibold">Sorry, no properties found for the selected filters. Please adjust your filters or search terms.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Properties;

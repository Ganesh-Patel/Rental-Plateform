import React, { useState } from 'react';
import { filterOptions } from '../Data/filterOptions'; // Adjust the path as necessary

const FilterSidebar = ({ filters = {}, onFilterChange }) => {
  const [showAll, setShowAll] = useState({
    location: false,
    propertyType: false,
  });

  const handleFilterChange = (filterType, value) => {
    const updatedFilters = { ...filters };

    if (filterType === 'location' || filterType === 'propertyType') {
      if (!Array.isArray(updatedFilters[filterType])) {
        updatedFilters[filterType] = [];
      }

      if (updatedFilters[filterType].includes(value)) {
        updatedFilters[filterType] = updatedFilters[filterType].filter((item) => item !== value);
      } else {
        updatedFilters[filterType].push(value);
      }
    } else {
      const filterName = filterType.replace(/[\s_.,]+/g, '').toLowerCase();
      updatedFilters[filterName] = value;
    }

    onFilterChange(updatedFilters);
  };

  const clearAllFilters = () => {
    onFilterChange({
      location: [],
      price: '',
      rating: '',
      propertyType: [],
      bedrooms: '',
    });
  };

  const renderOptions = (options, type, filterType) => {
    if (!Array.isArray(options)) {
      return null;
    }

    if (type === 'checkbox') {
      return options.map((option, index) => (
        <label key={index} className="block text-sm">
          <input
            type="checkbox"
            className="mr-2"
            onChange={() => handleFilterChange(filterType, option.value)}
            checked={filters[filterType]?.includes(option.value) || false}
          />
          {option.label}
        </label>
      ));
    }

    if (type === 'radio') {
      return options.map((option, index) => (
        <label key={index} className="block text-sm">
          <input
            type="radio"
            className="mr-2"
            name={filterType}
            onChange={() => handleFilterChange(filterType, option.value)}
            checked={filters[filterType] === option.value}
          />
          {option.label}
        </label>
      ));
    }

    return null;
  };

  return (
    <div className="h-[calc(100vh-8vh)] w-[25vw] overflow-y-auto bg-white shadow-lg p-4">
      <button
        className="mb-4 p-2 w-full bg-red-500 text-white text-sm rounded"
        onClick={clearAllFilters}
      >
        Clear All Filters
      </button>
      {filterOptions.map((filter, index) => {
        const isExpandable = filter.label === 'Location' || filter.label === 'Property Type';
        const showMore = showAll[filter.label.toLowerCase().replace(' ', '')];

        return (
          <div key={index} className="mb-6">
            <h3 className="font-semibold text-gray-700">{filter.label}</h3>
            {renderOptions(
              filter.options.slice(0, showMore ? filter.options.length : 5),
              filter.type,
              filter.label.toLowerCase().replace(' ', '')
            )}
            {isExpandable && filter.options.length > 5 && (
              <button
                className="mt-2 text-blue-500 text-sm"
                onClick={() =>
                  setShowAll((prevState) => ({
                    ...prevState,
                    [filter.label.toLowerCase().replace(' ', '')]: !showMore,
                  }))
                }
              >
                {showMore ? 'See Less' : 'See More'}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FilterSidebar;

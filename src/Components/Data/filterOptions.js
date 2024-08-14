export const filterOptions = [
  {
    label: "Location",
    type: "checkbox",
    options: [
      { value: "New York", label: "New York" },
      { value: "San Francisco", label: "San Francisco" },
      { value: "Los Angeles", label: "Los Angeles" },
      { value: "Chicago", label: "Chicago" },
      { value: "Miami", label: "Miami" },
      // Add more locations as needed
    ],
  },
  {
    label: "Price Range",
    type: "radio",
    name: "price",
    options: [
      { value: "Under $1000", label: "Under $1000" },
      { value: "$1000 - $2000", label: "$1000 - $2000" },
      { value: "$2000 - $3000", label: "$2000 - $3000" },
      { value: "$3000 - $4000", label: "$3000 - $4000" },
      { value: "Over $4000", label: "Over $4000" },
    ],
  },
  {
    label: "Rating",
    type: "radio",
    name: "rating",
    options: [
      { value: "4 & Up", label: "4 Stars & Up" },
      { value: "3 & Up", label: "3 Stars & Up" },
      { value: "2 & Up", label: "2 Stars & Up" },
      { value: "1 & Up", label: "1 Stars & Up" },
    ],
  },
  {
    label: "Property Type",
    type: "checkbox",
    options: [
      { value: "Apartment", label: "Apartment" },
      { value: "House", label: "House" },
      { value: "Studio", label: "Studio" },
      { value: "Villa", label: "Villa" },
      // Add more property types as needed
    ],
  },
  {
    label: "Bedrooms",
    type: "radio",
    name: "bedrooms",
    options: [
      { value: "1", label: "1 Bedroom" },
      { value: "2", label: "2 Bedrooms" },
      { value: "3", label: "3 Bedrooms" },
      { value: "4", label: "4+ Bedrooms" },
    ],
  },
];

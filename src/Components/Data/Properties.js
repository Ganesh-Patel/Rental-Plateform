const properties = [
    {
      "id": 1,
      "title": "Modern 2BHK Apartment",
      "location": {
        "city": "New York",
        "neighborhood": "Manhattan",
        "landmark": "Central Park",
        "postalCode": "10001"
      },
      "price": 3500,
      "rating": 4.5,
      "owner": {
        "name": "John Doe",
        "contact": "john.doe@example.com",
        "phone": "+1-234-567-8901"
      },
      "listedBy": "Agent",
      "ownedBy": "John Doe",
      "type": "Apartment",
      "bedrooms": 2,
      "bathrooms": 2,
      "squareFeet": 1200,
      "availability": "Available",
      "description": "A spacious 2BHK apartment with modern amenities in the heart of Manhattan."
    },
    {
      "id": 2,
      "title": "Cozy 1BHK Studio",
      "location": {
        "city": "Los Angeles",
        "neighborhood": "Hollywood",
        "landmark": "Hollywood Sign",
        "postalCode": "90028"
      },
      "price": 2000,
      "rating": 4.0,
      "owner": {
        "name": "Jane Smith",
        "contact": "jane.smith@example.com",
        "phone": "+1-987-654-3210"
      },
      "listedBy": "Owner",
      "ownedBy": "Jane Smith",
      "type": "Studio",
      "bedrooms": 1,
      "bathrooms": 1,
      "squareFeet": 600,
      "availability": "Rented",
      "description": "A cozy studio apartment with a great view of the Hollywood Sign."
    },
    {
      "id": 3,
      "title": "Luxurious 3BHK Villa",
      "location": {
        "city": "San Francisco",
        "neighborhood": "Nob Hill",
        "landmark": "Golden Gate Bridge",
        "postalCode": "94109"
      },
      "price": 5000,
      "rating": 4.8,
      "owner": {
        "name": "Alice Brown",
        "contact": "alice.brown@example.com",
        "phone": "+1-345-678-9012"
      },
      "listedBy": "Agent",
      "ownedBy": "Alice Brown",
      "type": "Villa",
      "bedrooms": 3,
      "bathrooms": 3,
      "squareFeet": 2500,
      "availability": "Available",
      "description": "A luxurious villa with stunning views of the Golden Gate Bridge."
    },
    {
      "id": 4,
      "title": "Charming 2BHK Cottage",
      "location": {
        "city": "Seattle",
        "neighborhood": "Capitol Hill",
        "landmark": "Space Needle",
        "postalCode": "98102"
      },
      "price": 2800,
      "rating": 4.3,
      "owner": {
        "name": "Robert Green",
        "contact": "robert.green@example.com",
        "phone": "+1-456-789-0123"
      },
      "listedBy": "Owner",
      "ownedBy": "Robert Green",
      "type": "Cottage",
      "bedrooms": 2,
      "bathrooms": 1,
      "squareFeet": 1000,
      "availability": "Available",
      "description": "A charming 2BHK cottage with a beautiful garden and a view of the Space Needle."
    },
    {
      "id": 5,
      "title": "Elegant 4BHK House",
      "location": {
        "city": "Chicago",
        "neighborhood": "Lincoln Park",
        "landmark": "Lincoln Park Zoo",
        "postalCode": "60614"
      },
      "price": 4200,
      "rating": 4.6,
      "owner": {
        "name": "Emily White",
        "contact": "emily.white@example.com",
        "phone": "+1-567-890-1234"
      },
      "listedBy": "Agent",
      "ownedBy": "Emily White",
      "type": "House",
      "bedrooms": 4,
      "bathrooms": 3,
      "squareFeet": 3000,
      "availability": "Available",
      "description": "An elegant 4BHK house with a spacious backyard near Lincoln Park Zoo."
    },
    {
      "id": 6,
      "title": "Contemporary 1BHK Loft",
      "location": {
        "city": "Austin",
        "neighborhood": "Downtown",
        "landmark": "State Capitol",
        "postalCode": "73301"
      },
      "price": 2200,
      "rating": 4.2,
      "owner": {
        "name": "Sarah Johnson",
        "contact": "sarah.johnson@example.com",
        "phone": "+1-678-901-2345"
      },
      "listedBy": "Agent",
      "ownedBy": "Sarah Johnson",
      "type": "Loft",
      "bedrooms": 1,
      "bathrooms": 1,
      "squareFeet": 750,
      "availability": "Available",
      "description": "A contemporary 1BHK loft with modern amenities and close to the State Capitol."
    },
    {
      "id": 7,
      "title": "Spacious 3BHK Apartment",
      "location": {
        "city": "Denver",
        "neighborhood": "Cherry Creek",
        "landmark": "Cherry Creek Shopping Center",
        "postalCode": "80206"
      },
      "price": 3100,
      "rating": 4.4,
      "owner": {
        "name": "Michael Harris",
        "contact": "michael.harris@example.com",
        "phone": "+1-789-012-3456"
      },
      "listedBy": "Owner",
      "ownedBy": "Michael Harris",
      "type": "Apartment",
      "bedrooms": 3,
      "bathrooms": 2,
      "squareFeet": 1800,
      "availability": "Rented",
      "description": "A spacious 3BHK apartment with easy access to Cherry Creek Shopping Center."
    },
    {
      "id": 8,
      "title": "Modern 2BHK Condo",
      "location": {
        "city": "San Diego",
        "neighborhood": "La Jolla",
        "landmark": "La Jolla Cove",
        "postalCode": "92037"
      },
      "price": 2900,
      "rating": 4.7,
      "owner": {
        "name": "Linda Martinez",
        "contact": "linda.martinez@example.com",
        "phone": "+1-890-123-4567"
      },
      "listedBy": "Agent",
      "ownedBy": "Linda Martinez",
      "type": "Condo",
      "bedrooms": 2,
      "bathrooms": 2,
      "squareFeet": 1300,
      "availability": "Available",
      "description": "A modern 2BHK condo with a beautiful view of La Jolla Cove."
    },
    {
      "id": 9,
      "title": "Classic 4BHK Mansion",
      "location": {
        "city": "Boston",
        "neighborhood": "Beacon Hill",
        "landmark": "Boston Common",
        "postalCode": "02108"
      },
      "price": 7000,
      "rating": 4.9,
      "owner": {
        "name": "James Lee",
        "contact": "james.lee@example.com",
        "phone": "+1-901-234-5678"
      },
      "listedBy": "Owner",
      "ownedBy": "James Lee",
      "type": "Mansion",
      "bedrooms": 4,
      "bathrooms": 4,
      "squareFeet": 4000,
      "availability": "Available",
      "description": "A classic 4BHK mansion with historic charm near Boston Common."
    },
    {
      "id": 10,
      "title": "Chic 2BHK Townhouse",
      "location": {
        "city": "Philadelphia",
        "neighborhood": "Old City",
        "landmark": "Liberty Bell",
        "postalCode": "19106"
      },
      "price": 2600,
      "rating": 4.1,
      "owner": {
        "name": "Laura Wilson",
        "contact": "laura.wilson@example.com",
        "phone": "+1-012-345-6789"
      },
      "listedBy": "Agent",
      "ownedBy": "Laura Wilson",
      "type": "Townhouse",
      "bedrooms": 2,
      "bathrooms": 2,
      "squareFeet": 1100,
      "availability": "Available",
      "description": "A chic 2BHK townhouse in historic Old City with a view of the Liberty Bell."
    }
  ]

  export default properties
  
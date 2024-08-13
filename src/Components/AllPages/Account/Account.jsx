import React from 'react';
import { FaUserCircle } from 'react-icons/fa'; // For the user icon

const Account = () => {
  const accountDetails = {
    "username": "johndoe123",
    "fullName": "John Doe",
    "email": "johndoe@example.com",
    "phone": "+1-234-567-8901",
    "address": "1234 Elm Street, New York, NY, 10001",
    "membership": "Premium",
    "joinDate": "2023-05-15",
    "profilePicture": "https://via.placeholder.com/150" // Example placeholder image
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 mt-8 min-h-96">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center space-x-6">
          {/* User Icon or Profile Picture */}
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {accountDetails.profilePicture ? (
              <img
                src={accountDetails.profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUserCircle className="text-gray-500 text-6xl" />
            )}
          </div>

          {/* User Details */}
          <div className="flex flex-col space-y-2">
            <h2 className="text-2xl font-semibold text-gray-900">{accountDetails.fullName}</h2>
            <p className="text-gray-600">@{accountDetails.username}</p>
            <p className="text-gray-600">{accountDetails.email}</p>
            <p className="text-gray-600">{accountDetails.phone}</p>
            <p className="text-gray-600">{accountDetails.address}</p>
            <p className="text-gray-600"><strong>Membership:</strong> {accountDetails.membership}</p>
            <p className="text-gray-600"><strong>Joined:</strong> {new Date(accountDetails.joinDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Additional Sections like Order History, Saved Items, etc. */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Details</h3>
        <div className="bg-gray-100 p-4 rounded-lg">
          {/* Add more sections or information here */}
          <p className="text-gray-600">You can add additional sections here, like Order History, Saved Items, etc.</p>
        </div>
      </div>
    </div>
  );
};

export default Account;

import React, { useState } from "react";
import BookVenueForm from "./BookVenueForm";

function VenueList({ venue }) {
  const [showBookingForm, setShowBookingForm] = useState(false);

  const handleBookClick = () => {
    setShowBookingForm(true);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {showBookingForm ? (
        <BookVenueForm 
          venueId={venue.venueId} 
          onBack={() => setShowBookingForm(false)}
        />
      ) : (
        <>
          <img
            src={venue.imageUrl}
            alt={venue.name}
            className="w-full h-center object-cover rounded-md"
          />
          <h2 className="text-lg font-semibold mt-2">{venue.name}</h2>
          <div className="flex justify-between items-center mt-2">
            <p className="text-gray-600">Rs.{venue.price} per hour</p>
            <button
              onClick={handleBookClick}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Book
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default VenueList;

import React from "react";

const RemoveVenueList = ({ venue, onRemove }) => {
  return (
    <div className="border p-4 rounded shadow">
      
      <h2 className="text-xl font-semibold">{venue.name}</h2>
      <p className="text-md">{venue.address}</p>

      <img src={venue.imageUrl} alt={venue.name} className="w-full h-auto rounded-md mt-2 mb-2" />
      <button
        className="mt-2 bg-red-500 text-white py-2 px-3 rounded-md"
        onClick={() => onRemove(venue.venueId)}
      >
        Remove
      </button>
    </div>
  );
};

export default RemoveVenueList;

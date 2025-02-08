import React from "react";

const RemoveVenueList = ({ venue, onRemove }) => {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-semibold">{venue.name}</h2>
      <p className="text-md">{venue.address}</p>

      <img src={venue.imageUrl} alt={venue.name} className="w-full h-auto mb-2" />
      <button
        className="mt-2 bg-red-500 text-white py-1 px-3 rounded"
        onClick={() => onRemove(venue.venueId)}
      >
        Remove Venue
      </button>
    </div>
  );
};

export default RemoveVenueList;

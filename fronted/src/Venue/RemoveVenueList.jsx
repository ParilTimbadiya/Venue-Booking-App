import React from "react";

const RemoveVenueList = ({ venue, onRemove }) => {
  return (
    <div className="bg-[#2d374863] shadow-md rounded-lg p-4 relative flex flex-col transform transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-105 hover:shadow-lg">
      <div className="w-full h-48 md:h-56 lg:h-64 overflow-hidden rounded-md">
        <img src={venue.imageUrl} alt={venue.name} className="w-full h-full object-cover" />
      </div>
      <h2 className="text-2xl font-bold mt-3 font-my">{venue.name}</h2>
      <div className="flex justify-between items-center">
        <p className="text-[#a0aec0] font-normal text-base font-my">{venue.address}</p>
        <p className="text-[#a0aec0] font-normal text-base font-my">{venue.merchantEmail}</p>
        <button
          className="mt-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-all duration-300"
          onClick={() => onRemove(venue.venueId)}
        >
          Discard
        </button>
      </div>
    </div>
  );
};

export default RemoveVenueList;


import React, { useState } from "react";
import BookVenueForm from "./BookVenueForm";

function VenueList({ venue }) {
  const [showBookingForm, setShowBookingForm] = useState(false);

  const handleBookClick = () => {
    setShowBookingForm(true);
  };

  const handleCloseForm = () => {
    setShowBookingForm(false);
  };

  return (
    <>
      {/* Venue Card with 3D Pop-Up Effect */}
      <div className="bg-[#2d374863] shadow-md rounded-lg p-4 relative flex flex-col transform transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-105 hover:shadow-lg">
        <div className="w-full h-48 md:h-56 lg:h-64 overflow-hidden rounded-md">
          <img
            src={venue.imageUrl}
            alt={venue.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-2xl font-bold mt-3 font-my">{venue.name}</h2>
        <div className="flex justify-between items-center ">
          <p className="text-[#a0aec0] font-normal text-base font-my">{venue.city} -   {venue.state} </p>
        </div>
        <div className="flex justify-between items-center ">
          <p className="text-[#a0aec0] font-normal text-base font-my">{venue.address}</p>
        </div>
        <div className="flex justify-between items-center ">
          <p className="text-[#a0aec0] font-normal text-base font-my">Rs.{venue.price} per hour</p>

          <button
            onClick={handleBookClick}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-300"
          >
            Book
          </button>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <>
          {/* Dark Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

          {/* Booking Form Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <BookVenueForm venueId={venue.venueId} venuePrice={venue.price} onBack={handleCloseForm} />
          </div>
        </>
      )}
    </>
  );
}

export default VenueList;
// import React, { useState } from "react";
// import BookVenueForm from "./BookVenueForm";

// function VenueList({ venue }) {
//   const [showBookingForm, setShowBookingForm] = useState(false);

//   const handleBookClick = () => {
//     setShowBookingForm(true);
//   };

//   return (
//     <div className="bg-white shadow-md rounded-lg p-4">
//       {showBookingForm ? (
//         <BookVenueForm 
//           venueId={venue.venueId} 
//           onBack={() => setShowBookingForm(false)}
//         />
//       ) : (
//         <>
//           <img
//             src={venue.imageUrl}
//             alt={venue.name}
//             className="w-full h-center object-cover rounded-md"
//           />
//           <h2 className="text-lg font-semibold mt-2">{venue.name}</h2>
//           <div className="flex justify-between items-center mt-2">
//             <p className="text-gray-600">Rs.{venue.price} per hour</p>
//             <button
//               onClick={handleBookClick}
//               className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
//             >
//               Book
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default VenueList;

import React, { useEffect, useState } from "react";
import { publicApi } from "../utils/api"; // Correctly import the fetchVenues function
import statecity from "../data/statecity";
import VenueList from "./VenueList"; // Import VenueList component

const BookVenue = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [selectedState, setSelectedState] = useState(""); // State for selected state
  const [states, setStates] = useState([]); // State for storing states

  useEffect(() => {
    setStates(statecity.state_arr);

    const getVenues = async () => {
      setLoading(true); // Start loading
      try {
        const response = await publicApi.get('/venuelist');
        if (response && response.data) {
          setVenues(response.data);
        } else {
          setVenues([]);
          console.error("Invalid response format:", response);
        }
      } catch (error) {
        console.error("Error fetching venues:", error);
        setVenues([]);
      } finally {
        setLoading(false); // Stop loading
      }
    };   
    getVenues();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Replace with your Loader component if available
  }
  
  return (
    <div className="px-9 sm:px-20 md:px-24 py-11 bg-[#0c131a] pt-[80px] text-[#CFD1D3] ">
    <h1 className="text-4xl p-6 sm:text-left font-my font-bold">Book Venue</h1>
      <div className="mb-4">
        <label className="text-base font-medium text-slate-300">Select State</label>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="mt-2 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400 w-full"
        >
          <option value="">All States</option>
          {states.map((st, index) => (
              <option key={index} value={st}>{st}</option>
            ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {venues
          .filter(venue => selectedState === "" || venue.state === selectedState) // Filter venues by selected state
          .map((venue) => (
            <VenueList key={venue.venueId} venue={venue} />
        ))}
      </div>
    </div>

  );
};

export default BookVenue;

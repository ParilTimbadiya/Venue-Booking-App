import React, { useEffect, useState } from "react";
import RemoveVenueList from "./RemoveVenueList";
import { privateApi, publicApi } from "../utils/api"; // Correctly import the fetchVenues function

const RemoveVenue = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
  
  const handleRemoveVenue = async (venueId) => {
    try {
      await privateApi.delete(`/delete/${venueId}`);
      setVenues(venues.filter(venue => venue.venueId !== venueId));
    } catch (error) {
      console.log("Error removing venue:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Replace with your Loader component if available
  }
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Remove Venue</h1>
      <div className="grid grid-cols-1 p-3 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {venues.map((venue) => (
          <RemoveVenueList key={venue.venueId} venue={venue} onRemove={handleRemoveVenue} />
        ))}
      </div>
    </div>
  );
};

export default RemoveVenue;

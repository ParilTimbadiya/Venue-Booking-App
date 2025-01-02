import React, { useEffect, useState } from "react";
import VenueList from "./VenueList";
import { publicApi } from "../utils/api"; // Correctly import the fetchVenues function

const BookVenue = () => {
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
      } finally {
        setLoading(false); // Stop loading
      }
    };

    console.log("fetch value useEffect called");
    getVenues();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Replace with your Loader component if available
  }

  console.log("Venues data:", venues);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Book Venue</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {venues.map((venue) => (
          <VenueList key={venue.venueId} venue={venue} />
        ))}
      </div>
    </div>
  );
};

export default BookVenue;

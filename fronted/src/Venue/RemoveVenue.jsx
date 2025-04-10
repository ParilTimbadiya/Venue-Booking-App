import React, { useEffect, useState } from "react";
import RemoveVenueList from "./RemoveVenueList";
import { ToastContainer, toast } from "react-toastify";
import { privateApi, publicApi } from "../utils/api"; // Correctly import the fetchVenues function

const RemoveVenue = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const isMerchant = localStorage.getItem("role") === "merchant";

  useEffect(() => {
    const getVenues = async () => {
      setLoading(true); // Start loading
      try {
        
        const response = await publicApi.get('/removevenuelist');
        
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
     // Check if the user is an admin (this logic will depend on your authentication setup)
     const checkAdminStatus = () => {
      // Implement your logic to check if the user is an admin
      // For example, you might check a user role from context or local storage
      const userRole = localStorage.getItem('role'); // Example
      
      setIsAdmin(userRole === 'admin');
    };
    
    checkAdminStatus();
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
  if (!isAdmin && !isMerchant) {
    return (
      <div className="p-12 mt-20">
        <div>You do not have permission to view this page.</div>

      </div>
    ); // Message for non-admin users

  }
  return (
    <div className="p-5 text-white  ">
      <h1 className="text-2xl font-bold m-4">Discard Venue</h1>
      <div className="grid grid-cols-1 p-3 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {venues.map((venue) => (
          <RemoveVenueList key={venue.venueId} venue={venue} onRemove={handleRemoveVenue} />
        ))}
      </div>
    </div>
  );
};

export default RemoveVenue;

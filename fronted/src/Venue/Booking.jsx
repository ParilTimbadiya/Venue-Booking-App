import React, { useEffect, useState } from "react";
import { publicApi } from "../utils/api"; // Import the API utility
import "./Booking.css";
const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); // Assume a way to check if the user is admin

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await publicApi.get('/booking-data'); // Fetch booking data
        if (response && response.data) {
          setBookings(response.data);
        } else {
          setBookings([]);
          console.error("Invalid response format:", response);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookings([]);
      } finally {
        setLoading(false);
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
    fetchBookings();
  }, []);

  if (loading) {
    return <div className="p-12 mt-20">Loading...</div>; // Replace with your Loader component if available


  }

  if (!isAdmin) {
    return (
      <div className="p-12 mt-20">
        <div>You do not have permission to view this page.</div>

      </div>
    ); // Message for non-admin users

  }

  return (
    <div className="p-5 mt-12">
      <h1 className="text-2xl font-bold mb-4">Booking Data</h1>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Venue</th>
            <th className="border border-gray-300 p-2">User Email</th>
            <th className="border border-gray-300 p-2">Location</th>
            <th className="border border-gray-300 p-2">Booking ID</th>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Time</th>
            <th className="border border-gray-300 p-2">Duration</th>
            <th className="border border-gray-300 p-2">Price per hour</th>
            <th className="border border-gray-300 p-2">Total Amount</th>
            <th className="border border-gray-300 p-2">Created At</th>

          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.bookingId}>
              <td className="border border-gray-300 p-2">{booking.venue.name}</td>
              <td className="border border-gray-300 p-2">{booking.user.email}</td>
              <td className="border border-gray-300 p-2">{booking.venue.address}</td>
              <td className="border border-gray-300 p-2">{booking.bookingId}</td>
              <td className="border border-gray-300 p-2">{booking.bookingDate}</td>
              <td className="border border-gray-300 p-2">{booking.start_time} - {booking.end_time}</td>
              <td className="border border-gray-300 p-2">{booking.total_hours} hour</td>
              <td className="border border-gray-300 p-2">{booking.venue.price}</td>
              <td className="border border-gray-300 p-2">₹{booking.total_cost}</td>
              <td className="border border-gray-300 p-2">{booking.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default Booking;

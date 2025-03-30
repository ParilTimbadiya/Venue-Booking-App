import React, { useEffect, useState } from "react";
import { publicApi } from "../utils/api"; // Import the API utility
import "./Booking.css";
const OrderData = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); // Assume a way to check if the user is admin
  const isMerchant = localStorage.getItem("role") === "merchant";


  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await publicApi.get('/order-data'); // Fetch booking data
        console.log(response.data);
        
        if (response && response.data) {
          setBookings(response.data);
        } else {
          setBookings([]);
          console.error("Invalid response format:", response);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
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
    fetchOrder();
  }, []);
  const handleShippedOrder = async (orderId) => {
    try {
      const response = await publicApi.post('/shipped-order', { orderId });
      if (response.status === 200) {
        alert("Shipped item successfully");
      } else {
        alert("Failed to shipped item");
      }
    } catch (error) {
      console.error("Error: ", error);
      alert("An error occurred while canceld booking");
    }
  };
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
      <h1 className="text-2xl font-bold mb-4">Order Data</h1>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Order ID</th>
            <th className="border border-gray-300 p-2">User Name</th>
            <th className="border border-gray-300 p-2">User Email</th>
            <th className="border border-gray-300 p-2">Address</th>
            <th className="border border-gray-300 p-2">Payment Method</th>
            <th className="border border-gray-300 p-2">Phone</th>
            <th className="border border-gray-300 p-2">Product Items</th>
            <th className="border border-gray-300 p-2">Total Amount</th>
            <th className="border border-gray-300 p-2">Status</th>

          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.orderId}>
              <td className="border border-gray-300 p-2">{booking.orderId}</td>
              <td className="border border-gray-300 p-2">{booking.fullName}</td>
              <td className="border border-gray-300 p-2">{booking.email}</td>
              <td className="border border-gray-300 p-2">{booking.address}</td>
              <td className="border border-gray-300 p-2">{booking.paymentMethod}</td>
              <td className="border border-gray-300 p-2">{booking.phone}</td>
              <td className="border border-gray-300 p-2">{booking.orderItems.length}</td>
              <td className="border border-gray-300 p-2">{booking.totalAmount}</td>
              <td className="border border-gray-300 p-2">
                {booking.status=="Unshipped"?(<button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                      onClick={() => handleShippedOrder(booking.orderId)}
                      >
                        Make Shipped
                      </button>):(<p>Shipped</p>)
              }</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default OrderData;

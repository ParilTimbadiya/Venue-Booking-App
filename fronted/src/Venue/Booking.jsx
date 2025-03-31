import React, { useEffect, useState } from "react";
import { publicApi } from "../utils/api";
import "./Booking.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMerchant, setIsMerchant] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({
    start: "",
    end: ""
  });

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await publicApi.get('/booking-data');
        if (response?.data) {
          setBookings(response.data);
          setFilteredBookings(response.data);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    const checkUserRole = () => {
      const userRole = localStorage.getItem('role');
      setIsAdmin(userRole === 'admin');
      setIsMerchant(userRole === 'merchant');
    };

    checkUserRole();
    fetchBookings();
  }, []);

  useEffect(() => {
    let results = [...bookings];

    // Apply search filter
    if (searchTerm) {
      results = results.filter(booking =>
        booking.venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.venue.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply date range filter
    if (dateRange.start && dateRange.end) {
      results = results.filter(booking => {
        const bookingDate = new Date(booking.bookingDate);
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);
        return bookingDate >= startDate && bookingDate <= endDate;
      });
    }

    setFilteredBookings(results);
  }, [bookings, searchTerm, dateRange]);

  const handleCancelBooking = async (bookingId) => {
    try {
      console.log("Attempting to cancel booking:", bookingId); // Debug log

      const response = await publicApi.post('/cancel-booking', {
        bookingId: bookingId
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Add if needed
        }
      });

      console.log("Cancel response:", response); // Debug log

      if (response.status === 200) {
        // Update local state
        setBookings(prev => prev.map(booking =>
          booking.bookingId === bookingId ? {...booking, status: "cancelled"} : booking
        ));

        // Also update filtered bookings
        setFilteredBookings(prev => prev.map(booking =>
          booking.bookingId === bookingId ? {...booking, status: "cancelled"} : booking
        ));

        toast.success("Booking cancelled successfully!");
      } else {
        toast.error(response.data?.message || "Failed to cancel booking");
      }
    } catch (error) {
      console.error("Detailed error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "An error occurred while cancelling booking");
    }
  };

  const calculateStats = () => {
    const totalBookings = bookings.length;
    const activeBookings = bookings.filter(b => b.status === "confirmed").length;
    const cancelledBookings = bookings.filter(b => b.status === "cancelled").length;
    const totalRevenue = bookings.reduce((sum, booking) => sum + booking.total_cost, 0);

    return { totalBookings, activeBookings, cancelledBookings, totalRevenue };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // if (!isAdmin && !isMerchant) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <div className="bg-[#1c2736] p-8 rounded-lg shadow-lg text-center">
  //         <h2 className="text-2xl font-bold text-red-500 mb-4">Access Denied</h2>
  //         <p className="text-gray-300">You don't have permission to view this page.</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="p-5 mt-12 bg-[#0f172a] min-h-screen">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6 text-[#6eb4ef]">Booking Management Dashboard</h1>

      {/* Stats Cards */}
      {isAdmin || isMerchant &&
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#1c2736] p-6 rounded-lg shadow-lg border-l-4 border-blue-500 hover:scale-105 transition-transform">
          <h3 className="text-gray-400 text-sm font-medium">Total Bookings</h3>
          <p className="text-3xl font-bold text-white">{stats.totalBookings}</p>
        </div>
        <div className="bg-[#1c2736] p-6 rounded-lg shadow-lg border-l-4 border-green-500 hover:scale-105 transition-transform">
          <h3 className="text-gray-400 text-sm font-medium">Active Bookings</h3>
          <p className="text-3xl font-bold text-white">{stats.activeBookings}</p>
        </div>
        <div className="bg-[#1c2736] p-6 rounded-lg shadow-lg border-l-4 border-red-500 hover:scale-105 transition-transform">
          <h3 className="text-gray-400 text-sm font-medium">Cancelled</h3>
          <p className="text-3xl font-bold text-white">{stats.cancelledBookings}</p>
        </div>
        <div className="bg-[#1c2736] p-6 rounded-lg shadow-lg border-l-4 border-yellow-500 hover:scale-105 transition-transform">
          <h3 className="text-gray-400 text-sm font-medium">Total Revenue</h3>
          <p className="text-3xl font-bold text-white">₹{stats.totalRevenue}</p>
        </div>
      </div>
      }

      {/* Filters Section */}
      <div className="bg-[#1c2736] rounded-lg shadow-lg p-6 mb-8 border border-[#6eb5ef40]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">Search Bookings</label>
            <input
              type="text"
              placeholder="Search by venue, email or location..."
              className="w-full px-4 py-2 rounded-md bg-[#2a3a4d] text-gray-300 border border-[#6eb5ef40] focus:outline-none focus:ring-2 focus:ring-[#6eb4ef]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">From Date</label>
            <input
              type="date"
              className="w-full px-4 py-2 rounded-md bg-[#2a3a4d] text-gray-300 border border-[#6eb5ef40] focus:outline-none focus:ring-2 focus:ring-[#6eb4ef]"
              value={dateRange.start}
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">To Date</label>
            <input
              type="date"
              className="w-full px-4 py-2 rounded-md bg-[#2a3a4d] text-gray-300 border border-[#6eb5ef40] focus:outline-none focus:ring-2 focus:ring-[#6eb4ef]"
              value={dateRange.end}
              onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
            />
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-[#1c2736] rounded-lg shadow-lg overflow-hidden border border-[#6eb5ef40]">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-[#2a3a4d]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#6eb4ef] uppercase tracking-wider">Venue</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#6eb4ef] uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#6eb4ef] uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#6eb4ef] uppercase tracking-wider">Duration</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#6eb4ef] uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#6eb4ef] uppercase tracking-wider">Cancel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a3a4d]">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking.bookingId} className="hover:bg-[#2a3a4d] transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-300">{booking.venue.name}</div>
                      <div className="text-xs text-gray-500">{booking.venue.address}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {booking.user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">{new Date(booking.bookingDate).toLocaleDateString()}</div>
                      <div className="text-xs text-gray-500">{booking.start_time} - {booking.end_time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {booking.total_hours} hour{booking.total_hours > 1 ? 's' : ''}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      ₹{booking.total_cost}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleCancelBooking(booking.bookingId)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-400">
                    No bookings found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Dashboard Elements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="bg-[#1c2736] p-6 rounded-lg shadow-lg border border-[#6eb5ef40]">
          <h3 className="text-lg font-semibold text-[#6eb4ef] mb-4">Recent Bookings</h3>
          <div className="space-y-4">
            {bookings.slice(0, 5).map(booking => (
              <div key={booking.bookingId} className="flex items-center p-3 hover:bg-[#2a3a4d] rounded-lg transition-colors">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#6eb4ef] flex items-center justify-center text-white font-bold">
                  {booking.venue.name.charAt(0)}
                </div>
                <div className="ml-4 flex-grow">
                  <p className="text-sm font-medium text-gray-300">{booking.venue.name}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(booking.bookingDate).toLocaleDateString()} • {booking.start_time}
                  </p>
                </div>
                <div className="ml-auto">
                  <span className="text-sm font-medium text-gray-300">₹{booking.total_cost}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1c2736] p-6 rounded-lg shadow-lg border border-[#6eb5ef40]">
          <h3 className="text-lg font-semibold text-[#6eb4ef] mb-4">Booking Activity</h3>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="text-gray-400 mb-2">Booking trends visualization</div>
              <div className="w-full bg-[#2a3a4d] rounded-full h-4">
                <div
                  className="bg-[#6eb4ef] h-4 rounded-full"
                  style={{ width: `${(stats.activeBookings / stats.totalBookings) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Active: {stats.activeBookings}</span>
                <span>Cancelled: {stats.cancelledBookings}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;




// 
// import React, { useEffect, useState } from "react";
// import { publicApi } from "../utils/api"; // Import the API utility
// import { ToastContainer, toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import "./Booking.css";
// const Booking = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isAdmin, setIsAdmin] = useState(false); // Assume a way to check if the user is admin
//   const isMerchant = localStorage.getItem("role") === "merchant";
//     const navigate = useNavigate();
  

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await publicApi.get('/booking-data'); // Fetch booking data
//         if (response && response.data) {
//           setBookings(response.data);
//         } else {
//           setBookings([]);
//           console.error("Invalid response format:", response);
//         }
//       } catch (error) {
//         console.error("Error fetching bookings:", error);
//         setBookings([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     // Check if the user is an admin (this logic will depend on your authentication setup)
//     const checkAdminStatus = () => {
//       // Implement your logic to check if the user is an admin
//       // For example, you might check a user role from context or local storage
//       const userRole = localStorage.getItem('role'); // Example
      
//       setIsAdmin(userRole === 'admin');
//     };
    
//     checkAdminStatus();
//     fetchBookings();
//   }, []);
//   const handleCancelBooking = async (bookingId) => {
//     try {
//       const response = await publicApi.post('/cancel-booking', { bookingId });
//       if (response.status === 200) {
//         alert("Booking has been canceld successfully!");
//       } else {
//         toast.danger("Failed to canceld booking");
//       }
//     } catch (error) {
//       console.error("Error: ", error);
//       toast.danger("An error occurred while canceld booking");
//     }
//     navigate("/bookingData");
//   };
//   if (loading) {
//     return <div className="p-12 mt-20">Loading...</div>; // Replace with your Loader component if available
//   }

//   // if (!isAdmin && !isMerchant) {
//   //   return (
//   //     <div className="p-12 mt-20">
//   //       <div>You do not have permission to view this page.</div>

//   //     </div>
//   //   ); // Message for non-admin users

//   // }

//   return (
//     <div className="p-5 mt-12 text-white ">
//       <h1 className="text-2xl font-bold mb-4">Booking Data</h1>
//       <table className="min-w-full border-collapse border border-gray-200">
//         <thead>
//           <tr>
//             <th className="border border-gray-300 p-2">Venue</th>
//             <th className="border border-gray-300 p-2">User Email</th>
//             <th className="border border-gray-300 p-2">Location</th>
//             <th className="border border-gray-300 p-2">Booking ID</th>
//             <th className="border border-gray-300 p-2">Date</th>
//             <th className="border border-gray-300 p-2">Time</th>
//             <th className="border border-gray-300 p-2">Duration</th>
//             <th className="border border-gray-300 p-2">Price per hour</th>
//             <th className="border border-gray-300 p-2">Total Amount</th>
//             <th className="border border-gray-300 p-2">Cancel</th>

//           </tr>
//         </thead>
//         <tbody>
//           {bookings.map((booking) => (
//             <tr key={booking.bookingId}>
//               <td className="border border-gray-300 p-2">{booking.venue.name}</td>
//               <td className="border border-gray-300 p-2">{booking.user.email}</td>
//               <td className="border border-gray-300 p-2">{booking.venue.address}</td>
//               <td className="border border-gray-300 p-2">{booking.bookingId}</td>
//               <td className="border border-gray-300 p-2">{booking.bookingDate}</td>
//               <td className="border border-gray-300 p-2">{booking.start_time} - {booking.end_time}</td>
//               <td className="border border-gray-300 p-2">{booking.total_hours} hour</td>
//               <td className="border border-gray-300 p-2">{booking.venue.price}</td>
//               <td className="border border-gray-300 p-2">₹{booking.total_cost}</td>
//               <td className="border border-gray-300 p-2">
//                 {(<button
//                         type="submit"
//                         className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
//                       onClick={() => handleCancelBooking(booking.bookingId)}
//                       >
//                         Cancel
//                       </button>)
//               }</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//     </div>
//   );
// };

// export default Booking;

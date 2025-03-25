import React, { useEffect, useState } from "react";
import { publicApi } from "../utils/api"; // Import the API utility
import './Booking.css'; // Import the same CSS for consistent styling

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); // Assume a way to check if the user is admin
  const isMerchant = localStorage.getItem("role") === "merchant";


  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await publicApi.get('/users'); // Fetch user data
        
        if (response && response.data) {
          console.log(response.data);
          
          setUserDetails(response.data);
        } else {
          setUserDetails([]);
          console.error("Invalid response format:", response);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setUserDetails([]);
      } finally {
        setLoading(false);
      }
    };

    // Check if the user is an admin (this logic will depend on your authentication setup)
    const checkAdminStatus = () => {
      const userRole = localStorage.getItem('role'); // Example
      setIsAdmin(userRole === 'admin');
    };

    fetchUserDetails();
    checkAdminStatus();
  }, []);

  const handleMakeMerchant = async (email) => {
    try {
      const response = await publicApi.post('/make-merchant', { email });
      if (response.status === 200) {
        alert("User has been made a merchant successfully!");
      } else {
        alert("Failed to make user a merchant.");
      }
    } catch (error) {
      console.error("Error making user a merchant:", error);
      alert("An error occurred while making the user a merchant.");
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
      <h1 className="text-2xl font-bold mb-4">User Details</h1>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="hover:bg-gray-900" >
            <th className="px-3 md:px-5 py-3 md:py-4 text-left text-sm md:text-xl font-semibold cursor-pointer border-0">User ID</th>
            <th className="px-3 md:px-5 py-3 md:py-4 text-left text-sm md:text-xl font-semibold cursor-pointer border-0">Full Name</th>
            <th className="px-3 md:px-5 py-3 md:py-4 text-left text-sm md:text-xl font-semibold cursor-pointer border-0">Username</th>
            <th className="px-3 md:px-5 py-3 md:py-4 text-left text-sm md:text-xl font-semibold cursor-pointer border-0">Email</th>
            <th className="px-3 md:px-5 py-3 md:py-4 text-left text-sm md:text-xl font-semibold cursor-pointer border-0">State</th>
            <th className="px-3 md:px-5 py-3 md:py-4 text-left text-sm md:text-xl font-semibold cursor-pointer border-0">City</th>
            <th className="px-3 md:px-5 py-3 md:py-4 text-left text-sm md:text-xl font-semibold cursor-pointer border-0">Merchant</th>
          </tr>
        </thead>
        <tbody>
          {userDetails.map((user) => (
            <tr className="hover:bg-[#1b2741] transition-colors" key={user.userId}>
            <td className="px-3 md:px-5 py-3 md:py-4 text-xs md:text-base font-bold text-[#b1adad] border-0">{user.userId}</td>
            <td className="px-3 md:px-5 py-3 md:py-4 text-xs md:text-base font-bold text-[#b1adad] border-0">{user.fullName}</td>
            <td className="px-3 md:px-5 py-3 md:py-4 text-xs md:text-base font-bold text-[#b1adad] border-0">{user.userName}</td>
            <td className="px-3 md:px-5 py-3 md:py-4 text-xs md:text-base font-bold text-[#b1adad] border-0">{user.email}</td>
            <td className="px-3 md:px-5 py-3 md:py-4 text-xs md:text-base font-bold text-[#b1adad] border-0">{user.state}</td>
            <td className="px-3 md:px-5 py-3 md:py-4 text-xs md:text-base font-bold text-[#b1adad] border-0">{user.city}</td>
            <td className="px-3 md:px-5 py-3 md:py-4 text-xs md:text-base font-bold text-[#b1adad] border-0">
                {!user.merchant?(<button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                      onClick={() => handleMakeMerchant(user.email)}
                      >
                        Make Merchant
                      </button>):(<p>Merchant</p>)
              }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDetails;

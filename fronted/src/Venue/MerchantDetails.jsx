import React, { useEffect, useState } from "react";
import { publicApi } from "../utils/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Booking.css';

const MerchantDetails = () => {
  const [merchants, setMerchants] = useState([]);
  const [filteredMerchants, setFilteredMerchants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [stateFilter, setStateFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [uniqueStates, setUniqueStates] = useState([]);
  const [uniqueCities, setUniqueCities] = useState([]);

  useEffect(() => {
    const fetchMerchantDetails = async () => {
      try {
        setLoading(true);
        const response = await publicApi.get('/merchantdetails');

        if (response?.data) {
          setMerchants(response.data);
          setFilteredMerchants(response.data);

         // Extract unique states and cities
         const states = [...new Set(response.data.map(m => m.state).filter(Boolean))];
         const cities = [...new Set(response.data.map(m => m.city).filter(Boolean))];
          setUniqueStates(states);
          setUniqueCities(cities);
        }
      } catch (error) {
        console.error("Error fetching merchant details:", error);
        toast.error("Failed to load merchant data");
      } finally {
        setLoading(false);
      }
    };

    const checkAdminStatus = () => {
      const userRole = localStorage.getItem('role');
      setIsAdmin(userRole === 'admin');
    };

    fetchMerchantDetails();
    checkAdminStatus();
  }, []);

  useEffect(() => {
    let results = [...merchants];

    // Apply search filter
    if (searchTerm) {
      results = results.filter(merchant =>
        merchant.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        merchant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        merchant.userName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply state filter
    if (stateFilter !== "all") {
      results = results.filter(merchant => merchant.state === stateFilter);
    }

    // Apply city filter
    if (cityFilter !== "all") {
      results = results.filter(merchant => merchant.city === cityFilter);
    }

    setFilteredMerchants(results);
  }, [merchants, searchTerm, stateFilter, cityFilter]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    setFilteredMerchants(prev => [...prev].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    }));
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setStateFilter("all");
    setCityFilter("all");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6eb4ef]"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-[#1c2736] p-8 rounded-lg shadow-lg text-center border border-[#6eb5ef40]">
          <h2 className="text-2xl font-bold text-[#6eb4ef] mb-4">Access Denied</h2>
          <p className="text-gray-400">You don't have permission to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 mt-12 bg-[#0f172a] min-h-screen">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6 text-[#6eb4ef]">Merchant Management Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#1c2736] p-6 rounded-lg shadow-lg border-l-4 border-[#6eb4ef] hover:scale-[1.02] transition-transform">
          <h3 className="text-gray-400 text-sm font-medium">Total Merchants</h3>
          <p className="text-3xl font-bold text-white">{merchants.length}</p>
        </div>
        <div className="bg-[#1c2736] p-6 rounded-lg shadow-lg border-l-4 border-green-500 hover:scale-[1.02] transition-transform">
          <h3 className="text-gray-400 text-sm font-medium">States</h3>
          <p className="text-3xl font-bold text-white">{uniqueStates.length}</p>
        </div>
        <div className="bg-[#1c2736] p-6 rounded-lg shadow-lg border-l-4 border-yellow-500 hover:scale-[1.02] transition-transform">
          <h3 className="text-gray-400 text-sm font-medium">Cities</h3>
          <p className="text-3xl font-bold text-white">{uniqueCities.length}</p>
        </div>
        <div className="bg-[#1c2736] p-6 rounded-lg shadow-lg border-l-4 border-purple-500 hover:scale-[1.02] transition-transform">
          <h3 className="text-gray-400 text-sm font-medium">New This Month</h3>
          <p className="text-3xl font-bold text-white">
            {merchants.filter(m => {
              const joinDate = new Date(m.createdAt);
              const monthAgo = new Date();
              monthAgo.setMonth(monthAgo.getMonth() - 1);
              return joinDate > monthAgo;
            }).length}
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-[#1c2736] rounded-lg shadow-lg p-6 mb-8 border border-[#6eb5ef40]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">Search Merchants</label>
            <input
              type="text"
              placeholder="Search by name, email or username..."
              className="w-full px-4 py-2 rounded-md bg-[#2a3a4d] text-gray-300 border border-[#6eb5ef40] focus:outline-none focus:ring-2 focus:ring-[#6eb4ef]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">Filter by State</label>
            <select
              className="w-full px-4 py-2 rounded-md bg-[#2a3a4d] text-gray-300 border border-[#6eb5ef40] focus:outline-none focus:ring-2 focus:ring-[#6eb4ef]"
              value={stateFilter}
              onChange={(e) => {
                setStateFilter(e.target.value);
                setCityFilter("all"); // Reset city filter when state changes
              }}
            >
              <option value="all">All States</option>
              {uniqueStates.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">Filter by City</label>
            <select
              className="w-full px-4 py-2 rounded-md bg-[#2a3a4d] text-gray-300 border border-[#6eb5ef40] focus:outline-none focus:ring-2 focus:ring-[#6eb4ef]"
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              disabled={stateFilter !== "all"}
            >
              <option value="all">All Cities</option>
              {uniqueCities
                .filter(city => stateFilter === "all" || merchants.some(m => m.state === stateFilter && m.city === city))
                .map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={resetFilters}
              className="w-full bg-[#6eb4ef] text-white py-2 rounded-md hover:bg-[#5a9bd5] transition"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Merchants Table */}
      <div className="bg-[#1c2736] rounded-lg shadow-lg overflow-hidden border border-[#6eb5ef40]">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-[#2a3a4d]">
              <tr>
                <th
                  className="px-6 py-4 text-left text-sm font-medium text-[#6eb4ef] uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('userId')}
                >
                  User ID {sortConfig.key === 'userId' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  className="px-6 py-4 text-left text-sm font-medium text-[#6eb4ef] uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('fullName')}
                >
                  Name {sortConfig.key === 'fullName' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  className="px-6 py-4 text-left text-sm font-medium text-[#6eb4ef] uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('email')}
                >
                  Email {sortConfig.key === 'email' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  className="px-6 py-4 text-left text-sm font-medium text-[#6eb4ef] uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('state')}
                >
                  State {sortConfig.key === 'state' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  className="px-6 py-4 text-left text-sm font-medium text-[#6eb4ef] uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('city')}
                >
                  City {sortConfig.key === 'city' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  className="px-6 py-4 text-left text-sm font-medium text-[#6eb4ef] uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('createdAt')}
                >
                  Joined {sortConfig.key === 'createdAt' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a3a4d]">
              {filteredMerchants.length > 0 ? (
                filteredMerchants.map((merchant) => (
                  <tr key={merchant.userId} className="hover:bg-[#2a3a4d] transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {merchant.userId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-300">{merchant.fullName}</div>
                      <div className="text-xs text-gray-500">{merchant.userName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {merchant.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {merchant.state}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {merchant.city}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {formatDate(merchant.createdAt)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-400">
                    No merchants found matching your criteria
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
          <h3 className="text-lg font-semibold text-[#6eb4ef] mb-4">State Distribution</h3>
          <div className="space-y-3">
            {uniqueStates.slice(0, 5).map(state => {
              const count = merchants.filter(m => m.state === state).length;
              const percentage = (count / merchants.length) * 100;

              return (
                <div key={state} className="mb-2">
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>{state}</span>
                    <span>{count} ({percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="w-full bg-[#2a3a4d] rounded-full h-2">
                    <div
                      className="bg-[#6eb4ef] h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-[#1c2736] p-6 rounded-lg shadow-lg border border-[#6eb5ef40]">
          <h3 className="text-lg font-semibold text-[#6eb4ef] mb-4">City Distribution</h3>
          <div className="space-y-3">
            {uniqueCities.slice(0, 5).map(city => {
              const count = merchants.filter(m => m.city === city).length;
              const percentage = (count / merchants.length) * 100;

              return (
                <div key={city} className="mb-2">
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>{city}</span>
                    <span>{count} ({percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="w-full bg-[#2a3a4d] rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantDetails;


// import React, { useEffect, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
//  import { publicApi } from "../utils/api"; // Import the API utility
//  import './Booking.css'; // Import the same CSS for consistent styling
 
//  const MerchantDetails = () => {
//    const [userDetails, setUserDetails] = useState([]);
//    const [loading, setLoading] = useState(true);
//    const [isAdmin, setIsAdmin] = useState(false); // Assume a way to check if the user is admin
 
//    useEffect(() => {
//      const fetchUserDetails = async () => {
//        try {
//          const response = await publicApi.get('/merchantdetails'); // Fetch user data
         
//          if (response && response.data) {
//            setUserDetails(response.data);
//          } else {
//            setUserDetails([]);
//            console.error("Invalid response format:", response);
//          }
//        } catch (error) {
//          console.error("Error fetching user details:", error);
//          setUserDetails([]);
//        } finally {
//          setLoading(false);
//        }
//      };
 
//      // Check if the user is an admin (this logic will depend on your authentication setup)
//      const checkAdminStatus = () => {
//        const userRole = localStorage.getItem('role'); // Example
//        setIsAdmin(userRole === 'admin');
//      };
 
//      fetchUserDetails();
//      checkAdminStatus();
//    }, []);
 
//    if (loading) {
//      return <div className="p-12 mt-20">Loading...</div>; // Replace with your Loader component if available
 
 
//    }
 
//    if (!isAdmin) {
//      return (
//        <div className="p-12 mt-20">
//          <div>You do not have permission to view this page.</div>
 
//        </div>
//      ); // Message for non-admin users
 
//    }
 
 
//    return (
//      <div className="py-3 px-5 ">
//        <h1 className="my-5 mx-14 font-my text-[#bfbfbf] font-bold text-3xl">Merchant Details</h1>
//        <table className="w-full border-collapse border-0 min-w-max mb-10">
//        <thead className="bg-[#121c27b7] text-[#cccccc]" >
//           <tr className="hover:bg-gray-900" >
//              <th className="px-3 md:px-5 py-3 md:py-4 text-left text-sm md:text-xl font-semibold cursor-pointer border-0">User ID</th>
//              <th className="px-3 md:px-5 py-3 md:py-4 text-left text-sm md:text-xl font-semibold cursor-pointer border-0">Full Name</th>
//              <th className="px-3 md:px-5 py-3 md:py-4 text-left text-sm md:text-xl font-semibold cursor-pointer border-0">Username</th>
//              <th className="px-3 md:px-5 py-3 md:py-4 text-left text-sm md:text-xl font-semibold cursor-pointer border-0">Email</th>
//              <th className="px-3 md:px-5 py-3 md:py-4 text-left text-sm md:text-xl font-semibold cursor-pointer border-0">State</th>
//              <th className="px-3 md:px-5 py-3 md:py-4 text-left text-sm md:text-xl font-semibold cursor-pointer border-0">City</th>
//              <th className="px-3 md:px-5 py-3 md:py-4 text-left text-sm md:text-xl font-semibold cursor-pointer border-0">Created At</th>
//            </tr>
//          </thead>
//          <tbody className="bg-[#15222e]" >
//            {userDetails.map((user) => (
//              <tr className="hover:bg-[#1b2741] transition-colors" key={user.userId}>
//                <td className="px-3 md:px-5 py-3 md:py-4 text-xs md:text-base font-bold text-[#b1adad] border-0">{user.userId}</td>
//                <td className="px-3 md:px-5 py-3 md:py-4 text-xs md:text-base font-bold text-[#b1adad] border-0">{user.fullName}</td>
//                <td className="px-3 md:px-5 py-3 md:py-4 text-xs md:text-base font-bold text-[#b1adad] border-0">{user.userName}</td>
//                <td className="px-3 md:px-5 py-3 md:py-4 text-xs md:text-base font-bold text-[#b1adad] border-0">{user.email}</td>
//                <td className="px-3 md:px-5 py-3 md:py-4 text-xs md:text-base font-bold text-[#b1adad] border-0">{user.state}</td>
//                <td className="px-3 md:px-5 py-3 md:py-4 text-xs md:text-base font-bold text-[#b1adad] border-0">{user.city}</td>
//                <td className="px-3 md:px-5 py-3 md:py-4 text-xs md:text-base font-bold text-[#b1adad] border-0">{user.createdAt}</td>
//              </tr>
//            ))}
//          </tbody>
//        </table>
//      </div>
//    );
//  };
 
//  export default MerchantDetails;


// import React, { useEffect, useState } from "react";
// import { publicApi } from "../utils/api"; // Import the API utility
// import './Booking.css'; // Import the same CSS for consistent styling

// const MerchantDetails = () => {
//   const [userDetails, setUserDetails] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isAdmin, setIsAdmin] = useState(false); // Assume a way to check if the user is admin

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const response = await publicApi.get('/merchantdetails'); // Fetch user data
        
//         if (response && response.data) {
//           setUserDetails(response.data);
//         } else {
//           setUserDetails([]);
//           console.error("Invalid response format:", response);
//         }
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//         setUserDetails([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     // Check if the user is an admin (this logic will depend on your authentication setup)
//     const checkAdminStatus = () => {
//       const userRole = localStorage.getItem('role'); // Example
//       setIsAdmin(userRole === 'admin');
//     };

//     fetchUserDetails();
//     checkAdminStatus();
//   }, []);

//   if (loading) {
//     return <div className="p-12 mt-20">Loading...</div>; // Replace with your Loader component if available


//   }

//   if (!isAdmin) {
//     return (
//       <div className="p-12 mt-20">
//         <div>You do not have permission to view this page.</div>

//       </div>
//     ); // Message for non-admin users

//   }


//   return (
//     <div className="p-5 mt-12">
//       <h1 className="text-2xl font-bold mb-4">Merchant Details</h1>
//       <table className="min-w-full border-collapse border border-gray-200">
//         <thead>
//           <tr>
//             <th className="border border-gray-300 p-2">User ID</th>
//             <th className="border border-gray-300 p-2">Full Name</th>
//             <th className="border border-gray-300 p-2">Username</th>
//             <th className="border border-gray-300 p-2">Email</th>
//             <th className="border border-gray-300 p-2">State</th>
//             <th className="border border-gray-300 p-2">City</th>
//             <th className="border border-gray-300 p-2">Created At</th>
//           </tr>
//         </thead>
//         <tbody>
//           {userDetails.map((user) => (
//             <tr key={user.userId}>
//               <td className="border border-gray-300 p-2">{user.userId}</td>
//               <td className="border border-gray-300 p-2">{user.fullName}</td>
//               <td className="border border-gray-300 p-2">{user.userName}</td>
//               <td className="border border-gray-300 p-2">{user.email}</td>
//               <td className="border border-gray-300 p-2">{user.state}</td>
//               <td className="border border-gray-300 p-2">{user.city}</td>
//               <td className="border border-gray-300 p-2">{user.createdAt}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default MerchantDetails;

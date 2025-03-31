import React, { useEffect, useState } from "react";
import { publicApi } from "../utils/api";
import './Booking.css';

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("all");
  const [stats, setStats] = useState({
    totalUsers: 0,
    merchants: 0,
    regularUsers: 0,
    states: [],
    cities: []
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await publicApi.get('/users');

        if (response && response.data) {
          setUserDetails(response.data);
          calculateStats(response.data);
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

    const checkAdminStatus = () => {
      const userRole = localStorage.getItem('role');
      setIsAdmin(userRole === 'admin');
    };

    fetchUserDetails();
    checkAdminStatus();
  }, []);

  const calculateStats = (users) => {
    const merchantCount = users.filter(user => user.merchant).length;
    const stateList = [...new Set(users.map(user => user.state))];
    const cityList = [...new Set(users.map(user => user.city))];

    setStats({
      totalUsers: users.length,
      merchants: merchantCount,
      regularUsers: users.length - merchantCount,
      states: stateList,
      cities: cityList
    });
  };

  const handleMakeMerchant = async (email) => {
    try {
      const response = await publicApi.post('/make-merchant', { email });
      if (response.status === 200) {
        // Update local state instead of refetching
        setUserDetails(prevUsers =>
          prevUsers.map(user =>
            user.email === email ? {...user, merchant: true} : user
          )
        );
        calculateStats(userDetails.map(user =>
          user.email === email ? {...user, merchant: true} : user
        ));
        alert("User has been made a merchant successfully!");
      } else {
        alert("Failed to make user a merchant.");
      }
    } catch (error) {
      console.error("Error making user a merchant:", error);
      alert("An error occurred while making the user a merchant.");
    }
  };

  const filteredUsers = userDetails.filter(user => {
    // Search filter
    const matchesSearch =
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userName.toLowerCase().includes(searchTerm.toLowerCase());

    // Role filter
    const matchesRole =
      filterOption === "all" ||
      (filterOption === "merchant" && user.merchant) ||
      (filterOption === "regular" && !user.merchant);

    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-[#1c2736] p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Access Denied</h2>
          <p className="text-gray-300">You do not have permission to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 mt-12">
      <h1 className="text-3xl font-bold mb-6 text-[#6eb4ef]">User Management Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#1c2736] p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
          <h3 className="text-gray-400 text-sm font-medium">Total Users</h3>
          <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
        </div>
        <div className="bg-[#1c2736] p-6 rounded-lg shadow-lg border-l-4 border-green-500">
          <h3 className="text-gray-400 text-sm font-medium">Merchants</h3>
          <p className="text-3xl font-bold text-white">{stats.merchants}</p>
        </div>
        <div className="bg-[#1c2736] p-6 rounded-lg shadow-lg border-l-4 border-yellow-500">
          <h3 className="text-gray-400 text-sm font-medium">Regular Users</h3>
          <p className="text-3xl font-bold text-white">{stats.regularUsers}</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-[#1c2736] rounded-lg shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">Search Users</label>
            <input
              type="text"
              placeholder="Search by name, email or username"
              className="w-full px-4 py-2 rounded-md bg-[#2a3a4d] text-gray-300 border border-[#6eb5ef40] focus:outline-none focus:ring-2 focus:ring-[#6eb4ef]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">Filter by Role</label>
            <select
              className="w-full px-4 py-2 rounded-md bg-[#2a3a4d] text-gray-300 border border-[#6eb5ef40] focus:outline-none focus:ring-2 focus:ring-[#6eb4ef]"
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
            >
              <option value="all">All Users</option>
              <option value="merchant">Merchants Only</option>
              <option value="regular">Regular Users Only</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">Quick Actions</label>
            <button
              className="w-full bg-[#6eb4ef] text-white py-2 rounded-md hover:bg-[#5a9bd5] transition"
              onClick={() => window.print()}
            >
              Export to PDF
            </button>
          </div>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-[#1c2736] rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-[#2a3a4d]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User ID</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Full Name</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Username</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a3a4d]">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.userId} className="hover:bg-[#2a3a4d] transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.userId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.fullName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.userName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {user.city}, {user.state}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.merchant ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.merchant ? 'Merchant' : 'Regular User'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {!user.merchant && (
                        <button
                          onClick={() => handleMakeMerchant(user.email)}
                          className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-xs"
                        >
                          Make Merchant
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-400">
                    No users found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Dashboard Elements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="bg-[#1c2736] p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-300 mb-4">Users by State</h3>
          <div className="space-y-2">
            {stats.states.map(state => (
              <div key={state} className="flex items-center">
                <div className="w-1/4 text-sm text-gray-400">{state}</div>
                <div className="w-3/4">
                  <div className="bg-[#2a3a4d] rounded-full h-2.5">
                    <div
                      className="bg-[#6eb4ef] h-2.5 rounded-full"
                      style={{
                        width: `${(userDetails.filter(u => u.state === state).length / userDetails.length) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>
                <div className="w-1/6 text-right text-sm text-gray-400">
                  {userDetails.filter(u => u.state === state).length}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#1c2736] p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-300 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {userDetails.slice(0, 5).map(user => (
              <div key={user.userId} className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#6eb4ef] flex items-center justify-center text-white font-bold">
                  {user.fullName.charAt(0)}
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-300">{user.fullName}</p>
                  <p className="text-xs text-gray-500">{user.merchant ? 'Merchant account' : 'Regular user'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;












// import React, { useEffect, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import { publicApi } from "../utils/api"; // Import the API utility
// import './Booking.css'; // Import the same CSS for consistent styling

// const UserDetails = () => {
//   const [userDetails, setUserDetails] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isAdmin, setIsAdmin] = useState(false); // Assume a way to check if the user is admin
//   const isMerchant = localStorage.getItem("role") === "merchant";


//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const response = await publicApi.get('/users'); // Fetch user data
        
//         if (response && response.data) {
//           console.log(response.data);
          
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

//   const handleMakeMerchant = async (email) => {
//     try {
//       const response = await publicApi.post('/make-merchant', { email });
//       if (response.status === 200) {
//         toast.success("User has been made a merchant successfully!");
//       } else {
//         toast.danger("Failed to make user a merchant.");
//       }
//     } catch (error) {
//       console.error("Error making user a merchant:", error);
//       toast.danger("An error occurred while making the user a merchant.");
//     }
//   };

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
//     <div className="p-5 mt-12 text-white">
//       <h1 className="text-2xl font-bold mb-4">User Details</h1>
//       <table className="min-w-full border-collapse border border-gray-200">
//         <thead>
//           <tr className="hover:bg-gray-900" >
//             <th className="px-3 md:px-5 py-3 md:py-4 text-left text-sm md:text-xl font-semibold cursor-pointer border-0">User ID</th>
//             <th className="px-3 md:px-5 py-3 md:py-4 text-left text-sm md:text-xl font-semibold cursor-pointer border-0">Full Name</th>
//             <th className="px-3 md:px-5 py-3 md:py-4 text-left text-sm md:text-xl font-semibold cursor-pointer border-0">Username</th>
//             <th className="px-3 md:px-5 py-3 md:py-4 text-left text-sm md:text-xl font-semibold cursor-pointer border-0">Email</th>
//             <th className="px-3 md:px-5 py-3 md:py-4 text-left text-sm md:text-xl font-semibold cursor-pointer border-0">State</th>
//             <th className="px-3 md:px-5 py-3 md:py-4 text-left text-sm md:text-xl font-semibold cursor-pointer border-0">City</th>
//             <th className="px-3 md:px-5 py-3 md:py-4 text-left text-sm md:text-xl font-semibold cursor-pointer border-0">Merchant</th>
//           </tr>
//         </thead>
//         <tbody>
//           {userDetails.map((user) => (
//             <tr className="hover:bg-[#1b2741] transition-colors" key={user.userId}>
//             <td className="px-3 md:px-5 py-3 md:py-4 text-xs md:text-base font-bold text-[#b1adad] border-0">{user.userId}</td>
//             <td className="px-3 md:px-5 py-3 md:py-4 text-xs md:text-base font-bold text-[#b1adad] border-0">{user.fullName}</td>
//             <td className="px-3 md:px-5 py-3 md:py-4 text-xs md:text-base font-bold text-[#b1adad] border-0">{user.userName}</td>
//             <td className="px-3 md:px-5 py-3 md:py-4 text-xs md:text-base font-bold text-[#b1adad] border-0">{user.email}</td>
//             <td className="px-3 md:px-5 py-3 md:py-4 text-xs md:text-base font-bold text-[#b1adad] border-0">{user.state}</td>
//             <td className="px-3 md:px-5 py-3 md:py-4 text-xs md:text-base font-bold text-[#b1adad] border-0">{user.city}</td>
//             <td className="px-3 md:px-5 py-3 md:py-4 text-xs md:text-base font-bold text-[#b1adad] border-0">
//                 {!user.merchant?(<button
//                         type="submit"
//                         className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
//                       onClick={() => handleMakeMerchant(user.email)}
//                       >
//                         Make Merchant
//                       </button>):(<p>Merchant</p>)
//               }</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserDetails;

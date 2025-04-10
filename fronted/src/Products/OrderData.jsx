// import React, { useEffect, useState, useMemo } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import { publicApi } from "../utils/api";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   FiPackage,
//   FiTruck,
//   FiCheckCircle,
//   FiClock,
//   FiSearch,
//   FiFilter,
//   FiDownload,
//   FiUser,
//   FiMail,
//   FiHome,
//   FiCreditCard,
//   FiPhone,
//   FiDollarSign,
//   FiCalendar
// } from "react-icons/fi";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const OrderData = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [dateRange, setDateRange] = useState([null, null]);
//   const [startDate, endDate] = dateRange;
//   const userRole = localStorage.getItem("role");
//   const isAdmin = userRole === "admin";
//   const isMerchant = userRole === "merchant";

//   // Status options for filtering
//   const statusOptions = [
//     { value: "all", label: "All Statuses", icon: <FiFilter /> },
//     { value: "UNSHIPPED", label: "Unshipped", icon: <FiClock /> },
//     { value: "SHIPPED", label: "Shipped", icon: <FiTruck /> },
//     { value: "DELIVERED", label: "Delivered", icon: <FiCheckCircle /> },
//   ];

//   // Fetch orders data
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         setLoading(true);
//         const response = await publicApi.get('/order-data');

//         if (response?.data) {
//           setOrders(response.data);
//         } else {
//           setError("Invalid data format received");
//           setOrders([]);
//         }
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//         setError("Failed to load orders. Please try again.");
//         setOrders([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   // Filter and sort orders
//   const filteredOrders = useMemo(() => {
//     let result = [...orders];

//     // Apply search filter
//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       result = result.filter(order =>
//         order.orderId.toLowerCase().includes(term) ||
//         order.fullName.toLowerCase().includes(term) ||
//         order.email.toLowerCase().includes(term) ||
//         order.orderItems.some(item =>
//           item.title.toLowerCase().includes(term) ||
//           item.description.toLowerCase().includes(term)
//         )
//       );
//     }

//     // Apply status filter
//     if (statusFilter !== "all") {
//       result = result.filter(order => order.status === statusFilter);
//     }

//     // Apply date range filter
//     if (startDate && endDate) {
//       result = result.filter(order => {
//         const orderDate = new Date(order.createdAt || order.orderDate);
//         return orderDate >= startDate && orderDate <= endDate;
//       });
//     }

//     // Sort by most recent first
//     return result.sort((a, b) => {
//       const dateA = new Date(a.createdAt || a.orderDate);
//       const dateB = new Date(b.createdAt || b.orderDate);
//       return dateB - dateA;
//     });
//   }, [orders, searchTerm, statusFilter, startDate, endDate]);

//   // Update order status
//   const updateOrderStatus = async (orderId, newStatus) => {
//     try {
//       const endpoint =
//         newStatus === "SHIPPED" ? '/shipped-order' :
//         newStatus === "DELIVERED" ? '/delivered-order' : null;

//       if (!endpoint) return;

//       const response = await publicApi.post(endpoint, { orderId:orderId });

//       if (response.status === 200) {
//         setOrders(prev => prev.map(order =>
//           order.orderId === orderId ? { ...order, status: newStatus } : order
//         ));
//         toast.success(`Order marked as ${newStatus.toLowerCase()}`);
//       } else {
//         toast.error("Failed to update order status");
//       }
//     } catch (error) {
//       console.error("Error updating order status:", error);
//       toast.error("An error occurred while updating order status");
//     }
//   };

//   // Export orders to CSV
//   const exportToCSV = () => {
//     const headers = [
//       "Order ID", "Customer Name", "Email", "Phone",
//       "Address", "Status", "Total Amount", "Date", "Items Count"
//     ].join(",");

//     const rows = filteredOrders.map(order => {
//       const itemsCount = order.orderItems.reduce((sum, item) => sum + item.quantity, 0);
//       return [
//         order.orderId,
//         `"${order.fullName}"`,
//         order.email,
//         order.phone,
//         `"${order.address}"`,
//         order.status,
//         order.totalAmount,
//         new Date(order.createdAt || order.orderDate).toLocaleDateString(),
//         itemsCount
//       ].join(",");
//     }).join("\n");

//     const csvContent = `${headers}\n${rows}`;
//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.setAttribute("download", `orders_${new Date().toISOString().slice(0,10)}.csv`);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   // Render status badge
//   const renderStatusBadge = (status) => {
//     const statusConfig = {
//       UNSHIPPED: {
//         color: "bg-yellow-500",
//         icon: <FiClock className="mr-1" />,
//         text: "Unshipped"
//       },
//       SHIPPED: {
//         color: "bg-blue-500",
//         icon: <FiTruck className="mr-1" />,
//         text: "Shipped"
//       },
//       DELIVERED: {
//         color: "bg-green-500",
//         icon: <FiCheckCircle className="mr-1" />,
//         text: "Delivered"
//       },
//     };

//     const config = statusConfig[status] || { color: "bg-gray-500", icon: null, text: status };

//     return (
//       <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color} text-white`}>
//         {config.icon}
//         {config.text}
//       </span>
//     );
//   };

//   // Render loading state
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   // Render error state
//   if (error) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen p-4">
//         <div className="bg-white rounded-lg shadow-md p-6 max-w-md text-center">
//           <h2 className="text-xl font-bold text-red-500 mb-2">Error Loading Orders</h2>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="text-black p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//           <div>
//             <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
//               <FiPackage className="mr-2" /> Order Management
//             </h1>
//             <p className="text-gray-600">
//               {filteredOrders.length} {filteredOrders.length === 1 ? "order" : "orders"} found
//             </p>
//           </div>

//           {(isAdmin || isMerchant) && (
//             <div className="flex flex-wrap gap-2">
//               <button
//                 onClick={exportToCSV}
//                 className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
//               >
//                 <FiDownload className="mr-2" /> Export CSV
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Filters Section */}
//         <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {/* Search Input */}
//             {/* <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FiSearch className="text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search orders..."
//                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div> */}

//             {/* Status Filter */}
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FiFilter className="text-gray-400" />
//               </div>
//               <select
//                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//               >
//                 {statusOptions.map(option => (
//                   <option key={option.value} value={option.value}>
//                     {option.label}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Date Range Picker */}
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FiCalendar className="text-gray-400" />
//               </div>
//               <DatePicker
//                 selectsRange={true}
//                 startDate={startDate}
//                 endDate={endDate}
//                 onChange={(update) => setDateRange(update)}
//                 placeholderText="Filter by date range"
//                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 isClearable={true}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Orders Grid */}
//         {filteredOrders.length === 0 ? (
//           <div className="bg-white rounded-lg shadow-sm p-8 text-center">
//             <FiPackage className="mx-auto text-4xl text-gray-400 mb-4" />
//             <h2 className="text-xl font-semibold text-gray-700 mb-2">No Orders Found</h2>
//             <p className="text-gray-500">Try adjusting your search or filter criteria</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 gap-6">
//             {filteredOrders.map((order) => (
//               <div key={order.orderId} className="bg-white rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md">
//                 {/* Order Header */}
//                 <div className="bg-gray-50 px-4 py-3 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
//                   <div className="flex items-center gap-3">
//                     <div className="bg-blue-100 p-2 rounded-lg">
//                       <FiPackage className="text-blue-600" />
//                     </div>
//                     <div>
//                       <h2 className="font-bold text-gray-800">Order #{order.orderId}</h2>
//                       <p className="text-xs text-gray-500">
//                         {new Date(order.createdAt || order.orderDate).toLocaleString()}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <div className="text-right">
//                       <p className="text-sm text-gray-500">Total</p>
//                       <p className="font-bold text-gray-800">₹{order.totalAmount}</p>
//                     </div>
//                     {renderStatusBadge(order.status)}
//                   </div>
//                 </div>

//                 {/* Order Details */}
//                 <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
//                   {/* Customer Info */}
//                   <div className="space-y-3">
//                     <h3 className="font-semibold text-gray-700 flex items-center gap-2">
//                       <FiUser /> Customer Details
//                     </h3>
//                     <div className="space-y-1 pl-6">
//                       <p className="flex items-center gap-2">
//                         <FiMail className="text-gray-400" />
//                         <span>{order.email}</span>
//                       </p>
//                       <p className="flex items-center gap-2">
//                         <FiPhone className="text-gray-400" />
//                         <span>{order.phone}</span>
//                       </p>
//                       <p className="flex items-center gap-2">
//                         <FiHome className="text-gray-400" />
//                         <span className="line-clamp-1">{order.address}</span>
//                       </p>
//                       <p className="flex items-center gap-2">
//                         <FiCreditCard className="text-gray-400" />
//                         <span>{order.paymentMethod}</span>
//                       </p>
//                     </div>
//                   </div>

//                   {/* Order Items */}
//                   <div className="lg:col-span-2">
//                     <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                       <FiPackage /> Order Items ({order.orderItems.length})
//                     </h3>
//                     <div className="space-y-3">
//                       {order.orderItems.map((item) => (
//                         <div key={item.id} className="flex gap-4 border-b pb-3 last:border-0">
//                           <div className="flex-shrink-0">
//                             <img
//                               src={item.imgSrc || "/placeholder-product.jpg"}
//                               alt={item.title}
//                               className="w-16 h-16 object-cover rounded-lg border"
//                               onError={(e) => {
//                                 e.target.src = "/placeholder-product.jpg";
//                               }}
//                             />
//                           </div>
//                           <div className="flex-1">
//                             <h4 className="font-medium text-gray-800">{item.title}</h4>
//                             <p className="text-sm text-gray-600 line-clamp-1">{item.description}</p>
//                             <div className="flex justify-between items-center mt-2">
//                               <span className="text-sm text-gray-700">
//                                 ₹{item.price} × {item.quantity}
//                               </span>
//                               <span className="font-medium text-gray-800">
//                               ₹{item.price * item.quantity}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Order Actions */}
//                 {(isAdmin || isMerchant) && (
//                   <div className="bg-gray-50 px-4 py-3 border-t flex justify-end gap-3">
//                     {order.status === "UNSHIPPED" && (
//                       <button
//                         onClick={() => updateOrderStatus(order.orderId, "SHIPPED")}
//                         className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//                       >
//                         <FiTruck className="mr-2" /> Mark as Shipped
//                       </button>
//                     )}
//                     {order.status === "SHIPPED" && (
//                       <button
//                         onClick={() => updateOrderStatus(order.orderId, "DELIVERED")}
//                         className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
//                       >
//                         <FiCheckCircle className="mr-2" /> Mark as Delivered
//                       </button>
//                     )}
//                     {order.status === "DELIVERED" && (
//                       <span className="flex items-center px-4 py-2 text-green-600">
//                         <FiCheckCircle className="mr-2" /> Order Completed
//                       </span>
//                     )}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <ToastContainer
//         position="bottom-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//     </div>
//   );
// };

// export default OrderData;







import React, { useEffect, useState, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import { publicApi } from "../utils/api";
import "react-toastify/dist/ReactToastify.css";
import {
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiClock,
  FiSearch,
  FiFilter,
  FiDownload,
  FiUser,
  FiMail,
  FiHome,
  FiCreditCard,
  FiPhone,
  FiDollarSign,
  FiCalendar
} from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const OrderData = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const userRole = localStorage.getItem("role");
  const isAdmin = userRole === "admin";
  const isMerchant = userRole === "merchant";

  // Status options for filtering
  const statusOptions = [
    { value: "all", label: "All Statuses", icon: <FiFilter /> },
    { value: "UNSHIPPED", label: "Unshipped", icon: <FiClock /> },
    { value: "SHIPPED", label: "Shipped", icon: <FiTruck /> },
    { value: "DELIVERED", label: "Delivered", icon: <FiCheckCircle /> },
  ];

  // Fetch orders data
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await publicApi.get('/order-data');

        if (response?.data) {
          setOrders(response.data);
        } else {
          setError("Invalid data format received");
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to load orders. Please try again.");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter and sort orders
  const filteredOrders = useMemo(() => {
    let result = [...orders];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(order =>
        order.orderId.toLowerCase().includes(term) ||
        order.fullName.toLowerCase().includes(term) ||
        order.email.toLowerCase().includes(term) ||
        order.orderItems.some(item =>
          item.title.toLowerCase().includes(term) ||
          item.description.toLowerCase().includes(term)
        )
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(order => order.status === statusFilter);
    }

    // Apply date range filter
    if (startDate && endDate) {
      result = result.filter(order => {
        const orderDate = new Date(order.createdAt || order.orderDate);
        return orderDate >= startDate && orderDate <= endDate;
      });
    }

    // Sort by most recent first
    return result.sort((a, b) => {
      const dateA = new Date(a.createdAt || a.orderDate);
      const dateB = new Date(b.createdAt || b.orderDate);
      return dateB - dateA;
    });
  }, [orders, searchTerm, statusFilter, startDate, endDate]);

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const endpoint =
        newStatus === "SHIPPED" ? '/shipped-order' :
        newStatus === "DELIVERED" ? '/delivered-order' : null;

      if (!endpoint) return;

      const response = await publicApi.post(endpoint, { orderId:orderId });

      if (response.status === 200) {
        setOrders(prev => prev.map(order =>
          order.orderId === orderId ? { ...order, status: newStatus } : order
        ));
        toast.success(`Order marked as ${newStatus.toLowerCase()}`);
      } else {
        toast.error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("An error occurred while updating order status");
    }
  };

  // Export orders to CSV
  const exportToCSV = () => {
    const headers = [
      "Order ID", "Customer Name", "Email", "Phone",
      "Address", "Status", "Total Amount", "Date", "Items Count"
    ].join(",");

    const rows = filteredOrders.map(order => {
      const itemsCount = order.orderItems.reduce((sum, item) => sum + item.quantity, 0);
      return [
        order.orderId,
        `"${order.fullName}"`,
        order.email,
        order.phone,
        `"${order.address}"`,
        order.status,
        order.totalAmount,
        new Date(order.createdAt || order.orderDate).toLocaleDateString(),
        itemsCount
      ].join(",");
    }).join("\n");

    const csvContent = `${headers}\n${rows}`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `orders_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Render status badge
  const renderStatusBadge = (status) => {
    const statusConfig = {
      UNSHIPPED: {
        color: "bg-yellow-500",
        icon: <FiClock className="mr-1" />,
        text: "Unshipped"
      },
      SHIPPED: {
        color: "bg-blue-500",
        icon: <FiTruck className="mr-1" />,
        text: "Shipped"
      },
      DELIVERED: {
        color: "bg-green-500",
        icon: <FiCheckCircle className="mr-1" />,
        text: "Delivered"
      },
    };

    const config = statusConfig[status] || { color: "bg-gray-500", icon: null, text: status };

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color} text-white`}>
        {config.icon}
        {config.text}
      </span>
    );
  };

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-[#0c131a] rounded-lg shadow-md p-6 max-w-md text-center">
          <h2 className="text-xl font-bold text-red-500 mb-2">Error Loading Orders</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-gray-300 p-4 md:p-6 lg:p-8 bg-[#0c131a] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-400 flex items-center">
              <FiPackage className="mr-2" /> Order Management
            </h1>
            <p className="text-gray-400">
              {filteredOrders.length} {filteredOrders.length === 1 ? "order" : "orders"} found
            </p>
          </div>

          {(isAdmin || isMerchant) && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={exportToCSV}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                <FiDownload className="mr-2" /> Export CSV
              </button>
            </div>
          )}
        </div>

        {/* Filters Section */}
        <div className="bg-[#1e293b] text-gray-300 rounded-lg shadow-sm p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            {/* <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search orders..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div> */}

            {/* Status Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiFilter className="text-gray-300" />
              </div>
              <select
                className="block bg-[#1e293b] w-full pl-10 pr-3 py-2 border-[1px] border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range Picker */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiCalendar className="text-gray-300" />
              </div>
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => setDateRange(update)}
                placeholderText="Filter by date range"
                className="block bg-[#1e293b] w-full pl-10 pr-3 py-2 border-[1px] border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                isClearable={true}
              />
            </div>
          </div>
        </div>

        {/* Orders Grid */}
        {filteredOrders.length === 0 ? (
          <div className="bg-[#1e293b] rounded-lg shadow-sm p-8 text-center">
            <FiPackage className="mx-auto text-4xl text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold text-gray-500 mb-2">No Orders Found</h2>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 text-gray-300 gap-6">
            {filteredOrders.map((order) => (
              <div key={order.orderId} className="bg-[#1e293b] rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md">
                {/* Order Header */}
                <div className="bg-[#1e293b] px-4 py-3 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <FiPackage className="text-blue-600" />
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-300">Order #{order.orderId}</h2>
                      <p className="text-xs text-gray-400">
                        {new Date(order.createdAt || order.orderDate).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm text-gray-400 pt-4">Total</p>
                      <p className="font-bold text-gray-800">₹{order.totalAmount}</p>
                    </div>
                    {renderStatusBadge(order.status)}
                  </div>
                </div>

                {/* Order Details */}
                <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Customer Info */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-300 flex items-center gap-2">
                      <FiUser /> Customer Details
                    </h3>
                    <div className="space-y-1 pl-6">
                      <p className="flex items-center gap-2">
                        <FiMail className="text-gray-400" />
                        <span className="text-gray-400">{order.email}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <FiPhone className="text-gray-400" />
                        <span className="text-gray-400">{order.phone}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <FiHome className="text-gray-400" />
                        <span className="line-clamp-1 text-gray-400">{order.address}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <FiCreditCard className="text-gray-400" />
                        <span className="text-gray-400">{order.paymentMethod}</span>
                      </p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="lg:col-span-2">
                    <h3 className="font-semibold text-gray-400 mb-3 flex items-center gap-2">
                      <FiPackage /> Order Items ({order.orderItems.length})
                    </h3>
                    <div className="space-y-3">
                      {order.orderItems.map((item) => (
                        <div key={item.id} className="flex gap-4 border-b pb-3 last:border-0">
                          <div className="flex-shrink-0">
                            <img
                              src={item.imgSrc || "/placeholder-product.jpg"}
                              alt={item.title}
                              className="w-16 h-16 object-cover rounded-lg border"
                              onError={(e) => {
                                e.target.src = "/placeholder-product.jpg";
                              }}
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-400">{item.title}</h4>
                            <p className="text-sm text-gray-400 line-clamp-1">{item.description}</p>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-sm text-gray-400">
                                ₹{item.price} × {item.quantity}
                              </span>
                              <span className="font-medium text-gray-400">
                              ₹{item.price * item.quantity}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Order Actions */}
                {(isAdmin || isMerchant) && (
                  <div className="bg-[#1e293b] px-4 py-3 border-t flex justify-end gap-3">
                    {order.status === "UNSHIPPED" && (
                      <button
                        onClick={() => updateOrderStatus(order.orderId, "SHIPPED")}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        <FiTruck className="mr-2" /> Mark as Shipped
                      </button>
                    )}
                    {order.status === "SHIPPED" && (
                      <button
                        onClick={() => updateOrderStatus(order.orderId, "DELIVERED")}
                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                      >
                        <FiCheckCircle className="mr-2" /> Mark as Delivered
                      </button>
                    )}
                    {order.status === "DELIVERED" && (
                      <span className="flex items-center px-4 py-2 text-green-600">
                        <FiCheckCircle className="mr-2" /> Order Completed
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default OrderData;
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const isAuthenticated = !!localStorage.getItem("auth");
//   const isAdmin = localStorage.getItem("role") === "admin";

//   const handleLogout = () => {
//     localStorage.removeItem("auth");
//     localStorage.removeItem("role");
//     navigate("/signin");
//   };

//   return (
//     <nav className="bg-gray-800 p-4">
//       <div className="container mx-auto flex justify-between">
//         <Link to="/" className="text-white text-lg font-bold">Cricboard</Link>
//         <div>
//         <Link to="/international" className="text-white mx-2 hover:text-blue-400 transition-colors duration-200">International Live Score</Link>
//         <Link to="/locallivescore" className="text-white mx-2 hover:text-blue-400 transition-colors duration-200">Local Score</Link>
//           <Link to="/details" className="text-white mx-2 hover:text-blue-400 transition-colors duration-200">Details</Link>
//           <Link to="/venue" className="text-white mx-2 hover:text-blue-400 transition-colors duration-200">Venue</Link>
//           {isAdmin && (
//             <Link to="/add-venue" className="text-white mx-2 hover:text-blue-400 transition-colors duration-200">Add Venue</Link>
//           )}
//           <Link to="/toss" className="text-white mx-2 hover:text-blue-400 transition-colors duration-200">Toss</Link>
//           <Link to="/openers" className="text-white mx-2 hover:text-blue-400 transition-colors duration-200">Openers</Link>
//           <Link to="/contact" className="text-white mx-2 hover:text-blue-400 transition-colors duration-200">Contact</Link>
//           {isAuthenticated ? (
//             <Link
//               onClick={handleLogout}
//               className="text-white mx-2 hover:text-red-500 transition-colors duration-200 cursor-pointer"
//             >
//               Log Out
//             </Link>
//           ) : (
//             <>
//               <Link to="/signup" className="inline-flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mx-2">Sign Up</Link>
//               <Link to="/signin" className="inline-flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 mx-2">Log In</Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import React from "react";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const isAuthenticated = !!localStorage.getItem("auth");
//   const isAdmin = localStorage.getItem("role") === "admin";
//   const [isNewsOpen, setIsNewsOpen] = useState(false);
//   const [seriesOpen, setSeriesOpen] = useState(false);

//   const handleLogout = () => {
//     localStorage.removeItem("auth");
//     localStorage.removeItem("role");
//     navigate("/signin");
//   };

//   return (
//     <>
//       <nav className="fixed top-0 w-full bg-gray-900 text-white p-3 shadow-md z-50">
//         <div className="max-w-7xl mx-auto flex justify-between items-center">
//           <div className="text-xl font-bold">Cricboard</div>
//           <div className="flex space-x-6 text-sm relative">
//             <Link to="/international" className="hover:underline text-white">
//               Live Scores
//             </Link>
//             <Link to="/" className="hover:underline text-white">
//               Schedule
//             </Link>
//             <Link to="/" className="hover:underline text-white">
//               Archives
//             </Link>

//             {/* News with Dropdown */}
//             <div
//               className="relative"
//               onMouseEnter={() => setIsNewsOpen(true)}
//               onMouseLeave={() => setIsNewsOpen(false)}
//             >
//               <Link to="/" className="hover:underline text-white">
//                 News ▼
//               </Link>
//               {isNewsOpen && (
//                 <div className="absolute left-0  w-48 bg-white text-gray-900 shadow-lg rounded-md">
//                   <ul className="py-2">
//                     <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
//                       All Stories
//                     </li>
//                     <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
//                       Premium Editorials
//                     </li>
//                     <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
//                       Latest News
//                     </li>
//                     <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
//                       Topics
//                     </li>
//                     <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
//                       Spotlight
//                     </li>
//                     <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
//                       Opinions
//                     </li>
//                     <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
//                       Specials
//                     </li>
//                     <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
//                       Stats & Analysis
//                     </li>
//                     <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
//                       Interviews
//                     </li>
//                     <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
//                       Live Blogs
//                     </li>
//                     <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
//                       Harsha Bhogle
//                     </li>
//                   </ul>
//                 </div>
//               )}
//             </div>

//             {/* Series with Dropdown */}
//             <div
//               className="relative"
//               onMouseEnter={() => setSeriesOpen(true)}
//               onMouseLeave={() => setSeriesOpen(false)}
//             >
//               <Link to="" className="hover:underline text-white">
//                 Series ▼
//               </Link>
//               {seriesOpen && (
//                 <div className="absolute left-0  w-72 bg-white text-gray-900 shadow-lg rounded-md">
//                   <ul className="py-2">
//                     <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
//                       ICC Champions Trophy, 2025
//                     </li>
//                     <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
//                       Womens Premier League 2025
//                     </li>
//                     <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
//                       Indian Premier League 2025
//                     </li>
//                     <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
//                       Pakistan ODI Tri-Series, 2025
//                     </li>
//                     <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
//                       Ireland tour of Zimbabwe, 2025
//                     </li>
//                     <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
//                       Australia tour of Sri Lanka, 2025
//                     </li>
//                     <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
//                       Ranji Trophy Elite 2024-25
//                     </li>
//                     <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
//                       England tour of India, 2025
//                     </li>
//                     <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
//                       Pakistan tour of New Zealand, 2025
//                     </li>
//                     <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
//                       All Series
//                     </li>
//                   </ul>
//                 </div>
//               )}
//             </div>

//             {/* <Link to="" className="hover:underline text-white">
//               Series
//             </Link> */}
//             <Link to="" className="hover:underline text-white">
//               Teams
//             </Link>
//             <Link to="" className="hover:underline text-white">
//               Videos
//             </Link>
//             <Link to="" className="hover:underline text-white">
//               Rankings
//             </Link>
//             <Link to="" className="hover:underline text-white">
//               More
//             </Link>
//           </div>

//           <div className="flex space-x-4">
//             {isAuthenticated ? (
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-600 hover:bg-red-700 text-white px-4 py-[10px] rounded-full font-bold"
//               >
//                 Log Out
//               </button>
//             ) : (
//               <div className="flex gap-4">
//                 <Link
//                   to="/signin"
//                   className="bg-blue-900 border-white text-white px-4 py-[10px] rounded-full font-bold"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="bg-red-600 hover:bg-red-700 text-white px-4 py-[10px] rounded-full font-bold"
//                 >
//                   Sign Up
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </nav>

//           </>
//   );
// };

// export default Navbar;
//
// import React from "react";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
//
// const Navbar = () => {
//   const navigate = useNavigate();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const isAuthenticated = !!localStorage.getItem("auth");
//   const isAdmin = localStorage.getItem("role") === "admin";
//   const [isNewsOpen, setIsNewsOpen] = useState(false);
//   const [seriesOpen, setSeriesOpen] = useState(false);
//
//   const handleLogout = () => {
//     localStorage.removeItem("auth");
//     localStorage.removeItem("role");
//     navigate("/signin");
//   };
//
//   return (
//     <>
//       <nav className="fixed top-0 w-full bg-gray-900 text-white p-3 shadow-md z-50 ">
//         <div className="max-w-7xl mx-auto flex justify-between items-center">
//           <a href="/"><img className="ml--20 w-15 h-12 pt-1 pd-1   justify-between items-left" src="../../public/cricboard-logo-crop.png" alt="Logo" /></a>
//
//           <div className="flex space-x-6 text-sm relative">
//           <Link to="/" className="hover:underline text-white">
//               Home
//             </Link>
//             <Link to="/matches" className="hover:underline text-white">
//               Matches
//             </Link>
//             <Link to="/schedule" className="hover:underline text-white">
//               Schedule
//             </Link>
//             <Link to="/toss" className="hover:underline text-white">
//               Toss
//             </Link>

            {/* News with Dropdown */}
{/*             <div */}
{/*               className="relative" */}
{/*               onMouseEnter={() => setIsNewsOpen(true)} */}
{/*               onMouseLeave={() => setIsNewsOpen(false)} */}
{/*             > */}
{/*               <Link to="/news" className="hover:underline text-white"> */}
{/*                 News  */}
{/*               </Link> */}
              {/* {isNewsOpen && (
                <div className="absolute left-0  w-48 bg-white text-gray-900 shadow-lg rounded-md">
                  <ul className="py-2">
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      All Stories
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      Premium Editorials
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      Latest News
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      Topics
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      Spotlight
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      Opinions
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      Specials
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      Stats & Analysis
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      Interviews
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      Live Blogs
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      Harsha Bhogle
                    </li>
                  </ul>
                </div>
              )} */}
{/*             </div> */}

            {/* Series with Dropdown */}
{/*             <div */}
{/*               className="relative" */}
{/*               onMouseEnter={() => setSeriesOpen(true)} */}
{/*               onMouseLeave={() => setSeriesOpen(false)} */}
{/*             > */}
{/*               <Link to="/series" className=" hover:underline text-white"> */}
{/*                 Series  */}
{/*               </Link> */}
              {/* {seriesOpen && (
                <div className="absolute left-0  w-72 bg-white text-gray-900 shadow-lg rounded-md">
                  <ul className="py-2">
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      ICC Champions Trophy, 2025
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      Womens Premier League 2025
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      Indian Premier League 2025
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      Pakistan ODI Tri-Series, 2025
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      Ireland tour of Zimbabwe, 2025
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      Australia tour of Sri Lanka, 2025
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      Ranji Trophy Elite 2024-25
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      England tour of India, 2025
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      Pakistan tour of New Zealand, 2025
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      All Series
                    </li>
                  </ul>
                </div>
              )} */}
{/*             </div> */}

            {/* <Link to="" className="hover:underline text-white">
              Series
            </Link> */}
{/*             <Link to="/teams" className="hover:underline text-white"> */}
{/*               Teams */}
{/*             </Link> */}
{/*              */}
{/*             <Link to="/ranking" className="hover:underline text-white"> */}
{/*               Rank */}
{/*             </Link><Link to="/photo" className="hover:underline text-white"> */}
{/*               Photo */}
{/*             </Link> */}
{/*               <Link to="http://localhost:5500/Cricboard/"  className="hover:underline text-white"> */}
{/*               Done</Link> */}
{/*             <Link to="/locallivescore" className="hover:underline text-white"> */}
{/*               Local Match */}
{/*             </Link> */}
{/*             <Link to="/venue" className="hover:underline text-white"> */}
{/*               Add Venue */}
{/*             </Link> */}
{/*             <Link to="/venueshow" className="hover:underline text-white"> */}
{/*               Book Venue */}
{/*             </Link> */}
{/*             <Link to="/contact" className="hover:underline text-white"> */}
{/*               Contact US */}
{/*             </Link> */}
{/*           </div> */}

{/*           <div className="flex space-x-4"> */}
{/*             {isAuthenticated ? ( */}
{/*               <button */}
{/*                 onClick={handleLogout} */}
{/*                 className="bg-red-600 hover:bg-red-700 text-white px-4 py-[10px] rounded-full font-bold" */}
{/*               > */}
{/*                 Log Out */}
{/*               </button> */}
{/*             ) : ( */}
{/*               <div className="flex gap-4"> */}
{/*                 <Link */}
{/*                   to="/signin" */}
{/*                   className="bg-blue-800 hover:bg-blue-900 border-white text-white px-4 py-[10px] rounded-full font-bold" */}
{/*                 > */}
{/*                   Login */}
{/*                 </Link> */}
{/*                 <Link */}
{/*                   to="/signup" */}
{/*                   className="bg-red-600 hover:bg-red-700 text-white px-4 py-[10px] rounded-full font-bold" */}
{/*                 > */}
{/*                   Sign Up */}
{/*                 </Link> */}
{/*               </div> */}
{/*             )} */}
{/*           </div> */}
{/*         </div> */}
{/*       </nav> */}

      {/* <nav className="bg-gray-900 text-white px-4 py-3 border-b-[1px] border-gray-300 flex items-center justify-between fixed top-0 w-full shadow-md z-10">
        <div className="flex items-center gap-4">
          <div
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-10 h-10 hidden md:grid justify-center items-center rounded-full hover:bg-[#46484875]"
          >
            <img
              className="w-7 h-7 hidden md:grid cursor-pointer"
              src={menu}
              alt="menu"
            ></img>
          </div>
          <Link
            to="/"
            className="text-white text-2xl font-extrabold tracking-wide hover:text-blue-400 transition-colors duration-200"
          >
            Cricboard
          </Link>
        </div> */}

      {/* <div className="container mx-auto flex items-center justify-between"> */}
      {/* <div className="flex space-x-6">
      {/* <div className="container mx-auto flex items-center justify-between"> */}
      {/* <div className="flex space-x-6">
          <Link
            to="/international"
            className="text-white text-sm hover:text-blue-400 transition-colors duration-200"
          >
            International Live Score
          </Link>
          <Link
            to="/locallivescore"
            className="text-white text-sm hover:text-blue-400 transition-colors duration-200"
          >
            Local Score
          </Link>
          <Link
            to="/venue"
            className="text-white text-sm hover:text-blue-400 transition-colors duration-200"
          >
            Venue
          </Link>
          {isAdmin && (
            <Link
              to="/add-venue"
              className="text-white text-sm hover:text-blue-400 transition-colors duration-200"
            >
              Add Venue
            </Link>
          )}
          <Link
            to="/toss"
            className="text-white text-sm hover:text-blue-400 transition-colors duration-200"
          >
            Toss
          </Link>
          <Link
            to="/details"
            className="text-white text-sm hover:text-blue-400 transition-colors duration-200"
          >
            Details
          </Link>
        </div> 
        </div> */}

      {/* <div className="flex space-x-4">
      {/* <div className="flex space-x-4">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-[10px] rounded-full font-bold"
            >
              Log Out
            </button>
          ) : (
            <div className="flex gap-4">
              <Link
                to="/signin"
                variant="outline"
                className="bg-blue-900 border-white text-white px-4 py-[10px] rounded-full font-bold"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-[10px] rounded-full font-bold"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div> */}
      {/* </div> */}
      {/* </nav> */}

      {/* {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )} */}

      {/* <div
        className={`fixed top-0 left-0 h-full z-30 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <Sidebar />
      </div> */}
{/*     </> */}
{/*   ); */}
{/* }; */}

{/* export default Navbar; */}
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icons for toggle menu
import userImage from "../assets/images/account.png"; // User profile image

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isAuthenticated = !!localStorage.getItem("auth");
  const isAdmin = localStorage.getItem("role") === "admin";
  const isMerchant = localStorage.getItem("role") === "merchant";

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("role");
    localStorage.removeItem("cart");
    localStorage.removeItem("orderDetails");
    document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/signin");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-[#1a2938] text-white py-3 shadow-md">
      <div className="mx-auto flex items-center justify-between px-10">
        {/* Left Side: Toggle Button + Logo */}
        <div className="flex items-center space-x-4">
          <button
            className="text-white focus:outline-none transition-transform duration-300 hover:scale-110"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          {!isAdmin && !isMerchant ? (
          <Link to="/" className="flex-shrink-0 group">
            <img
              className="w-15 h-12 transition-transform duration-300 group-hover:scale-110"
              src="/cricboard-logo-crop.png"
              alt="Logo"
            />
          </Link>):(<img
              className="w-15 h-12 transition-transform duration-300 group-hover:scale-110"
              src="/cricboard-logo-crop.png"
              alt="Logo"
            />)
          } 
          {
          isAdmin?(<h1 className="text-xl font-bold">Admin panel</h1>):(<></>)
          } 
          {
          isMerchant?(<h1 className="text-xl font-bold">Merchant panel</h1>):(<></>)
          } 
        </div>

        {/* Center Navigation Links */}
        <div className="flex items-center justify-center space-x-8 tracking-widest font-my3 text-xs">
          {
          !isAdmin && !isMerchant && [
            { to: "/matches", text: "Matches" },
            { to: "http://localhost:5500/", text: "Local Match" },
            // { to: "/localmatch", text: "Local Match" },
            { to: "/venueshow", text: "Book Venue" },
            { to: "/products", text: "Sport Equipment" },
            { to: "/contact", text: "Contact Us" },
          ].map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="hover:no-underline text-white font-medium hover:text-yellow-400 transition duration-300 relative after:block after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-white after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {link.text}
            </Link>
          ))}
        </div>

        {/* Right Side: Profile/Login */}
        <div className="flex space-x-4">
          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                className="w-10 h-10 rounded-full bg-gray-700 text-white flex items-center justify-center shadow-md hover:bg-gray-600 transition-all duration-300"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img src={userImage} className="w-7 h-7 rounded-full" alt="User" />
              </button>

              {dropdownOpen && (
                <div className="absolute z-50 border-[1px] font-my border-gray-700 hover:bg-gray-700 right-0 mt-2 w-36 bg-gray-800 rounded-md shadow-xl py-2">
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-200  w-full text-left"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/signin"
                className="font-my hover:no-underline text-sm text-[#cfcfcfd0] hover:text-white py-2 font-extrabold tracking-wide transition duration-300 uppercase relative after:block after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-white after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="font-my hover:no-underline text-sm text-[#cfcfcfd0] hover:text-white py-2 font-extrabold tracking-wide transition duration-300 uppercase relative after:block after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-white after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Side Menu */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 shadow-lg z-50 p-4 space-y-3 overflow-y-auto h-screen transition-transform duration-500 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-2 border-b border-gray-700">
        {!isAdmin && !isMerchant ? (
          <Link to="/" className="flex-shrink-0 group">
            <img className="w-15 h-12 transition-transform duration-300 group-hover:scale-110" src="/cricboard-logo-crop.png" alt="Logo" />
          </Link>):(<img className="w-15 h-12 transition-transform duration-300 group-hover:scale-110" src="/cricboard-logo-crop.png" alt="Logo" />)
          } 
          {isAdmin && 
          <h1 className="text-sm font-bold">Admin</h1>
          }
          {isMerchant && 
          <h1 className="text-sm font-bold">Merchant</h1>
          }
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-white transition-transform duration-300 hover:rotate-90"
          >
            <X size={28} />
          </button>
        </div>

        {/* Menu Links */}
        <div className="flex flex-col space-y-3 mt-4 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
          {!isAdmin && !isMerchant &&
          [
            { to: "/matches", text: "Matches" },
            { to: "/schedule", text: "Schedule" },
            { to: "/toss", text: "Toss" },
            { to: "/news", text: "News" },
            { to: "/series", text: "Series" },
            { to: "/teams", text: "Teams" },
            { to: "/ranking", text: "Rank" },
            { to: "/photo", text: "Photo" },
            { to: "http://localhost:5500/", text: "Local Match" },
            { to: "/venueshow", text: "Book Venue" },
            { to: "/contact", text: "Contact Us" },
            { to: "/products", text: "Sport Equipment" },
          ].map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="hover:text-yellow-400 transition-opacity duration-300 opacity-90 hover:opacity-100"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.text}
            </Link>
            
          ))}
          {
            isAuthenticated && !isAdmin && !isMerchant && (
              <>
              <Link to="/orderData" className="hover:text-yellow-400 transition text-green-400" onClick={() => setIsMenuOpen(false)}>Order Details</Link>
              <Link to="/bookingData" className="hover:text-yellow-400 transition text-green-400" onClick={() => setIsMenuOpen(false)}>Booking Details</Link>
              </>
            )
          }
          {
            isMerchant && (
              <>
              <Link to="/venue" className="text-green-400 hover:text-yellow-400" onClick={() => setIsMenuOpen(false)}>Host Venue</Link>
              <Link to="/remove-venue" className="text-green-400 hover:text-yellow-400" onClick={() => setIsMenuOpen(false)}>Discard Venue</Link>
              <Link to="/merchant" className="text-green-400 hover:text-yellow-400" onClick={() => setIsMenuOpen(false)}>Premium</Link>
              <Link to="/bookingData" className="hover:text-yellow-400 transition text-green-400" onClick={() => setIsMenuOpen(false)}>Booking Details</Link>
              </>
            )
          }
          {isAdmin && (
            <>
              
              <Link to="/venue" className="text-green-400 hover:text-yellow-400" onClick={() => setIsMenuOpen(false)}>Host Venue</Link>
              <Link to="/addProduct" className="text-green-400 hover:text-yellow-400" onClick={() => setIsMenuOpen(false)}> Product Listing</Link>
              <Link to="/remove-venue" className="text-green-400 hover:text-yellow-400" onClick={() => setIsMenuOpen(false)}>Discard Venue</Link>
              <Link to="/bookingData" className="hover:text-yellow-400 transition text-green-400" onClick={() => setIsMenuOpen(false)}>Booking Details</Link>
              <Link to="/orderData" className="hover:text-yellow-400 transition text-green-400" onClick={() => setIsMenuOpen(false)}>Order Details</Link>
              <Link to="/userDetails" className="hover:text-yellow-400 transition text-green-400" onClick={() => setIsMenuOpen(false)}>User Details</Link>
              <Link to="/merchantDetails" className="hover:text-yellow-400 transition text-green-400" onClick={() => setIsMenuOpen(false)}>Merchant Details</Link>
              <Link to="/updateProduct" className="hover:text-yellow-400 transition text-green-400" onClick={() => setIsMenuOpen(false)}>Update Product</Link>
              <Link to="/removeProduct" className="hover:text-yellow-400 transition text-green-400" onClick={() => setIsMenuOpen(false)}>Discard Product</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


// import React from "react";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [isNewsOpen, setIsNewsOpen] = useState(false);
//   const [seriesOpen, setSeriesOpen] = useState(false);
//   const isAuthenticated = !!localStorage.getItem("auth");
//   const isAdmin = localStorage.getItem("role")=="admin";

//   const handleLogout = () => {
//     localStorage.removeItem("auth");
//     localStorage.removeItem("role");
//     navigate("/signin");
//   };

//   return (
//     <nav className="fixed top-0 w-full bg-gray-900 text-white py-3 shadow-md z-50">
//       <div className="max-w-7xl mx-auto flex items-center justify-between">

//         {/* Logo on the Left */}
//         <Link to="/" className="flex-shrink-0">
//           <img className="w-15 h-12" src="/cricboard-logo-crop.png" alt="Logo" />
//         </Link>

//         {/* Navigation Links on the Right */}
//         <div className="flex items-center space-x-6 text-sm ">
//           <Link to="/matches" className="hover:text-yellow-400 transition">Matches</Link>
//           <Link to="/schedule" className="hover:text-yellow-400 transition">Schedule</Link>
//           <Link to="/toss" className="hover:text-yellow-400 transition">Toss</Link>

//           {/* News Dropdown */}
//           <div
//             className="relative group"
//             onMouseEnter={() => setIsNewsOpen(true)}
//             onMouseLeave={() => setIsNewsOpen(false)}
//           >
//             <Link to="/news" className="hover:text-yellow-400 transition">News</Link>
//           </div>

//           {/* Series Dropdown */}
//           <div
//             className="relative group"
//             onMouseEnter={() => setSeriesOpen(true)}
//             onMouseLeave={() => setSeriesOpen(false)}
//           >
//             <Link to="/series" className="hover:text-yellow-400 transition">Series</Link>
//           </div>

//           <Link to="/teams" className="hover:text-yellow-400 transition">Teams</Link>
//           <Link to="/ranking" className="hover:text-yellow-400 transition">Rank</Link>
//           <Link to="/photo" className="hover:text-yellow-400 transition">Photo</Link>
//           {
//             isAuthenticated && !isAdmin ?
//             (<Link to="http://localhost:5500/Cricboard" className="hover:text-yellow-400 transition">Local Match</Link>):(<></>)
//           }
//           {
//           isAdmin ?
//           (<Link to="/venue" className="hover:text-yellow-400 transition text-green-400">Add Venue</Link>):(<></>)
//           } 
//           {
//           isAdmin ?
//           (<Link to="/addProduct" className="hover:text-yellow-400 transition text-green-400">Add Products</Link>):(<></>)
//           } 
//           {
//           isAdmin ?
//           (<Link to="/remove-venue" className="hover:text-yellow-400 transition text-green-400">Remove Venue</Link>):(<></>)
//           } 
//           {
//           isAdmin ?
//           (<Link to="/bookingData" className="hover:text-yellow-400 transition text-green-400">Booked Venue</Link>):(<></>)
//           } 
//           {
//           isAdmin ?
//           (<Link to="/userDetails" className="hover:text-yellow-400 transition text-green-400">User Details</Link>):(<></>)
//           } 
//           <Link to="/venueshow" className="hover:text-yellow-400 transition">Book Venue</Link>
//           <Link to="/contact" className="hover:text-yellow-400 transition">Contact Us</Link>
//           <Link to="/products" className="hover:text-yellow-400 transition">Sport Equipment</Link>

//           {/* Authentication Buttons */}
//           {isAuthenticated ? (
//             <button
//               onClick={handleLogout}
//               className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full font-bold transition"
//             >
//               Log Out
//             </button>
//           ) : (
//             <div className="flex space-x-4">
//               <Link
//                 to="/signin"
//                 className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-full font-bold transition"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/signup"
//                 className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full font-bold transition"
//               >
//                 Sign Up
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
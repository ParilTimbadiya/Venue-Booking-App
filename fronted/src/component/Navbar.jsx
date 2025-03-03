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

import React from "react";
import logo from "../assets/images/logo.png"; // Importing the logo

import { useState } from "react";
import Sidebar from "./Sidebar";
import menu from "../assets/images/Hamburger_menu.png";
import { Link, useNavigate } from "react-router-dom";
import logo2 from "../assets/images/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isAuthenticated = !!localStorage.getItem("auth");
  const isAdmin = localStorage.getItem("role") === "admin";
  const [isNewsOpen, setIsNewsOpen] = useState(false);
  const [seriesOpen, setSeriesOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("role");
    navigate("/signin");
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-gray-900 text-white p-3 shadow-md z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="hover:no-underline text-white">
          <div className="flex items-center shadow-white">
            <img src={logo} alt="Cricboard Logo" className="h-8" />{" "}
            {/* Logo added */}
          <div className="text-2xl ml-1 font-semibold text-start">Cricboard</div>
          </div>
          </Link>

          <div className="flex space-x-6 text-sm relative">
            <Link to="/international" className="hover:underline text-white">
              Live Scores
            </Link>
            <Link to="/" className="hover:underline text-white">
              Schedule
            </Link>
            <Link to="/toss" className="hover:underline text-white">
              Toss
            </Link>

            {/* News with Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsNewsOpen(true)}
              onMouseLeave={() => setIsNewsOpen(false)}
            >
              <Link to="/" className="hover:underline text-white">
                News ▼
              </Link>
              {isNewsOpen && (
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
              )}
            </div>

            {/* Series with Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSeriesOpen(true)}
              onMouseLeave={() => setSeriesOpen(false)}
            >
              <Link to="" className="hover:underline text-white">
                Series ▼
              </Link>
              {seriesOpen && (
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
              )}
            </div>

            {/* <Link to="" className="hover:underline text-white">
              Series
            </Link> */}
            <Link to="/" className="hover:underline text-white">
              Teams
            </Link>
            <Link to="/" className="hover:underline text-white">
              Videos
            </Link>
            <Link to="/locallivescore" className="hover:underline text-white">
              Start Tournament
            </Link>
            <Link to="/venue" className="hover:underline text-white">
              Sport Venue
            </Link>
            {isAdmin && (
              <Link
                to="/add-venue"
                className="text-white text-sm hover:text-blue-400 transition-colors duration-200"
              >
                Add Venue
              </Link>
            )}
            {isAdmin && (
              <Link
                to="/remove-venue"
                className="text-white text-sm hover:text-blue-400 transition-colors duration-200"
              >
                Delete Venue
              </Link>
            )}
          </div>

          <div className="flex space-x-4">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center rounded-full shadow-lg px-4 py-2 bg-gray-800"
              >
                Log Out
              </button>
            ) : (
              <div className="flex items-center rounded-full shadow-lg px-4 py-2 bg-gray-800">
                <Link
                  to="/signin"
                  className="text-white hover:text-blue-400 transition-colors duration-200"
                >
                  Log In
                </Link>
                <span className="mx-2">|</span>
                <Link
                  to="/signup"
                  className="text-white hover:text-blue-400 transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

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
        </div> */}

      {/* <div className="flex space-x-4">
          {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-red-500 to-red-700 text-white px-5 py-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  Log Out
                </button>

          ) : (
            <div className="flex gap-4">
                <div className="flex items-center rounded-lg shadow-lg p-2 bg-gray-800">
                  <Link to="/signin" className="text-white hover:text-blue-400 transition-colors duration-200">Log In</Link>
                  <span className="mx-2">|</span>
                  <Link to="/signup" className="text-white hover:text-blue-400 transition-colors duration-200">Sign Up</Link>
                </div>

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
    </>
  );
};

export default Navbar;

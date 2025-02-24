import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo2 from "../assets/images/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("auth");
  const isAdmin = localStorage.getItem("role") === "admin";

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("role");
    navigate("/signin");
  };

  return (
    <nav className="bg-gray-900 shadow-lg p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-4">
            <img src={logo2} alt="Logo 2" className="h-12 w-12" />
            <span className="text-white text-2xl font-extrabold tracking-wide hover:text-blue-400 transition-colors duration-200">
              CricBox
            </span>
          </Link>
        </div>

        <div className="flex space-x-6">
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
          {isAdmin && (
            <Link
              to="/remove-venue"
              className="text-white text-sm hover:text-blue-400 transition-colors duration-200"
            >
              Remove Venue
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

        <div className="flex space-x-4">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200"
            >
              Log Out
            </button>
          ) : (
            <>
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Sign Up
              </Link>
              <Link
                to="/signin"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-200"
              >
                Log In
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

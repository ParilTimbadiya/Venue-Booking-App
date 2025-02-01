import React from "react";
import { Link, useNavigate } from "react-router-dom";

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
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-white text-lg font-bold">Cricboard</Link>
        <div>
        <Link to="/livescore" className="text-white mx-2 hover:text-blue-400 transition-colors duration-200">Live Score</Link>
          <Link to="/details" className="text-white mx-2 hover:text-blue-400 transition-colors duration-200">Details</Link>
          <Link to="/venue" className="text-white mx-2 hover:text-blue-400 transition-colors duration-200">Venue</Link>
          {isAdmin && (
            <Link to="/add-venue" className="text-white mx-2 hover:text-blue-400 transition-colors duration-200">Add Venue</Link>
          )}
          <Link to="/toss" className="text-white mx-2 hover:text-blue-400 transition-colors duration-200">Toss</Link>
          <Link to="/openers" className="text-white mx-2 hover:text-blue-400 transition-colors duration-200">Openers</Link>
          <Link to="/contact" className="text-white mx-2 hover:text-blue-400 transition-colors duration-200">Contact</Link>
          {isAuthenticated ? (
            <Link
              onClick={handleLogout}
              className="text-white mx-2 hover:text-red-500 transition-colors duration-200 cursor-pointer"
            >
              Log Out
            </Link>
          ) : (
            <>
              <Link to="/signup" className="inline-flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mx-2">Sign Up</Link>
              <Link to="/signin" className="inline-flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 mx-2">Log In</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className=" w-72 bg-gray-900 text-white border-red-700 border-2 rounded-3xl">
      <div className="p-4">
        <ul className="space-y-4">
          <li>
            <Link
              to="/international"
              className="block px-4 py-[10px] hover:bg-gray-800 rounded-xl text-white"
            >
              International Live Score
            </Link>
          </li>
          <li>
            <Link
              to="/locallivescore"
              className="block px-4 py-[10px] hover:bg-gray-800 rounded-xl text-white"
            >
              Local Score
            </Link>
          </li>
          <li>
            <Link
              to="/venue"
              className="block px-4 py-[10px] hover:bg-gray-800 rounded-xl text-white"
            >
              Venue
            </Link>
          </li>
          <li>
            <Link
              to="/toss"
              className="block px-4 py-[10px] hover:bg-gray-800 rounded-xl text-white"
            >
              Toss
            </Link>
          </li>
          <li>
            <Link
              to="/details"
              className="block px-4 py-[10px] hover:bg-gray-800 rounded-xl text-white"
            >
              Details
            </Link>
          </li>
          <li>
            <Link
              to="/MainContainer"
              className="block px-4 py-[10px] hover:bg-gray-800 rounded-xl text-white"
            >
              MainContainer
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

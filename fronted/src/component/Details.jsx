import React from 'react';
import { Link } from 'react-router-dom';

const Details = () => {
  return (
    <div className="max-w-4xl mx-auto p-5">
      <div className="text-center my-3">
        <span className="h1">
          <img src="src/assets/images/details.png" width="40" height="40" alt="Details Icon" />
        </span>
        <span className="h1 text-2xl font-bold">Match Details</span>
      </div>

      <div className="grid grid-cols-1 gap-4 px-5 py-3 mb-5">
        <div>
          <label className="form-label text-green-500 font-semibold">Match title:</label>
          <input type="text" id="matchTitle" className="form-control text-black bg-gray-200 p-2 rounded-lg" defaultValue="World Cup Final" />
        </div>
        <div>
          <label className="form-label text-green-500 font-semibold">Team 1:</label>
          <input type="text" id="teamOne" className="form-control text-black bg-gray-200 p-2 rounded-lg" defaultValue="Netherlands" />
        </div>
        <div>
          <label className="form-label text-green-500 font-semibold">Team 2:</label>
          <input type="text" id="teamTwo" className="form-control text-black bg-gray-200 p-2 rounded-lg" defaultValue="Bangladesh" />
        </div>
        <div>
          <label className="form-label text-green-500 font-semibold">Venue:</label>
          <input type="text" id="venue" className="form-control text-black bg-gray-200 p-2 rounded-lg" defaultValue="The VRA Cricket Ground, Amstelveen" />
        </div>
        <div>
          <label className="form-label text-green-500 font-semibold">Starts at:</label>
          <input type="datetime-local" id="startTime" className="form-control text-black bg-gray-200 p-2 rounded-lg" />
        </div>
        <div className="mt-4">
          <Link to={"/toss"}>
            <button className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200">Next</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Details;

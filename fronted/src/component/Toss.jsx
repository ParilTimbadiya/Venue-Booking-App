import React from 'react';

const Toss = () => {
  return (
    <div className="max-w-4xl mx-auto p-5">
      <div className="text-center my-3">
        <span className="h1">
          <img src="src/assets/images/toss.png" width="45" height="45" alt="Toss Icon" />
        </span>
        <span className="h1 text-2xl font-bold">Toss</span>
      </div>

      <div className="grid grid-cols-1 gap-4 px-5 py-3 mb-5">
        <div>
          <label className="form-label text-green-500 font-semibold">Toss won by:</label>
          <select className="form-select bg-gray-200 text-black p-2 rounded-lg" id="teamNames">
            {/* Options should be dynamically populated */}
          </select>
        </div>
        <div>
          <label className="form-label text-green-500 font-semibold">Chose to:</label>
          <select className="form-select bg-gray-200 text-black p-2 rounded-lg" id="tossDecision">
            <option value="bat">Bat</option>
            <option value="field">Field</option>
          </select>
        </div>
        <div>
          <label className="form-label text-green-500 font-semibold">No. of overs:</label>
          <select className="form-select bg-gray-200 text-black p-2 rounded-lg" id="overs">
            {/* Options should be dynamically populated */}
          </select>
        </div>
        <div>
          <label className="form-label text-green-500 font-semibold">No. of players:</label>
          <select className="form-select bg-gray-200 text-black p-2 rounded-lg" id="players">
            {/* Options should be dynamically populated */}
          </select>
        </div>
        <div className="mt-4">
        <Link to="/play">
            <button className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200">
              Next
            </button>
          </Link>
      
        </div>
      </div>
    </div>
  );
};

export default Toss;

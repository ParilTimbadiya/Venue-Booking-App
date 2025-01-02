// Openers Component
import React from 'react';

const Openers = () => {
  const handleSetup = () => {
    console.log("Openers setup confirmed.");
    // Add logic for setting up openers
  };

  return (
    <div className="fix-width-container">
      <div className="text-center my-3">
        <span className="h1">
          <img src="assets/images/openers.png" width="45" height="45" alt="Openers Icon" />
        </span>
        <span className="h1">Player List</span>
      </div>

      <div className="row px-lg-5 py-3 mb-lg-5">
        <div>
          <label className="form-label text-success h5">On-strike:</label>
          <select className="form-control bg-dark text-white" id="onStrike">
            {/* Options for on-strike players */}
          </select>
        </div>
        <div className="mt-3">
          <label className="form-label text-success h5">Non-strike:</label>
          <select className="form-control bg-dark text-white" id="nonStrike">
            {/* Options for non-strike players */}
          </select>
        </div>
        <div className="mt-5">
          <label className="form-label text-success h5">Bowler on-strike:</label>
          <select className="form-control bg-dark text-white" id="onStrikeBowler">
            {/* Options for bowler on-strike */}
          </select>
        </div>
        <div className="mt-3">
          <button type="button" className="btn btn-success" onClick={handleSetup}>Set</button>
        </div>
      </div>
    </div>
  );
};

export default Openers;
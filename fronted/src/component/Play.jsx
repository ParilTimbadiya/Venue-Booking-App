
import React from 'react';

const Play = () => {
  const handleDismiss = (type) => {
    console.log(`${type} dismissal occurred.`);
    // Add your logic here for dismissals
  };

  return (
    <div className="container mx-auto p-4">
      <div id="match-heading" className="mt-4 text-primary text-2xl font-bold mx-0 mx-lg-5 px-2"></div>
      <div className="flex items-center mx-lg-5 px-2 mb-3">
        <span>
          <img src="assets/images/coin.png" width="20" height="20" alt="Coin Icon" />
        </span>
        <span id="toss-win" className="mt-3 text-lg font-semibold"></span>
        <span id="innings-indicator" className="ml-2 text-lg font-semibold"></span>
      </div>
      <div className="shadow-lg mx-0 mx-lg-5 px-3 py-2 mb-3 rounded-lg">
        <div className="row py-2">
          <div className="col-12 fw-bold text-secondary mb-2" id="teamBatted">
            <span id="teamBattedNameScoreWicket" className="h4"></span>
          </div>
          <div className="col-7 fw-bold text-success">
            <span id="teamName" className="h4"></span>
            <span id="scoreAndWicket" className="h4"></span>
          </div>
          <div className="text-end col-5 h4" id="showOver"></div>
          <div className="col-12 mt-1">
            <div className="alert alert-warning p-1" id="verdict"></div>
          </div>
        </div>
      </div>
      {/* Add more logic for modal handling and interactions */}
    </div>
  );
};

export default Play;
import React from 'react';

function Lineup1() {
  const lineUpSetup = (team) => {
    console.log(`Setting up lineup for Team ${team}`);
  };

  return (
    <div className="fix-width-container">
      <div className="text-center my-3">
        <span className="h1">
          <img src="assets/images/player-list.png" width="45" height="45" alt="Player List" />
        </span>
        <span className="h1">Player List</span>
      </div>
      <div className="px-1 px-lg-3 py-3">
        <div className="mx-lg-1 mt-lg-0" id="teamTwoPlayers"></div>
        <div className="col-12 mt-3 text-center">
          <button className="btn btn-lg btn-success" onClick={() => lineUpSetup(1)}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default Lineup1;

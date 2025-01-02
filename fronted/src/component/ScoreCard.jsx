// Scorecard Component
import React from 'react';

const Scorecard = () => {
  const teamFullCard = (teamIndex) => {
    console.log(`Team ${teamIndex + 1} card clicked`);
    // Add your logic here for showing the full card
  };

  return (
    <div>
      <div className="mt-5 row d-flex justify-content-center mx-1 mx-lg-5">
        <div
          className="col-12 my-lg-0 col-lg-5 text-center shadow shadow-lg fw-bold mx-2 rounded-pill"
          id="teamOneCard"
          style={{ fontSize: "1.3rem" }}
          onClick={() => teamFullCard(0)}
        >
          <a
            id="teamOneName"
            className="nav-link active rounded-pill text-success"
            href="javascript:void(0)"
          >
            {/* Team One Name */}
          </a>
        </div>
        <div
          className="col-12 mt-3 my-lg-0 col-lg-5 text-center shadow shadow-lg fw-bold mx-2 rounded-pill"
          id="teamTwoCard"
          style={{ fontSize: "1.3rem" }}
          onClick={() => teamFullCard(1)}
        >
          <a
            id="teamTwoName"
            className="nav-link active rounded-pill text-success"
            href="javascript:void(0)"
          >
            {/* Team Two Name */}
          </a>
        </div>
      </div>

      <div className="my-5 mx-lg-5 px-2">
        <table className="table table-hover">
          <thead>
            <tr className="fw-bold">
              <th>Batting</th>
              <th></th>
              <th>R</th>
              <th>B</th>
              <th>0s</th>
              <th>4s</th>
              <th>6s</th>
              <th>SR</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody id="battingCard">
            {/* Batting card data should be dynamically rendered */}
          </tbody>
        </table>

        <div id="extraRuns"></div>
        <div className="my-3" id="scoreRateOver" style={{ fontSize: "1.3rem" }}></div>

        <table className="table table-hover mt-5" id="bowlingTable">
          <thead>
            <tr className="fw-bold">
              <th>Bowling</th>
              <th>O</th>
              <th>R</th>
              <th>M</th>
              <th>W</th>
              <th>Eco</th>
              <th>0s</th>
              <th>4s</th>
              <th>6s</th>
              <th>Wd</th>
              <th>Nb</th>
            </tr>
          </thead>
          <tbody id="bowlingCard">
            {/* Bowling card data should be dynamically rendered */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Scorecard;
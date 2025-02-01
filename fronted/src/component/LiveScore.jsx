import React from "react";
// import { Card, CardContent } from "./components/ui/card";
// import { Button } from "./components/ui/button";


const LiveScore = () => {
  const matchData = {
    team1: {
      name: "India",
      score: "181/9",
      overs: "20",
      flag: "https://flagcdn.com/in.svg",
    },
    team2: {
      name: "England",
      score: "166",
      overs: "19.4",
      flag: "https://flagcdn.com/gb-eng.svg",
    },
    result: "IND won by 15 runs",
    seriesInfo: "T20 4 of 5 (IND leads 3-1)",
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 text-white rounded-2xl shadow-lg">
        <div className="p-6">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-teal-400 mb-2">ICC</h2>
            <div className="flex justify-around text-sm text-gray-400">
              <span className="border-b-2 border-teal-400 pb-1">MATCHES</span>
              <span>NEWS</span>
            </div>
          </div>

          <div className="text-center text-gray-400 text-sm mb-4">Yesterday</div>

          <div className="flex justify-between items-center mb-4">
            {/* Team 1 */}
            <div className="flex flex-col items-center">
              <img
                src={matchData.team1.flag}
                alt={matchData.team1.name}
                className="w-12 h-8 rounded-md mb-2"
              />
              <div className="text-lg font-semibold">{matchData.team1.name}</div>
              <div className="text-sm">
                {matchData.team1.score} <span className="text-gray-400">({matchData.team1.overs})</span>
              </div>
            </div>

            {/* VS Divider */}
            <div className="text-gray-400 text-xl font-bold">VS</div>

            {/* Team 2 */}
            <div className="flex flex-col items-center">
              <img
                src={matchData.team2.flag}
                alt={matchData.team2.name}
                className="w-12 h-8 rounded-md mb-2"
              />
              <div className="text-lg font-semibold">{matchData.team2.name}</div>
              <div className="text-sm">
                {matchData.team2.score} <span className="text-gray-400">({matchData.team2.overs})</span>
              </div>
            </div>
          </div>

          <div className="text-center text-lg font-bold text-teal-400 mb-2">{matchData.result}</div>
          <div className="text-center text-sm text-gray-400">{matchData.seriesInfo}</div>

          <div className="mt-6 text-center">
            <button className="bg-teal-500 hover:bg-teal-400 text-white px-4 py-2 rounded-2xl shadow">
              View More Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveScore;

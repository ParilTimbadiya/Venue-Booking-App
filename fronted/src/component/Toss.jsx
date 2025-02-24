// import React from 'react';

// const Toss = () => {
//   return (
//     <div className="max-w-4xl mx-auto p-5">
//       <div className="text-center my-3">
//         <span className="h1">
//           <img src="src/assets/images/toss.png" width="45" height="45" alt="Toss Icon" />
//         </span>
//         <span className="h1 text-2xl font-bold">Toss</span>
//       </div>

//       <div className="grid grid-cols-1 gap-4 px-5 py-3 mb-5">
//         <div>
//           <label className="form-label text-green-500 font-semibold">Toss won by:</label>
//           <select className="form-select bg-gray-200 text-black p-2 rounded-lg" id="teamNames">
//             {/* Options should be dynamically populated */}
//           </select>
//         </div>
//         <div>
//           <label className="form-label text-green-500 font-semibold">Chose to:</label>
//           <select className="form-select bg-gray-200 text-black p-2 rounded-lg" id="tossDecision">
//             <option value="bat">Bat</option>
//             <option value="field">Field</option>
//           </select>
//         </div>
//         <div>
//           <label className="form-label text-green-500 font-semibold">No. of overs:</label>
//           <select className="form-select bg-gray-200 text-black p-2 rounded-lg" id="overs">
//             {/* Options should be dynamically populated */}
//           </select>
//         </div>
//         <div>
//           <label className="form-label text-green-500 font-semibold">No. of players:</label>
//           <select className="form-select bg-gray-200 text-black p-2 rounded-lg" id="players">
//             {/* Options should be dynamically populated */}
//           </select>
//         </div>
//         <div className="mt-4">
//         <Link to="/play">
//             <button className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200">
//               Next
//             </button>
//           </Link>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Toss;


import React, { useState } from "react";
import { motion } from "framer-motion";
import Head from "../assets/images/head.png";
import Tail from "../assets/images/tail.png";

const Toss = () => {
  const [teamA, setTeamA] = useState("Team A");
  const [teamB, setTeamB] = useState("Team B");
  const [teamAChoice, setTeamAChoice] = useState("heads");
  const [result, setResult] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [flipping, setFlipping] = useState(false);

  const handleToss = () => {
    setIsSpinning(true);
    setResult(null);
    setFlipping(true);

    setTimeout(() => {
      const tossResult = Math.random() < 0.5 ? "heads" : "tails";
      setResult(tossResult);
      setFlipping(false);
      setIsSpinning(false);
    }, 2000);
  };

  const winner = result ? (result === teamAChoice ? teamA : teamB) : null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-black p-6 text-white">
      <h2 className="text-4xl font-extrabold text-teal-400 mb-6 drop-shadow-lg">
        Cricket Match Toss
      </h2>

      {/* Coin Flip Animation */}
      <div className="flex flex-col items-center mb-6">
        <motion.div
          className="w-44 h-44 relative"
          animate={flipping ? { rotateY: [0, 180, 360, 540, 720] } : { rotateY: 0 }}
          transition={{ duration: flipping ? 1.5 : 0, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Pre-Flip Coin Side based on Team A's Choice */}
          {!flipping && !result && (
            <motion.img
              src={teamAChoice === "heads" ? Head : Tail}
              alt="Starting Coin Side"
              className="absolute w-full h-full rounded-full scale-150"
              style={{ backfaceVisibility: "hidden" }}
            />
          )}

          {/* Flip Animation */}
          {flipping && (
            <>
              <motion.img
                src={Head}
                alt="Head"
                className="absolute w-full h-full rounded-full scale-140"
                style={{ backfaceVisibility: "hidden" }}
              />
              <motion.img
                src={Tail}
                alt="Tail"
                className="absolute w-full h-full rounded-full scale-140"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              />
            </>
          )}

          {/* Final Result Coin Side */}
          {!flipping && result && (
            <motion.img
              src={result === "heads" ? Head : Tail}
              alt={result || "Coin"}
              className="absolute w-full h-full rounded-full scale-150"
              style={{ backfaceVisibility: "hidden" }}
            />
          )}
        </motion.div>
      </div>

      {/* Toss Result */}
      {result && (
        <div className="mt-6 text-center">
          <h3 className="text-3xl font-bold text-gray-300">Result: {result.toUpperCase()}</h3>
          <h2 className="text-2xl font-semibold text-blue-400 mt-2">
            {winner} wins the toss!
          </h2>
        </div>
      )}

      {/* Team Inputs */}
      <div className="flex flex-col md:flex-row gap-6 mb-4 mt-6">
        <div className="flex flex-col">
          <label className="font-medium text-gray-300 mb-1">Team A Name:</label>
          <input
            type="text"
            value={teamA}
            onChange={(e) => setTeamA(e.target.value)}
            className="p-3 bg-gray-800 text-white border border-gray-600 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium text-gray-300 mb-1">Team B Name:</label>
          <input
            type="text"
            value={teamB}
            onChange={(e) => setTeamB(e.target.value)}
            className="p-3 bg-gray-800 text-white border border-gray-600 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Coin Choice */}
      <div className="flex items-center mb-4">
        <label className="font-medium text-gray-300 mr-2">{teamA} chooses:</label>
        <select
          value={teamAChoice}
          onChange={(e) => setTeamAChoice(e.target.value)}
          className="p-3 bg-gray-800 text-white border border-gray-600 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="heads">Heads</option>
          <option value="tails">Tails</option>
        </select>
      </div>

      {/* Toss Button */}
      <button
        className={`px-6 py-3 text-lg font-semibold rounded-lg shadow-lg transition-transform transform ${
          isSpinning
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 text-white hover:scale-105"
        }`}
        onClick={handleToss}
        disabled={isSpinning}
      >
        {isSpinning ? "Spinning..." : "Toss the Coin"}
      </button>
    </div>
  );
};

export default Toss;
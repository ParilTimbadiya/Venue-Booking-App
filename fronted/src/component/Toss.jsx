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

import React, { useState } from 'react';
import Head from "../assets/images/head.png";
import Tail from "../assets/images/tail.png";

const Toss = () => {
  const [teamA, setTeamA] = useState('Team A');
  const [teamB, setTeamB] = useState('Team B');
  const [teamAChoice, setTeamAChoice] = useState('heads');
  const [result, setResult] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  
  const handleToss = () => {
    setIsSpinning(true);
    setResult(null); 
    
    setTimeout(() => {
      const tossResult = Math.random() < 0.5 ? 'heads' : 'tails';
      setResult(tossResult);
      setIsSpinning(false);
    }, 2000); 
  };

  const winner = result
    ? (result === teamAChoice ? teamA : teamB)
    : null;

  return (
    <div className="flex  flex-col items-center justify-center min-h-screen bg-gray-900  p-6">
      <h2 className="text-3xl font-bold text-teal-400 mb-6">Cricket Match Toss</h2>

      <div className="flex flex-col md:flex-row gap-6 mb-4">
        <div className="flex flex-col">
          <label className="font-medium mb-2 text-gray-400">Team A Name:</label>
          <input 
            type="text" 
            value={teamA} 
            onChange={(e) => setTeamA(e.target.value)} 
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-2 text-gray-400">Team B Name:</label>
          <input 
            type="text" 
            value={teamB} 
            onChange={(e) => setTeamB(e.target.value)} 
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div className="flex items-center mb-6">
        <label className="font-medium mr-2 text-gray-400">{teamA} chooses:</label>
        <select 
          value={teamAChoice} 
          onChange={(e) => setTeamAChoice(e.target.value)} 
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="heads">Heads</option>
          <option value="tails">Tails</option>
        </select>
      </div>

      <button 
        className={`px-6 py-3 text-lg font-semibold rounded-md shadow-md ${
          isSpinning ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`} 
        onClick={handleToss} 
        disabled={isSpinning}
      >
        {isSpinning ? 'Spinning...' : 'Toss the Coin'}
      </button>

      <div className={`mt-10 w-40 h-40 ${isSpinning ? 'animate-spin-slow' : ''}`}>
        {result && (
          <img 
            src={result === 'heads' 
              ? {Head}
              : {Tail}}
            alt={result} 
            className="w-full h-full rounded-full shadow-lg"
          />
        )}
        {/* <img className='h-20 w-20' src={Head}></img> */}
      </div>

      {result && (
        <div className="mt-6 text-center">
          <h3 className="text-2xl font-bold text-gray-400">Result: {result.toUpperCase()}</h3>
          <h2 className="text-xl font-semibold text-blue-500 mt-2">{winner} wins the toss!</h2>
        </div>
      )}
    </div>
  );
};

export default Toss;

// import React, { useState, useEffect } from 'react';
// // import './Scorecard.css';

// const Scorecard = (props) => {
//   const { scorecard } = props;
//   const [selectedTeam, setSelectedTeam] = useState(1); // 1 for team 1, 2 for team 2
  
//   // Extract team names for easier reference
//   const team1Name = scorecard?.scoreCard?.[0]?.batTeamDetails?.batTeamName || "Team 1";
//   const team2Name = scorecard?.scoreCard?.[1]?.batTeamDetails?.batTeamName || "Team 2";

//   // Extract innings data
//   let innings1extras = scorecard?.scoreCard?.[0]?.extrasData;
//   let innings2extras = scorecard?.scoreCard?.[1]?.extrasData;
//   let innings3extras = scorecard?.scoreCard?.[2]?.extrasData;
//   let innings4extras = scorecard?.scoreCard?.[3]?.extrasData;

//   // Format inning scores
//   let innings1Score = scorecard?.scoreCard?.[0]?.scoreDetails ? 
//     `${scorecard.scoreCard[0].scoreDetails.runs}/${scorecard.scoreCard[0].scoreDetails.wickets} (${scorecard.scoreCard[0].scoreDetails.overs} overs)` : 
//     "No score";
    
//   let innings2Score = scorecard?.scoreCard?.[2]?.scoreDetails ? 
//     `${scorecard.scoreCard[2].scoreDetails.runs}/${scorecard.scoreCard[2].scoreDetails.wickets} (${scorecard.scoreCard[2].scoreDetails.overs} overs)` : 
//     "No score";
    
//   let innings3Score = scorecard?.scoreCard?.[1]?.scoreDetails ? 
//     `${scorecard.scoreCard[1].scoreDetails.runs}/${scorecard.scoreCard[1].scoreDetails.wickets} (${scorecard.scoreCard[1].scoreDetails.overs} overs)` : 
//     "No score";
    
//   let innings4Score = scorecard?.scoreCard?.[3]?.scoreDetails ? 
//     `${scorecard.scoreCard[3].scoreDetails.runs}/${scorecard.scoreCard[3].scoreDetails.wickets} (${scorecard.scoreCard[3].scoreDetails.overs} overs)` : 
//     "No score";

//   // Extract batsmen data
//   const innings1batsmenDataObj = scorecard?.scoreCard?.[0]?.batTeamDetails?.batsmenData;
//   const innings2batsmenDataObj = scorecard?.scoreCard?.[1]?.batTeamDetails?.batsmenData;
//   const innings3batsmenDataObj = scorecard?.scoreCard?.[2]?.batTeamDetails?.batsmenData;
//   const innings4batsmenDataObj = scorecard?.scoreCard?.[3]?.batTeamDetails?.batsmenData;

//   // Extract bowler data
//   const innings1bowlerDataObj = scorecard?.scoreCard?.[0]?.bowlTeamDetails?.bowlersData;
//   const innings2bowlerDataObj = scorecard?.scoreCard?.[1]?.bowlTeamDetails?.bowlersData;
//   const innings3bowlerDataObj = scorecard?.scoreCard?.[2]?.bowlTeamDetails?.bowlersData;
//   const innings4bowlerDataObj = scorecard?.scoreCard?.[3]?.bowlTeamDetails?.bowlersData;

//   // Extract wickets data
//   const innings1WicketDataObj = scorecard?.scoreCard?.[0]?.wicketsData;
//   const innings2WicketDataObj = scorecard?.scoreCard?.[1]?.wicketsData;
//   const innings3WicketDataObj = scorecard?.scoreCard?.[2]?.wicketsData;
//   const innings4WicketDataObj = scorecard?.scoreCard?.[3]?.wicketsData;

//   // Convert data objects to arrays for mapping
//   const innings1batsmenDataArr = innings1batsmenDataObj ? Object.entries(innings1batsmenDataObj) : null;
//   const innings2batsmenDataArr = innings2batsmenDataObj ? Object.entries(innings2batsmenDataObj) : null;
//   const innings3batsmenDataArr = innings3batsmenDataObj ? Object.entries(innings3batsmenDataObj) : null;
//   const innings4batsmenDataArr = innings4batsmenDataObj ? Object.entries(innings4batsmenDataObj) : null;

//   const innings1bowlersDataArr = innings1bowlerDataObj ? Object.entries(innings1bowlerDataObj) : null;
//   const innings2bowlersDataArr = innings2bowlerDataObj ? Object.entries(innings2bowlerDataObj) : null;
//   const innings3bowlersDataArr = innings3bowlerDataObj ? Object.entries(innings3bowlerDataObj) : null;
//   const innings4bowlersDataArr = innings4bowlerDataObj ? Object.entries(innings4bowlerDataObj) : null;

//   const innings1WicketsDataArr = innings1WicketDataObj ? Object.entries(innings1WicketDataObj) : null;
//   const innings2WicketsDataArr = innings2WicketDataObj ? Object.entries(innings2WicketDataObj) : null;
//   const innings3WicketsDataArr = innings3WicketDataObj ? Object.entries(innings3WicketDataObj) : null;
//   const innings4WicketsDataArr = innings4WicketDataObj ? Object.entries(innings4WicketDataObj) : null;

//   // Sort arrays for proper display
//   const sortBatsmen = (array) => {
//     if (!array) return null;
    
//     return [...array].sort((a, b) => {
//       let batA = parseInt(a[0].replace("bat_", ""));
//       let batB = parseInt(b[0].replace("bat_", ""));
//       if (batA < batB) return -1;
//       if (batA > batB) return 1;
//       return 0; 
//     });
//   };

//   const sortWickets = (array) => {
//     if (!array) return null;
    
//     return [...array].sort((a, b) => {
//       let wktA = parseInt(a[0].replace("wkt_", ""));
//       let wktB = parseInt(b[0].replace("wkt_", ""));
//       if (wktA < wktB) return -1;
//       if (wktA > wktB) return 1;
//       return 0;
//     });
//   };

//   // Sort all arrays
//   const sortedInnings1Batsmen = sortBatsmen(innings1batsmenDataArr);
//   const sortedInnings2Batsmen = sortBatsmen(innings2batsmenDataArr);
//   const sortedInnings3Batsmen = sortBatsmen(innings3batsmenDataArr);
//   const sortedInnings4Batsmen = sortBatsmen(innings4batsmenDataArr);

//   const sortedInnings1Wickets = sortWickets(innings1WicketsDataArr);
//   const sortedInnings2Wickets = sortWickets(innings2WicketsDataArr);
//   const sortedInnings3Wickets = sortWickets(innings3WicketsDataArr);
//   const sortedInnings4Wickets = sortWickets(innings4WicketsDataArr);

//   useEffect(() => {
//     // Add some animation for tabs
//     const tabs = document.querySelectorAll('.team-selector button');
//     tabs.forEach(tab => {
//       tab.addEventListener('click', function() {
//         tabs.forEach(t => t.classList.remove('active'));
//         this.classList.add('active');
//       });
//     });
//   }, []);

//   const renderBatsmenTable = (batsmenArray, extras, score) => {
//     if (!batsmenArray) return <div className="no-data">No batting data available</div>;
    
//     const didNotBat = batsmenArray.filter(item => item[1]?.outDesc === "");
    
//     return (
//       <div className=" bg-[#1e293b] mt-5 rounded-lg mb-5 shadow ml-5 mr-5 ring-2 ring-yellow-400 border-5 border-gray">
//         <div className=" bg-[#1e293b] w-100 rounded  ">
//           <div><p>Batter</p></div>
//           <div>
//             <p>R</p>
//             <p>B</p>
//             <p>4s</p>
//             <p>6s</p>
//             <p>SR</p>
//           </div>
//         </div>

//         {batsmenArray.filter(item => item[1]?.outDesc !== "").map((item) => (
//           <div className="players" key={item[0]}>
//             <div>
//               <div className="batter-name"><p>{item[1]?.batName}</p></div>
//               <div className="player-status"><p>{item[1]?.outDesc}</p></div>
//             </div>
//             <div className='color'>
//               <p>{item[1]?.runs}</p>
//               <p>{item[1]?.balls}</p>
//               <p>{item[1]?.fours}</p>
//               <p>{item[1]?.sixes}</p>
//               <p>{item[1]?.strikeRate}</p>
//             </div>
//           </div>
//         ))}

//         <div className="players extras">
//           <div>
//             <div className="batter-name"><p>Extras </p></div>
//           </div>
//           <div>
//             <p className='color'>
//               {extras?.total} (b {extras?.byes}, lb {extras?.legByes}, w {extras?.wides}, 
//               nb {extras?.noBalls}, p {extras?.penalty})
//             </p>
//           </div>
//         </div>
        
//         <div className="players total">
//           <div>
//             <div className="batter-name color"><p>Total </p></div>
//           </div>
//           <div className='color'>
//             <p>{score}</p>
//           </div>
//         </div>

//         {didNotBat.length > 0 && (
//           <div className="players yet-to-bat">
//             <div className="did-not-bat">
//               <div className="batter-name ">
//                 <p>{scorecard?.isMatchComplete ? "Did not bat" : "Yet to bat"}</p>
//               </div>
//               <div className="player-status yet-to-bat-names ">
//                 {didNotBat.map((item) => (
//                   <p key={item[0]}>{item[1]?.batName}</p>
//                 ))}
//               </div>
//             </div>
//             <br /><br />
//           </div>
//         )}
//       </div>
//     );
//   };

//   const renderWicketsFall = (wicketsArray) => {
//     if (!wicketsArray || wicketsArray.length === 0) return <div className="no-data">No wickets data available</div>;
    
//     return (
//       <div className=' bg-gray-200 mt-5 rounded-lg mb-5 shadow ml-5 mr-5 border-5 border-gray'>
//         <div className="batters bg-gradient-to-b from-gray-950  to-gray-600 w-100 rounded ring-1 ring-gray-400 ">
//           <p>Fall of wickets</p>
//         </div>
//         <div className="fow-container">
//           <div className="fall-of-wickets">
//             <div className="batter-name wicket-fall">
//               {wicketsArray.map((item) => (
//                 <span key={item[0]} className="wicket-item">
//                   <p className="wicket-score ">{item[1]?.wktRuns}-{item[1]?.wktNbr}</p>
//                   <p className="wicket-player">{item[1]?.batName}</p>
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderBowlersTable = (bowlersArray) => {
//     if (!bowlersArray) return <div className="no-data">No bowling data available</div>;
    
//     return (
//       <div className=" fall-header bg-gray-100 mt-5 rounded-lg mb-5 shadow ml-5 mr-5 ring-2 ring-yellow-400 border-5 border-gray">
//         <div className="batters bg-gradient-to-b from-gray-950  to-gray-600 w-100 rounded ring-1 ring-gray-400 ">
//           <div><p>Bowler</p></div>
//           <div>
//             <p>O</p>
//             <p>M</p>
//             <p>R</p>
//             <p>W</p>
//             <p>NB</p>
//             <p>WD</p>
//             <p>ECO</p>
//           </div>
//         </div>

//         {bowlersArray.map((item) => (
//           <div key={item[0]} className="bowlers">
//             <div className='color'>
//               <p>{item[1]?.bowlName}</p>
//             </div>
//             <div className='color'>
//               <p>{item[1]?.overs}</p>
//               <p>{item[1]?.maidens}</p>
//               <p>{item[1]?.runs}</p>
//               <p>{item[1]?.wickets}</p>
//               <p>{item[1]?.no_balls}</p>
//               <p>{item[1]?.wides}</p>
//               <p>{item[1]?.economy}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   const renderTeam1Scorecard = () => {
//     return (
//       <div className="team-scorecard animate-fade-in">
//         <div className="team-name">
//           <p>{team1Name} - Innings</p>
//           <p>{innings1Score}</p>
//         </div>
//         {renderBatsmenTable(sortedInnings1Batsmen, innings1extras, innings1Score)}
//         {renderWicketsFall(sortedInnings1Wickets)}
//         {renderBowlersTable(innings1bowlersDataArr)}
        
//         {/* Second innings for Team 1 if available */}
//         {scorecard?.scoreCard?.[2] && (
//           <div className="second-innings">
//             <div className="team-name">
//               <p>{team1Name} - 2nd Innings</p>
//               <p>{innings2Score}</p>
//             </div>
//             {renderBatsmenTable(sortedInnings3Batsmen, innings3extras, innings2Score)}
//             {renderWicketsFall(sortedInnings3Wickets)}
//             {renderBowlersTable(innings3bowlersDataArr)}
//           </div>
//         )}
//       </div>
//     );
//   };

//   const renderTeam2Scorecard = () => {
//     if (!scorecard?.scoreCard?.[1]) {
//       return <div className="no-scorecard">Team 2 innings not started yet</div>;
//     }
    
//     return (
//       <div className="team-scorecard animate-fade-in">
//         <div className="team-name">
//           <p>{team2Name} - Innings</p>
//           <p>{innings3Score}</p>
//         </div>
//         {renderBatsmenTable(sortedInnings2Batsmen, innings2extras, innings3Score)}
//         {renderWicketsFall(sortedInnings2Wickets)}
//         {renderBowlersTable(innings2bowlersDataArr)}
        
//         {/* Second innings for Team 2 if available */}
//         {scorecard?.scoreCard?.[3] && (
//           <div className="second-innings">
//             <div className="team-name">
//               <p>{team2Name} - 2nd Innings</p>
//               <p>{innings4Score}</p>
//             </div>
//             {renderBatsmenTable(sortedInnings4Batsmen, innings4extras, innings4Score)}
//             {renderWicketsFall(sortedInnings4Wickets)}
//             {renderBowlersTable(innings4bowlersDataArr)}
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="scorecard-container">
//       <div className="match-status">
//         <p>{scorecard?.status || "Match information unavailable"}</p>
//       </div>
      
//       <div className="team-selector">
//         <button 
//           className={`team-btn ${selectedTeam === 1 ? 'active' : ''}`} 
//           onClick={() => setSelectedTeam(1)}
//         >
//           {team1Name}
//         </button>
//         <button 
//           className={`team-btn ${selectedTeam === 2 ? 'active' : ''}`} 
//           onClick={() => setSelectedTeam(2)}
//         >
//           {team2Name}
//         </button>
//       </div>
      
//       <div className="scorecard-content">
//         {!scorecard?.scoreCard?.[0] ? (
//           <div className="no-scorecard">
//             <p>Match is Starting Soon...</p>
//           </div>
//         ) : (
//           selectedTeam === 1 ? renderTeam1Scorecard() : renderTeam2Scorecard()
//         )}
//       </div>
//     </div>
//   );
// };

// export default Scorecard;




import React, { useState } from 'react';

const Scorecard = ({ scorecard }) => {
  const [selectedTeam, setSelectedTeam] = useState(1);

  const team1Name = scorecard?.scoreCard?.[0]?.batTeamDetails?.batTeamName || "Team 1";
  const team2Name = scorecard?.scoreCard?.[1]?.batTeamDetails?.batTeamName || "Team 2";

  const inningsData = scorecard?.scoreCard || [];

  const formatScore = (inning) =>
    inning?.scoreDetails
      ? `${inning.scoreDetails.runs}/${inning.scoreDetails.wickets} (${inning.scoreDetails.overs} overs)`
      : "No score";

  const renderBatsmenTable = (batsmenArray, extras, score) => (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="flex justify-between border-b border-gray-600 pb-2 mb-2">
        <p className="text-white">Batter</p>
        <div className="flex gap-4 text-gray-300">
          <p>R</p> <p>B</p> <p>4s</p> <p>6s</p> <p>SR</p>
        </div>
      </div>
      {batsmenArray?.map(([key, batsman]) => (
        <div key={key} className="flex justify-between py-2 border-b border-gray-700">
          <p className="text-white">{batsman.batName}</p>
          <div className="flex gap-4 text-gray-400">
            <p>{batsman.runs}</p> <p>{batsman.balls}</p> <p>{batsman.fours}</p>
            <p>{batsman.sixes}</p> <p>{batsman.strikeRate}</p>
          </div>
        </div>
      ))}
      <div className="flex justify-between mt-2 text-gray-400">
        <p>Extras</p>
        <p>{extras?.total} (b {extras?.byes}, lb {extras?.legByes}, w {extras?.wides}, nb {extras?.noBalls})</p>
      </div>
      <div className="flex justify-between mt-2 text-white font-bold">
        <p>Total</p>
        <p>{score}</p>
      </div>
    </div>
  );

  const renderBowlersTable = (bowlersArray) => (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="flex justify-between border-b border-gray-600 pb-2 mb-2">
        <p className="text-white">Bowler</p>
        <div className="flex gap-4 text-gray-300">
          <p>O</p> <p>M</p> <p>R</p> <p>W</p> <p>NB</p> <p>WD</p> <p>ECO</p>
        </div>
      </div>
      {bowlersArray?.map(([key, bowler]) => (
        <div key={key} className="flex justify-between py-2 border-b border-gray-700">
          <p className="text-white">{bowler.bowlName}</p>
          <div className="flex gap-4 text-gray-400">
            <p>{bowler.overs}</p> <p>{bowler.maidens}</p> <p>{bowler.runs}</p>
            <p>{bowler.wickets}</p> <p>{bowler.no_balls}</p> <p>{bowler.wides}</p>
            <p>{bowler.economy}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <div className="text-center text-white text-lg mb-4">
        {scorecard?.status || "Match information unavailable"}
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <button 
          className={`px-4 py-2 rounded-lg transition ${selectedTeam === 1 ? 'bg-white text-black' : 'bg-gray-700 text-white'}`} 
          onClick={() => setSelectedTeam(1)}
        >
          {team1Name}
        </button>
        <button 
          className={`px-4 py-2 rounded-lg transition ${selectedTeam === 2 ? 'bg-white text-black' : 'bg-gray-700 text-white'}`} 
          onClick={() => setSelectedTeam(2)}
        >
          {team2Name}
        </button>
      </div>

      <div className="space-y-6">
        {selectedTeam === 1 ? (
          <>
            <div className="text-lg text-white">{team1Name} - Innings</div>
            {renderBatsmenTable(Object.entries(inningsData[0]?.batTeamDetails?.batsmenData || {}), inningsData[0]?.extrasData, formatScore(inningsData[0]))}
            {renderBowlersTable(Object.entries(inningsData[1]?.bowlTeamDetails?.bowlersData || {}))}
          </>
        ) : (
          <>
            <div className="text-lg text-white">{team2Name} - Innings</div>
            {renderBatsmenTable(Object.entries(inningsData[1]?.batTeamDetails?.batsmenData || {}), inningsData[1]?.extrasData, formatScore(inningsData[1]))}
            {renderBowlersTable(Object.entries(inningsData[0]?.bowlTeamDetails?.bowlersData || {}))}
          </>
        )}
      </div>
    </div>
  );
};

export default Scorecard;



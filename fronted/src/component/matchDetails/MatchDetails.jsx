// import React, { useEffect, useState } from 'react'
// import './matchDetails.css'
// import { useParams } from 'react-router-dom';
// import { fetchCommentary } from "../../redux/Reducers/commentarySlice"
// import { fetchScorecard } from "../../redux/Reducers/scorecardSlice"
// import { fetchMatchInfo } from "../../redux/Reducers/matchInfoSlice"
// import Overview from './Overview';
// import Scorecard from './Scorecard';
// import { useDispatch, useSelector } from 'react-redux';
// import Squads from './Squads';
// import Commentary from './Commentary';
// import Loader from '../Loader/Loader.jsx';
// import Error from '../Error/Error.jsx';


// const MatchDetails = () => {
//   const [overview, setOverview] = useState(true)
//   const [scorecardActive, setScorecardActive] = useState(false)
//   const [squad, setSquad] = useState(false)
//   let { matchId } = useParams();
//   const { commentary, loading, rejected } = useSelector((state) => state?.commentary);
//   const { scorecard } = useSelector((state) => state?.scorecard);
//   const { matchInfo } = useSelector((state) => state?.matchInfo?.matchInfo);
//   const { venueInfo } = useSelector((state) => state?.matchInfo?.matchInfo);
//   const dispatch = useDispatch();
//   let commentaryList = commentary.commentaryList;

//   let matchStartTimeDateEpoch = commentary?.matchHeader?.matchStartTimestamp;
//   let matchStartTimeDate = new Date(matchStartTimeDateEpoch);

//   let team1ScoreObj = {
//     teamName: scorecard?.scoreCard?.[0]?.batTeamDetails?.batTeamName,
//     teamShortName: scorecard?.scoreCard?.[0]?.batTeamDetails?.batTeamShortName,
//     innings1Runs: scorecard?.scoreCard?.[0]?.scoreDetails?.runs,
//     innings1Wickets: scorecard?.scoreCard?.[0]?.scoreDetails?.wickets,
//     innings1Overs: scorecard?.scoreCard?.[0]?.scoreDetails?.overs
//   }
//   let team2ScoreObj = {
//     teamName: scorecard?.scoreCard?.[1]?.batTeamDetails?.batTeamName,
//     teamShortName: scorecard?.scoreCard?.[1]?.batTeamDetails?.batTeamShortName,
//     innings1Runs: scorecard?.scoreCard?.[1]?.scoreDetails?.runs,
//     innings1Wickets: scorecard?.scoreCard?.[1]?.scoreDetails?.wickets,
//     innings1Overs: scorecard?.scoreCard?.[1]?.scoreDetails?.overs
//   }

//   // if match is a test match then there are going to be total 4 inings and the 3rd and 4th innings can be interchanged in case of a follow on
//   // hence checking if team name of 1st innings matches to innings 3 or 4   
//   if (scorecard?.scoreCard?.[0]?.batTeamDetails?.batTeamShortName === scorecard?.scoreCard?.[2]?.batTeamDetails?.batTeamShortName) {
//     team1ScoreObj = {
//       ...team1ScoreObj,
//       innings2Runs: scorecard?.scoreCard?.[2]?.scoreDetails?.runs,
//       innings2Wickets: scorecard?.scoreCard?.[2]?.scoreDetails?.wickets,
//       innings2Overs: scorecard?.scoreCard?.[2]?.scoreDetails?.overs,
//     }
//   }
//   if (scorecard?.scoreCard?.[0]?.batTeamDetails?.batTeamShortName === scorecard?.scoreCard?.[3]?.batTeamDetails?.batTeamShortName) {
//     team1ScoreObj = {
//       ...team1ScoreObj,
//       innings2Runs: scorecard?.scoreCard?.[3]?.scoreDetails?.runs,
//       innings2Wickets: scorecard?.scoreCard?.[3]?.scoreDetails?.wickets,
//       innings2Overs: scorecard?.scoreCard?.[3]?.scoreDetails?.overs,
//     }
//   }

//   if (scorecard?.scoreCard?.[1]?.batTeamDetails?.batTeamId === scorecard?.scoreCard?.[2]?.batTeamDetails?.batTeamId) {
//     team2ScoreObj = {
//       ...team2ScoreObj,
//       innings2Runs: scorecard?.scoreCard?.[2]?.scoreDetails?.runs,
//       innings2Wickets: scorecard?.scoreCard?.[2]?.scoreDetails?.wickets,
//       innings2Overs: scorecard?.scoreCard?.[2]?.scoreDetails?.overs,
//     }
//   }
//   if (scorecard?.scoreCard?.[1]?.batTeamDetails?.batTeamId === scorecard?.scoreCard?.[3]?.batTeamDetails?.batTeamId) {
//     team2ScoreObj = {
//       ...team2ScoreObj,
//       innings2Runs: scorecard?.scoreCard?.[3]?.scoreDetails?.runs,
//       innings2Wickets: scorecard?.scoreCard?.[3]?.scoreDetails?.wickets,
//       innings2Overs: scorecard?.scoreCard?.[3]?.scoreDetails?.overs,
//     }
//   }



//   // useEffect(() => {
//   //   dispatch(fetchCommentary(matchId));
//   //   dispatch(fetchScorecard(matchId));
//   //   dispatch(fetchMatchInfo(matchId));

//   // }, [dispatch, matchId])

//   const activeOption1 = () => {
//     setOverview(true);
//     setScorecardActive(false);
//     setSquad(false);
//   }

//   const activeOption2 = () => {
//     setOverview(false);
//     setScorecardActive(true);
//     setSquad(false);
//   }

//   const activeOption3 = () => {
//     setOverview(false);
//     setScorecardActive(false);
//     setSquad(true);
//   }


//   return (
//     <>
//       {
//         loading ? <Loader />
//           :
//           <>
//             {
//               rejected ? <Error />
//                 :
//                 <div className='match-details-container '>
//                   <div className="scorecard-header bg-gradient-to-b from-gray-800 to-gray-950 text-whitep-6 rounded-t-lg shadow-lg w-full" >
//                     <h1>{commentary?.matchHeader?.team1?.name} vs {commentary?.matchHeader?.team2?.name}, {commentary?.matchHeader?.matchDescription}
//                       {commentary?.matchHeader?.complete === false ? <span > - Live Score</span> : <span> Scorecard</span>}
//                     </h1>

//                     <div>
//                       <p>Series: {commentary?.matchHeader?.seriesName}</p>
//                       <p>Venue: {venueInfo?.ground}, {venueInfo?.city} </p>
//                       <p>Date & Time : {`${matchStartTimeDate.toLocaleString()}`}</p>
//                     </div>
//                   </div>
//                   <div className="container">
//                     <div className="scorecard">

//                       <div className="options">
//                         <span onClick={activeOption1} className={overview === true ? 'active' : ''}><p>Overview</p></span>
//                         <span onClick={activeOption2} className={scorecardActive === true ? 'active' : ''}><p>Scorecard</p></span>
//                         <span onClick={activeOption3} className={squad === true ? 'active' : ''}><p>Squads</p></span>
//                       </div>

//                       {overview && <Overview commentary={commentary} scorecard={scorecard} team1ScoreObj={team1ScoreObj} team2ScoreObj={team2ScoreObj} />}
//                       {scorecardActive && <Scorecard scorecard={scorecard} />}
//                       {squad && <Squads matchInfo={matchInfo} />}

//                     </div>


//                     <div className="commentary">
//                       <h1>Commentary</h1>
//                       {
//                         commentaryList && commentaryList.map((commentaryList) => (
//                           <Commentary key={commentaryList?.timestamp} commentaryList={commentaryList} />
//                         ))
//                       }
//                     </div>
//                   </div>

//                 </div>
//             }
//           </>

//       }
//     </>
//   )
// }

// export default MatchDetails;


// import React, { useState, useEffect } from 'react';

// const MatchDetails = () => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [loading, setLoading] = useState(true);
//   const [matchData, setMatchData] = useState({
//     commentary: {
//       matchHeader: {
//         team1: { name: "Chennai Super Kings" },
//         team2: { name: "Mumbai Indians" },
//         matchDescription: "IPL 2025, Match 23",
//         complete: false,
//         seriesName: "Indian Premier League 2025"
//       },
//       commentaryList: [
//         {
//           timestamp: 1708788620000,
//           overNumber: 18.2,
//           commentaryText: "FOUR! Pollard smashes it through the covers for a boundary.",
//           event: "BOUNDARY"
//         },
//         {
//           timestamp: 1708788580000,
//           overNumber: 18.1,
//           commentaryText: "Pollard takes a single, rotating the strike.",
//           event: "NORMAL"
//         },
//         {
//           timestamp: 1708788540000,
//           overNumber: 17.6,
//           commentaryText: "WICKET! Jadeja gets Sharma caught at long-on! Big breakthrough for CSK.",
//           event: "WICKET"
//         }
//       ]
//     },
//     scorecard: {
//       scoreCard: [
//         {
//           batTeamDetails: {
//             batTeamName: "Mumbai Indians",
//             batTeamShortName: "MI"
//           },
//           scoreDetails: {
//             runs: 162,
//             wickets: 6,
//             overs: 20.0
//           }
//         },
//         {
//           batTeamDetails: {
//             batTeamName: "Chennai Super Kings",
//             batTeamShortName: "CSK"
//           },
//           scoreDetails: {
//             runs: 187,
//             wickets: 4,
//             overs: 18.2
//           }
//         }
//       ]
//     },
//     matchInfo: {
//       teams: {
//         home: {
//           players: [
//             { name: "MS Dhoni", captain: true, role: "Wicket Keeper" },
//             { name: "R Jadeja", role: "All Rounder" },
//             { name: "D Chahar", role: "Bowler" }
//           ]
//         },
//         away: {
//           players: [
//             { name: "R Sharma", captain: true, role: "Batsman" },
//             { name: "K Pollard", role: "All Rounder" },
//             { name: "J Bumrah", role: "Bowler" }
//           ]
//         }
//       }
//     },
//     venueInfo: {
//       ground: "M.A. Chidambaram Stadium",
//       city: "Chennai"
//     }
//   });

//   // Mock fetch function to simulate API call
//   const fetchData = () => {
//     setTimeout(() => {
//       setLoading(false);
//     }, 1000);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Calculate match date
//   const matchStartTimeDateEpoch = 1708788000000; // Example timestamp
//   const matchStartTimeDate = new Date(matchStartTimeDateEpoch);

//   // Prepare team score objects
//   const team1ScoreObj = {
//     teamName: matchData.scorecard.scoreCard[0].batTeamDetails.batTeamName,
//     teamShortName: matchData.scorecard.scoreCard[0].batTeamDetails.batTeamShortName,
//     innings1Runs: matchData.scorecard.scoreCard[0].scoreDetails.runs,
//     innings1Wickets: matchData.scorecard.scoreCard[0].scoreDetails.wickets,
//     innings1Overs: matchData.scorecard.scoreCard[0].scoreDetails.overs
//   };

//   const team2ScoreObj = {
//     teamName: matchData.scorecard.scoreCard[1].batTeamDetails.batTeamName,
//     teamShortName: matchData.scorecard.scoreCard[1].batTeamDetails.batTeamShortName,
//     innings1Runs: matchData.scorecard.scoreCard[1].scoreDetails.runs,
//     innings1Wickets: matchData.scorecard.scoreCard[1].scoreDetails.wickets,
//     innings1Overs: matchData.scorecard.scoreCard[1].scoreDetails.overs
//   };

//   // Header component 
//   const MatchHeader = () => {
//     return (
//       <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-6 rounded-t-lg shadow-lg">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
//           <div>
//             <h1 className="text-2xl font-bold">
//               {matchData.commentary.matchHeader.team1.name} vs {matchData.commentary.matchHeader.team2.name}
//             </h1>
//             <p className="text-lg opacity-90">{matchData.commentary.matchHeader.matchDescription}</p>
//           </div>
          
//           {matchData.commentary.matchHeader.complete === false ? (
//             <span className="mt-2 md:mt-0 px-3 py-1 bg-red-600 rounded-full text-sm font-bold animate-pulse flex items-center">
//               <span className="h-2 w-2 bg-white rounded-full mr-2 animate-ping"></span>
//               LIVE
//             </span>
//           ) : (
//             <span className="mt-2 md:mt-0 px-3 py-1 bg-gray-700 rounded-full text-sm">
//               Completed
//             </span>
//           )}
//         </div>
        
//         <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm opacity-90">
//           <div className="flex items-center">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//             </svg>
//             <span>Series: {matchData.commentary.matchHeader.seriesName}</span>
//           </div>
//           <div className="flex items-center">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//             </svg>
//             <span>Venue: {matchData.venueInfo.ground}, {matchData.venueInfo.city}</span>
//           </div>
//           <div className="flex items-center">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//             </svg>
//             <span>{matchStartTimeDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Tabs component
//   const TabNavigation = () => {
//     return (
//       <div className="bg-white border-b">
//         <div className="flex overflow-x-auto">
//           {['overview', 'scorecard', 'squads'].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`px-6 py-4 font-medium transition-colors duration-200 whitespace-nowrap ${
//                 activeTab === tab
//                   ? 'text-blue-600 border-b-2 border-blue-600'
//                   : 'text-gray-600 hover:text-blue-500'
//               }`}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//             </button>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   // Component for Overview tab
//   const Overview = () => {
//     return (
//       <div className="p-6">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <div className="bg-white rounded-lg shadow-md overflow-hidden">
//             <div className="bg-gray-50 p-4 border-b">
//               <h3 className="font-bold text-gray-700">Match Summary</h3>
//             </div>
//             <div className="p-4">
//               <div className="space-y-6">
//                 <div className="relative">
//                   <div className="flex justify-between items-center mb-4">
//                     <div className="flex items-center">
//                       <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
//                         {team1ScoreObj.teamShortName}
//                       </div>
//                       <div className="ml-3">
//                         <h4 className="font-bold">{team1ScoreObj.teamName}</h4>
//                       </div>
//                     </div>
//                     <div className="text-2xl font-bold">
//                       {team1ScoreObj.innings1Runs}/{team1ScoreObj.innings1Wickets}
//                       <span className="text-sm text-gray-500 ml-2">
//                         ({team1ScoreObj.innings1Overs} ov)
//                       </span>
//                     </div>
//                   </div>
                  
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center">
//                       <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-bold">
//                         {team2ScoreObj.teamShortName}
//                       </div>
//                       <div className="ml-3">
//                         <h4 className="font-bold">{team2ScoreObj.teamName}</h4>
//                       </div>
//                     </div>
//                     <div className="text-2xl font-bold">
//                       {team2ScoreObj.innings1Runs}/{team2ScoreObj.innings1Wickets}
//                       <span className="text-sm text-gray-500 ml-2">
//                         ({team2ScoreObj.innings1Overs} ov)
//                       </span>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="mt-6 pt-6 border-t">
//                   <div className="text-sm text-gray-600">
//                     {matchData.commentary.matchHeader.complete 
//                       ? `${team1ScoreObj.innings1Runs > team2ScoreObj.innings1Runs 
//                           ? team1ScoreObj.teamName 
//                           : team2ScoreObj.teamName} won by ${Math.abs(team1ScoreObj.innings1Runs - team2ScoreObj.innings1Runs)} runs`
//                       : "Match in progress"
//                     }
//                   </div>
//                   <div className="bg-blue-50 p-3 rounded-lg mt-4">
//                     <p className="text-blue-700 text-sm">
//                       {matchData.commentary.matchHeader.complete
//                         ? "Match completed"
//                         : `${team2ScoreObj.teamName} needs ${team1ScoreObj.innings1Runs - team2ScoreObj.innings1Runs + 1} more runs to win`
//                       }
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-lg shadow-md overflow-hidden">
//             <div className="bg-gray-50 p-4 border-b">
//               <h3 className="font-bold text-gray-700">Recent Highlights</h3>
//             </div>
//             <div className="divide-y">
//               {matchData.commentary.commentaryList.map((comment, index) => (
//                 <div 
//                   key={index} 
//                   className={`p-4 ${
//                     comment.event === 'WICKET' 
//                       ? 'bg-red-50' 
//                       : comment.event === 'BOUNDARY' 
//                         ? 'bg-blue-50' 
//                         : ''
//                   }`}
//                 >
//                   <div className="flex justify-between mb-1">
//                     <span className="font-medium text-gray-800">Over {comment.overNumber}</span>
//                     <span className="text-sm text-gray-500">
//                       {new Date(comment.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                     </span>
//                   </div>
//                   <p className={`text-sm ${
//                     comment.event === 'WICKET' 
//                       ? 'text-red-700' 
//                       : comment.event === 'BOUNDARY' 
//                         ? 'text-blue-700' 
//                         : 'text-gray-600'
//                   }`}>
//                     {comment.commentaryText}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Component for Scorecard tab
//   const Scorecard = () => {
//     return (
//       <div className="p-6">
//         {matchData.scorecard.scoreCard.map((inning, index) => (
//           <div key={index} className="mb-8">
//             <div className="bg-gray-50 p-4 rounded-t-lg border border-gray-200">
//               <div className="flex items-center justify-between">
//                 <h3 className="font-bold text-gray-800">
//                   {inning.batTeamDetails.batTeamName} Innings
//                 </h3>
//                 <div className="text-xl font-bold">
//                   {inning.scoreDetails.runs}/{inning.scoreDetails.wickets}
//                   <span className="text-sm ml-2 text-gray-600">
//                     ({inning.scoreDetails.overs} ov)
//                   </span>
//                 </div>
//               </div>
//             </div>
            
//             <div className="bg-white rounded-b-lg shadow-md overflow-hidden border-x border-b border-gray-200">
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead>
//                     <tr className="bg-gray-50">
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batter</th>
//                       <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">R</th>
//                       <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">B</th>
//                       <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">4s</th>
//                       <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">6s</th>
//                       <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">SR</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     <tr>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Sample Player (not out)</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-medium">45</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">32</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">4</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">2</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">140.63</td>
//                     </tr>
//                     <tr className="bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Sample Player 2</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-medium">32</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">24</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">3</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">1</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">133.33</td>
//                     </tr>
//                   </tbody>
//                   <tfoot>
//                     <tr className="bg-gray-100">
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">TOTAL</td>
//                       <td colSpan="5" className="px-6 py-4 whitespace-nowrap text-sm font-bold">
//                         {inning.scoreDetails.runs}/{inning.scoreDetails.wickets}
//                         <span className="font-normal ml-2">
//                           ({inning.scoreDetails.overs} Overs)
//                         </span>
//                       </td>
//                     </tr>
//                   </tfoot>
//                 </table>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   // Component for Squads tab
//   const Squads = () => {
//     return (
//       <div className="p-6">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <div className="bg-white rounded-lg shadow-md overflow-hidden">
//             <div className="bg-blue-50 p-4 border-b border-blue-100">
//               <h3 className="font-bold text-blue-700">Chennai Super Kings</h3>
//               <p className="text-sm text-blue-600">Home Team</p>
//             </div>
//             <ul className="divide-y divide-gray-100">
//               {matchData.matchInfo.teams.home.players.map((player, index) => (
//                 <li key={index} className="p-4 hover:bg-gray-50">
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center">
//                       <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
//                         {player.name.split(' ').map(n => n[0]).join('')}
//                       </div>
//                       <div className="ml-3">
//                         <p className="text-sm font-medium text-gray-900">
//                           {player.name} {player.captain && <span className="text-blue-600 font-bold">(C)</span>}
//                         </p>
//                       </div>
//                     </div>
//                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                       {player.role}
//                     </span>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
          
//           <div className="bg-white rounded-lg shadow-md overflow-hidden">
//             <div className="bg-yellow-50 p-4 border-b border-yellow-100">
//               <h3 className="font-bold text-yellow-700">Mumbai Indians</h3>
//               <p className="text-sm text-yellow-600">Away Team</p>
//             </div>
//             <ul className="divide-y divide-gray-100">
//               {matchData.matchInfo.teams.away.players.map((player, index) => (
//                 <li key={index} className="p-4 hover:bg-gray-50">
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center">
//                       <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-bold">
//                         {player.name.split(' ').map(n => n[0]).join('')}
//                       </div>
//                       <div className="ml-3">
//                         <p className="text-sm font-medium text-gray-900">
//                           {player.name} {player.captain && <span className="text-yellow-600 font-bold">(C)</span>}
//                         </p>
//                       </div>
//                     </div>
//                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
//                       {player.role}
//                     </span>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Component for Commentary section
//   const CommentarySection = () => {
//     return (
//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="bg-gray-50 p-4 border-b border-gray-200">
//           <h3 className="font-bold text-gray-700 flex items-center">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
//             </svg>
//             Live Commentary
//           </h3>
//         </div>
//         <div className="h-full max-h-96 overflow-y-auto">
//           {matchData.commentary.commentaryList.map((comment, index) => (
//             <div 
//               key={index} 
//               className={`p-4 border-b ${
//                 comment.event === 'WICKET' 
//                   ? 'bg-red-50 border-red-100' 
//                   : comment.event === 'BOUNDARY' 
//                     ? 'bg-blue-50 border-blue-100' 
//                     : 'border-gray-100'
//               }`}
//             >
//               <div className="flex justify-between mb-1">
//                 <div className="flex items-center">
//                   <span className="font-medium text-gray-800">Over {comment.overNumber}</span>
//                   {comment.event === 'WICKET' && (
//                     <span className="ml-2 px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
//                       WICKET
//                     </span>
//                   )}
//                   {comment.event === 'BOUNDARY' && (
//                     <span className="ml-2 px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
//                       BOUNDARY
//                     </span>
//                   )}
//                 </div>
//                 <span className="text-xs text-gray-500">
//                   {new Date(comment.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                 </span>
//               </div>
//               <p className={`text-sm ${
//                 comment.event === 'WICKET' 
//                   ? 'text-red-700' 
//                   : comment.event === 'BOUNDARY' 
//                     ? 'text-blue-700' 
//                     : 'text-gray-600'
//               }`}>
//                 {comment.commentaryText}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   // Loading component
//   const LoadingState = () => {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-50">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600 mb-4"></div>
//           <p className="text-gray-700 font-medium">Loading match data...</p>
//         </div>
//       </div>
//     );
//   };

//   // Error component
//   const ErrorState = () => {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-50">
//         <div className="text-center p-8 bg-white rounded-lg shadow-lg">
//           <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-4">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//           </div>
//           <h2 className="text-xl font-bold text-red-600 mb-2">Error loading match data</h2>
//           <p className="text-gray-600 mb-4">We're experiencing some issues. Please try again later.</p>
//           <button 
//             onClick={() => window.location.reload()}
//             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//           >
//             Refresh
//           </button>
//         </div>
//       </div>
//     );
//   };

//   if (loading) {
//     return <LoadingState />;
//   }

//   // Show error state if data rejected
//   if (matchData === null) {
//     return <ErrorState />;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="max-w-7xl mx-auto px-4 py-6">
//         <MatchHeader />
        
//         <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
//             <TabNavigation />
            
//             <div className="tab-content">
//               {activeTab === 'overview' && <Overview />}
//               {activeTab === 'scorecard' && <Scorecard />}
//               {activeTab === 'squads' && <Squads />}
//             </div>
//           </div>
          
//           <div className="lg:col-span-1">
//             <CommentarySection />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MatchDetails;


import React, { useEffect, useState } from 'react';
import './matchDetails.css';
import { useParams } from 'react-router-dom';
import { fetchCommentary } from '../../redux/Reducers/commentarySlice';
import { fetchScorecard } from '../../redux/Reducers/scorecardSlice';
import { fetchMatchInfo } from '../../redux/Reducers/matchInfoSlice';
import Overview from './Overview';
import Scorecard from './Scorecard';
import { useDispatch, useSelector } from 'react-redux';
import Squads from './Squads';
import Commentary from './Commentary';
import Loader from '../Loader/Loader.jsx';
import Error from '../Error/Error.jsx';

const MatchDetails = () => {
  const [overview, setOverview] = useState(true);
  const [scorecardActive, setScorecardActive] = useState(false);
  const [squad, setSquad] = useState(false);
  let { matchId } = useParams();
  const { commentary, loading, rejected } = useSelector((state) => state?.commentary);
  const { scorecard } = useSelector((state) => state?.scorecard);
  const { matchInfo } = useSelector((state) => state?.matchInfo?.matchInfo);
  const { venueInfo } = useSelector((state) => state?.matchInfo?.matchInfo);
  const dispatch = useDispatch();
  let commentaryList = commentary?.commentaryList || [];

  let matchStartTimeDateEpoch = commentary?.matchHeader?.matchStartTimestamp;
  let matchStartTimeDate = new Date(matchStartTimeDateEpoch);

  let team1ScoreObj = {
    teamName: scorecard?.scoreCard?.[0]?.batTeamDetails?.batTeamName,
    teamShortName: scorecard?.scoreCard?.[0]?.batTeamDetails?.batTeamShortName,
    innings1Runs: scorecard?.scoreCard?.[0]?.scoreDetails?.runs,
    innings1Wickets: scorecard?.scoreCard?.[0]?.scoreDetails?.wickets,
    innings1Overs: scorecard?.scoreCard?.[0]?.scoreDetails?.overs,
  };
  let team2ScoreObj = {
    teamName: scorecard?.scoreCard?.[1]?.batTeamDetails?.batTeamName,
    teamShortName: scorecard?.scoreCard?.[1]?.batTeamDetails?.batTeamShortName,
    innings1Runs: scorecard?.scoreCard?.[1]?.scoreDetails?.runs,
    innings1Wickets: scorecard?.scoreCard?.[1]?.scoreDetails?.wickets,
    innings1Overs: scorecard?.scoreCard?.[1]?.scoreDetails?.overs,
  };

  // Handle test match innings
  if (scorecard?.scoreCard?.[0]?.batTeamDetails?.batTeamShortName === scorecard?.scoreCard?.[2]?.batTeamDetails?.batTeamShortName) {
    team1ScoreObj = {
      ...team1ScoreObj,
      innings2Runs: scorecard?.scoreCard?.[2]?.scoreDetails?.runs,
      innings2Wickets: scorecard?.scoreCard?.[2]?.scoreDetails?.wickets,
      innings2Overs: scorecard?.scoreCard?.[2]?.scoreDetails?.overs,
    };
  }
  if (scorecard?.scoreCard?.[0]?.batTeamDetails?.batTeamShortName === scorecard?.scoreCard?.[3]?.batTeamDetails?.batTeamShortName) {
    team1ScoreObj = {
      ...team1ScoreObj,
      innings2Runs: scorecard?.scoreCard?.[3]?.scoreDetails?.runs,
      innings2Wickets: scorecard?.scoreCard?.[3]?.scoreDetails?.wickets,
      innings2Overs: scorecard?.scoreCard?.[3]?.scoreDetails?.overs,
    };
  }

  if (scorecard?.scoreCard?.[1]?.batTeamDetails?.batTeamId === scorecard?.scoreCard?.[2]?.batTeamDetails?.batTeamId) {
    team2ScoreObj = {
      ...team2ScoreObj,
      innings2Runs: scorecard?.scoreCard?.[2]?.scoreDetails?.runs,
      innings2Wickets: scorecard?.scoreCard?.[2]?.scoreDetails?.wickets,
      innings2Overs: scorecard?.scoreCard?.[2]?.scoreDetails?.overs,
    };
  }
  if (scorecard?.scoreCard?.[1]?.batTeamDetails?.batTeamId === scorecard?.scoreCard?.[3]?.batTeamDetails?.batTeamId) {
    team2ScoreObj = {
      ...team2ScoreObj,
      innings2Runs: scorecard?.scoreCard?.[3]?.scoreDetails?.runs,
      innings2Wickets: scorecard?.scoreCard?.[3]?.scoreDetails?.wickets,
      innings2Overs: scorecard?.scoreCard?.[3]?.scoreDetails?.overs,
    };
  }

  useEffect(() => {
    dispatch(fetchCommentary(matchId));
    dispatch(fetchScorecard(matchId));
    dispatch(fetchMatchInfo(matchId));
  }, [dispatch, matchId]);

  const activeOption1 = () => {
    setOverview(true);
    setScorecardActive(false);
    setSquad(false);
  };

  const activeOption2 = () => {
    setOverview(false);
    setScorecardActive(true);
    setSquad(false);
  };

  const activeOption3 = () => {
    setOverview(false);
    setScorecardActive(false);
    setSquad(true);
  };

  return (
    <>
      { rejected ? (
        <Error />
      ) : (
        <div className="min-h-screen bg-gray-100">
          <div className="max-w-screen mx-auto px-4 py-6">
            {/* Match Header */}
            <div className="bg-gradient-to-b from-gray-600 to-gray-950 text-white p-6 rounded-t-lg shadow-lg mt-20">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h1 className="text-2xl font-bold">
                    {commentary?.matchHeader?.team1?.name} vs {commentary?.matchHeader?.team2?.name}
                  </h1>
                  <p className="text-lg opacity-90">{commentary?.matchHeader?.matchDescription}</p>
                </div>
                {commentary?.matchHeader?.complete === false ? (
                  <span className="mt-2 md:mt-0 px-3 py-1  bg-gradient-to-b from-red-800 to-red-600 text-white rounded-full text-sm ring-2 ring-red-500 animate-pulse  flex ">
                    
                  Live
                </span>
                ) : (
                  <span className="mt-2 md:mt-0 px-3 py-1  bg-gradient-to-b from-blue-800 to-blue-600 text-white rounded-full text-sm ring-2 ring-blue-5000">
                  
                  Completed
                </span>
                  
                  
                )}
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm opacity-90">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span>Series: {commentary?.matchHeader?.seriesName}</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Venue: {venueInfo?.ground}, {venueInfo?.city}</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{matchStartTimeDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
                {/* Tab Navigation */}
                <div className="bg-white border-b">
                  <div className="flex overflow-x-auto">
                    <button
                      onClick={activeOption1}
                      className={`px-6 py-4 font-medium transition-colors duration-200 whitespace-nowrap ${
                        overview ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'
                      }`}
                    >
                      Overview
                    </button>
                    {/* <button
                      onClick={activeOption2}
                      className={`px-6 py-4 font-medium transition-colors duration-200 whitespace-nowrap ${
                        scorecardActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'
                      }`}
                    >
                      Scorecard
                    </button> */}
                    <button
                      onClick={activeOption3}
                      className={`px-6 py-4 font-medium transition-colors duration-200 whitespace-nowrap ${
                        squad ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'
                      }`}
                    >
                      Squads
                    </button>
                  </div>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {overview && <Overview commentary={commentary} scorecard={scorecard} team1ScoreObj={team1ScoreObj} team2ScoreObj={team2ScoreObj} />}
                  {scorecardActive && <Scorecard scorecard={scorecard} />}
                  {squad && <Squads matchInfo={matchInfo} />}
                </div>
              </div>

              {/*Commentary Section*/}
              <div className="lg:col-span-1 ">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="bg-gray-50 p-4 border-b border-gray-200">
                    <h3 className="font-bold text-gray-700 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      Live Commentary
                    </h3>
                  </div>
                  <div className="h-full max-h-96 overflow-y-auto">
                    {commentaryList.map((comment, index) => (
                      <Commentary key={index} commentaryList={comment} />
                    ))}
                  </div>
                </div>
              </div> 
              {/* Commentary Section*/}

              {/* <div className=" top-0 right-0 w-100 h-screen bg-white shadow-md rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-4 border-b border-gray-200">
                  <h3 className="font-bold text-gray-700 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                     Live Commentary
                  </h3>
                </div>
                <div className="h-full max-h-[calc(100vh-60px)] overflow-y-auto p-2">
                  {commentaryList.map((comment, index) => (
                    <Commentary key={index} commentaryList={comment} />
                  ))}
                </div>
              </div>  */}

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MatchDetails;
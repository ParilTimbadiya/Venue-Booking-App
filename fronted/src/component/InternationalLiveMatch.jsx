// import React, { useEffect, useState } from "react";
// // import circle from "./circle.png";
// import { use } from "react";
// import data from "./mocks/livescoredata.json";

// const InternationalLiveMatch = () => {
//   const [data, setData] = useState([]);
//   const [inputData, setInputData] = useState();
//   const [search, setSearch] = useState("");

//   const getData = async () => {
//     try {
//       const response = await fetch(
//         "https://api.cricapi.com/v1/cricScore?apikey=efde5522-21df-4992-af0a-8cfb9c78935c"
//       );
//       const data = await response.json();
//       console.log(data);
//       setData(data.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   return (
//     <div className="main-container mt-[77px]">
//       {/* <div className="container min-h-screen bg-gray-900 flex flex-column  flex-nowrap items-center justify-center p-2"> */}
//       <div className="container min-h-screen bg-gray-900 grid m-auto grid-cols-3 gap-3 p-2 relative top-[74.67px]">
//         {data ? (
//           data.map((curVal) => {
//             console.log(curVal);
//             if (curVal.status != "Match not started") {
//               if (
//                 curVal.series.includes(search) ||
//                 curVal.t1.includes(search) ||
//                 curVal.t2.includes(search)
//               ) {
//                 return (

//                   <div className=" flex items-center justify-center bg-gray-900 p-2">
//                     <div className="bg-blue-300 h-60 rounded-2xl p-4 w-80 relative shadow-lg">
//                       {/* Live Indicator */}
//                       <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
//                         🔴 Live
//                       </div>

//                       {/* Expand Icon */}
//                       <div className="absolute top-2 right-2 bg-blue-400 p-1 rounded-full">
//                         {/* <ArrowUpRight className="text-black w-4 h-4" /> */}
//                       </div>

//                       <div className="mt-6">
//                         {/* Match Info */}
//                         <p className="text-sm font-semibold text-gray-700 mb-2">
//                           {curVal.matchType}:{curVal.series}
//                         </p>

//                         {/* Score Section */}
//                         <div className="flex items-center mb-2">
//                           <img
//                             src={curVal.t1img}
//                             alt="team1"
//                             className="w-6 h-6 mr-2 rounded-full"
//                           />
//                           <p className="text-base font-bold text-gray-800">
//                             {curVal.t1}
//                           </p>
//                           <span className="text-sm text-gray-800 ml-1">
//                             {curVal.t1s}
//                           </span>
//                           {/* <span className="text-sm text-gray-600 ml-1">
//                             (50)
//                           </span> */}
//                         </div>

//                         <div className="flex items-center mb-2">
//                           <img
//                             src={curVal.t2img}
//                             alt="team 2"
//                             className="w-6 h-6 mr-2 rounded-full"
//                           />
//                           <p className="text-base font-bold text-gray-800">
//                             {curVal.t2}
//                           </p>
//                           <span className="text-sm text-gray-800 ml-1">
//                             {curVal.t2s}
//                           </span>
//                           {/* <span className="text-sm text-gray-600 ml-1">
//                             (25.2)
//                           </span> */}
//                         </div>

//                         {/* Match Status */}
//                         <p className="text-sm text-gray-700">
//                           {curVal.status}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               }

//               // if (search === "") {
//               //   return (
//               //     <div className="card">
//               //       <h3>{curVal.series}</h3>
//               //       <h3>{curVal.matchType}</h3>
//               //       <div className="img">
//               //         <div>
//               //           <img src={curVal.t1img} />
//               //           <p>{curVal.t1}</p>
//               //           <p>{curVal.t1s}</p>
//               //         </div>
//               //         <div>
//               //           <img src={curVal.t2img} />
//               //           <p>{curVal.t2}</p>
//               //           <p>{curVal.t2s}</p>
//               //         </div>
//               //       </div>
//               //       <p className="status">Status : {curVal.status}</p>
//               //     </div>
//               //   );
//               // }
//             }
//           })
//         ) : (
//           <p>Data Not Found !</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InternationalLiveMatch;


// import React, { useEffect, useState } from "react";

// const formatDate = (dateStr) => {
//   const date = new Date(dateStr);
//   return date.toLocaleString();
// };

// const InternationalLiveMatch = () => {
//   const [liveMatches, setLiveMatches] = useState([]);
//   const [finishedMatches, setFinishedMatches] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Function to fetch and update match data
//   const fetchLiveMatches = async () => {
//     try {
//       const response = await fetch(
//         "https://api.cricapi.com/v1/currentMatches?apikey=ee11778e-5d8f-4845-83b2-d2509e88dbad&offset=0"
//       );
//       const result = await response.json();
//       if (result.data) {
//         // Sort matches by date descending (newest first)
//         const sortedMatches = result.data.sort(
//           (a, b) => new Date(b.date) - new Date(a.date)
//         );
//         // Separate live and finished matches
//         const live = sortedMatches.filter(
//           (match) =>
//             match.status === "Match started" || match.status === "Live"
//         );
//         const finished = sortedMatches.filter(
//           (match) =>
//             match.status !== "Match started" && match.status !== "Live"
//         );
//         setLiveMatches(live);
//         setFinishedMatches(finished);
//       } else {
//         setError("No data available");
//       }
//     } catch (error) {
//       setError("Failed to fetch live matches");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Poll the API every second
//   useEffect(() => {
//     fetchLiveMatches();
//     const interval = setInterval(fetchLiveMatches, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   if (loading) {
//     return (
//       <p className="text-white text-center text-xl mt-10">
//         Loading live matches...
//       </p>
//     );
//   }

//   if (error) {
//     return (
//       <p className="text-red-500 text-center text-xl mt-10">
//         {error}
//       </p>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 p-4">
//       {/* Live Matches */}
//       {liveMatches.length > 0 && (
//         <div className="mb-8 max-w-4xl mx-auto">
//           <h2 className="text-3xl font-bold text-teal-400 mb-4">Live Matches</h2>
//           <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
//             {liveMatches.map((match, index) => (
//               <div
//                 key={index}
//                 className="relative bg-gradient-to-r from-green-600 to-blue-600 p-6 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300"
//               >
//                 {/* Line 1: Live tag or Date */}
//                 <div className="mb-2 flex items-center justify-between">
//                   {(match.status === "Match started" || match.status === "Live") ? (
//                     <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
//                       Live
//                     </span>
//                   ) : (
//                     <span className="text-gray-200 text-sm">
//                       {formatDate(match.date)}
//                     </span>
//                   )}
//                   <span className="text-gray-300 text-sm ml-2">{match.series}</span>
//                 </div>

//                 {/* Line 2: Match details */}
//                 <p className="text-white text-xl font-semibold mb-4">
//                   {match.matchType.toUpperCase()} - {match.name}
//                 </p>

//                 {/* Line 3: Team 1 details */}
//                 <div className="flex justify-between mb-2">
//                   <p className="text-white text-lg font-medium">{match.teams[0]}</p>
//                   <div className="text-gray-100 text-sm text-right">
//                     {match.score[0] ? (
//                       <>
//                         <div>{match.score[0].r} runs</div>
//                         <div>{match.score[0].w} wickets</div>
//                         <div>{match.score[0].o} overs</div>
//                       </>
//                     ) : (
//                       <div className="italic">Yet to bat</div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Line 4: Team 2 details */}
//                 <div className="flex justify-between mb-2">
//                   <p className="text-white text-lg font-medium">{match.teams[1]}</p>
//                   <div className="text-gray-100 text-sm text-right">
//                     {match.score[1] ? (
//                       <>
//                         <div>{match.score[1].r} runs</div>
//                         <div>{match.score[1].w} wickets</div>
//                         <div>{match.score[1].o} overs</div>
//                       </>
//                     ) : (
//                       <div className="italic">Yet to bat</div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Line 5: Match Status */}
//                 <p className="text-gray-200 text-sm">{match.status}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Finished Matches */}
//       {finishedMatches.length > 0 && (
//         <div className="mb-8 max-w-4xl mx-auto">
//           <h2 className="text-3xl font-bold text-teal-400 mb-4">Finished Matches</h2>
//           <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
//             {finishedMatches.map((match, index) => (
//               <div
//                 key={index}
//                 className="bg-gradient-to-r from-gray-700 to-gray-900 p-6 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300"
//               >
//                 {/* Line 1: Date */}
//                 <div className="mb-2 flex items-center justify-between">
//                   <span className="text-gray-200 text-sm">
//                     {formatDate(match.date)}
//                   </span>
//                   <span className="text-gray-400 text-sm ml-2">{match.series}</span>
//                 </div>

//                 {/* Line 2: Match details */}
//                 <p className="text-white text-xl font-semibold mb-4">
//                   {match.matchType.toUpperCase()} - {match.name}
//                 </p>

//                 {/* Line 3: Team 1 details */}
//                 <div className="flex justify-between mb-2">
//                   <p className="text-white text-lg font-medium">{match.teams[0]}</p>
//                   <div className="text-gray-100 text-sm text-right">
//                     {match.score[0] ? (
//                       <>
//                         <div>{match.score[0].r} runs</div>
//                         <div>{match.score[0].w} wickets</div>
//                         <div>{match.score[0].o} overs</div>
//                       </>
//                     ) : (
//                       <div className="italic">-</div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Line 4: Team 2 details */}
//                 <div className="flex justify-between mb-2">
//                   <p className="text-white text-lg font-medium">{match.teams[1]}</p>
//                   <div className="text-gray-100 text-sm text-right">
//                     {match.score[1] ? (
//                       <>
//                         <div>{match.score[1].r} runs</div>
//                         <div>{match.score[1].w} wickets</div>
//                         <div>{match.score[1].o} overs</div>
//                       </>
//                     ) : (
//                       <div className="italic">-</div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Line 5: Match Status */}
//                 <p className="text-gray-200 text-sm">{match.status}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Fallback Message */}
//       {liveMatches.length === 0 && finishedMatches.length === 0 && (
//         <p className="text-white text-center text-xl">No matches found!</p>
//       )}
//     </div>
//   );
// };

// export default InternationalLiveMatch;


// import React, { useEffect, useState } from "react";

// const formatDate = (dateStr) => {
//   const date = new Date(dateStr);
//   return date.toLocaleString("en-US", { 
//     weekday: "short", 
//     year: "numeric", 
//     month: "short", 
//     day: "numeric", 
//     hour: "2-digit", 
//     minute: "2-digit" 
//   });
// };

// const InternationalLiveMatch = () => {
//   const [liveMatches, setLiveMatches] = useState([]);
//   const [finishedMatches, setFinishedMatches] = useState([]);
//   const [upcomingMatches, setUpcomingMatches] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch matches data
//   const fetchMatches = async () => {
//     try {
//       const response = await fetch(
//         "https://api.cricapi.com/v1/currentMatches?apikey=ee11778e-5d8f-4845-83b2-d2509e88dbad&offset=0"
//       );
//       const result = await response.json();

//       if (result.data) {
//         // Sort matches by date (newest first)
//         const sortedMatches = result.data.sort(
//           (a, b) => new Date(b.date) - new Date(a.date)
//         );

//         // Categorize matches
//         const live = sortedMatches.filter(match => 
//           match.status === "Match started" || match.status === "Live"
//         );
//         const finished = sortedMatches.filter(match => 
//           match.status === "Completed" || match.status.includes("Match Ended")
//         );
//         const upcoming = sortedMatches.filter(match => 
//           match.status === "Not Started"
//         );

//         setLiveMatches(live);
//         setFinishedMatches(finished);
//         setUpcomingMatches(upcoming);
//       } else {
//         setError("No data available");
//       }
//     } catch (error) {
//       setError("Failed to fetch match data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch matches every 10 seconds
//   useEffect(() => {
//     fetchMatches();
//     const interval = setInterval(fetchMatches, 10000000);
//     return () => clearInterval(interval);
//   }, []);

//   if (loading) {
//     return <p className="text-white text-center text-xl mt-10">Loading matches...</p>;
//   }

//   if (error) {
//     return <p className="text-red-500 text-center text-xl mt-10">{error}</p>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 p-4">
//       {/* Live Matches Section */}
//       {liveMatches.length > 0 && (
//         <MatchSection title="Live Matches" matches={liveMatches} live />
//       )}

//       {/* Upcoming Matches Section */}
//       {upcomingMatches.length > 0 && (
//         <MatchSection title="Upcoming Matches" matches={upcomingMatches} />
//       )}

//       {/* Finished Matches Section */}
//       {finishedMatches.length > 0 && (
//         <MatchSection title="Finished Matches" matches={finishedMatches} />
//       )}

//       {/* Fallback Message */}
//       {liveMatches.length === 0 && upcomingMatches.length === 0 && finishedMatches.length === 0 && (
//         <p className="text-white text-center text-xl">No matches found!</p>
//       )}
//     </div>
//   );
// };

// // Reusable Match Section Component
// const MatchSection = ({ title, matches, live }) => (
//   <div className="mb-8 max-w-4xl mx-auto">
//     <h2 className={`text-3xl font-bold ${live ? "text-red-400" : "text-teal-400"} mb-4`}>
//       {title}
//     </h2>
//     <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
//       {matches.map((match, index) => (
//         <MatchCard key={index} match={match} live={live} />
//       ))}
//     </div>
//   </div>
// );

// // Match Card Component
// const MatchCard = ({ match, live }) => (
//   <div
//     className={`relative p-6 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300 ${
//       live ? "bg-gradient-to-r from-green-600 to-blue-600" : "bg-gray-800"
//     }`}
//   >
//     {/* Match Header */}
//     <div className="mb-2 flex items-center justify-between">
//       <span
//         className={`text-xs font-bold px-2 py-1 rounded ${
//           live ? "bg-red-600 text-white" : "bg-gray-600 text-white"
//         }`}
//       >
//         {live ? "Live" : "Match"}
//       </span>
//       <span className="text-gray-300 text-sm">{formatDate(match.date)}</span>
//       <span className="text-gray-400 text-sm">{match.series}</span>
//     </div>

//     {/* Match Details */}
//     <p className="text-white text-xl font-semibold mb-4">
//       {match.matchType.toUpperCase()} - {match.name}
//     </p>

//     {/* Team 1 Details */}
//     <div className="flex justify-between mb-2">
//       <p className="text-white text-lg font-medium">{match.teams[0]}</p>
//       <div className="text-gray-100 text-sm text-right">
//         {match.score[0] ? (
//           <>
//             <div>{match.score[0].r} runs</div>
//             <div>{match.score[0].w} wickets</div>
//             <div>{match.score[0].o} overs</div>
//           </>
//         ) : (
//           <div className="italic">Yet to bat</div>
//         )}
//       </div>
//     </div>

//     {/* Team 2 Details */}
//     <div className="flex justify-between mb-2">
//       <p className="text-white text-lg font-medium">{match.teams[1]}</p>
//       <div className="text-gray-100 text-sm text-right">
//         {match.score[1] ? (
//           <>
//             <div>{match.score[1].r} runs</div>
//             <div>{match.score[1].w} wickets</div>
//             <div>{match.score[1].o} overs</div>
//           </>
//         ) : (
//           <div className="italic">Yet to bat</div>
//         )}
//       </div>
//     </div>

//     {/* Match Status */}
//     <p className="text-gray-200 text-sm">{match.status}</p>
//   </div>
// );

// export default InternationalLiveMatch;


import React, { useEffect, useState, useMemo } from "react";
import mockData from "./mocks/livescoredata.json";

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleString();
};

const InternationalLiveMatch = () => {
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [filter, setFilter] = useState("all");

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://api.cricapi.com/v1/cricScore?apikey=efde5522-21df-4992-af0a-8cfb9c78935c"
  //       );
  //       const data = await response.json();
  //       setMatches(data.data || []);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   getData();
  // }, []);

  // Load mock data once the component is mounted
  useEffect(() => {
    setData(mockData.data || []);
  }, []);

  // Filter data by search term
  const filteredData = useMemo(() => {
    return data.filter((match) => {
      // Skip matches that haven't started
      if (match.status === "Match not started") return false;
      const searchTerm = search.toLowerCase();
      return (
        match.series.toLowerCase().includes(searchTerm) ||
        match.t1.toLowerCase().includes(searchTerm) ||
        match.t2.toLowerCase().includes(searchTerm)
      );
    });
  }, [data, search]);

  // Separate live and finished matches
  const liveMatches = filteredData.filter((match) => match.status === "Live");
  const finishedMatches = filteredData.filter(
    (match) => match.status !== "Live" && match.status !== "Match not started"
  );

  return (
    <div className="w-full min-h-screen bg-gray-900 p-4">
      {/* Search Bar */}
      <div className="mb-4 w-full">
        <input
          type="text"
          placeholder="Search matches"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
        />
      </div>

      {/* Live Matches Section */}
      {liveMatches.length > 0 && (
        <div className="mb-8 w-full">
          <h2 className="text-3xl font-bold text-teal-400 mb-4 text-center">
            Live Matches
          </h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {liveMatches.map((match, index) => (
              <div
                key={index}
                className="relative bg-gradient-to-r from-green-600 to-blue-600 p-6 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300"
                style={{
                  ...styles.matchCard,
                  backgroundColor:
                    hoveredIndex === index ? "#2d3748" : "#3182ce",
                  color: hoveredIndex === index ? "#3182ce" : "#2d3748",
                }}
              >
                {/* Line 1: Live Tag and Series */}
                <div className="mb-2 flex items-center justify-between">
                  <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                    Live
                  </span>
                  <span className="text-gray-300 text-sm ml-2">
                    {match.series}
                  </span>
                </div>

                {/* Line 2: Match Details */}
                <p className="text-white text-xl font-semibold mb-4">
                  {match.matchType.toUpperCase()} - {match.name}
                </p>

                {/* Line 3: Team 1 Details */}
                <div className="flex justify-between mb-2">
                  <p className="text-white text-lg font-medium">{match.t1}</p>
                  <div className="text-gray-100 text-sm text-right">
                    {match.t1s ? (
                      <div>{match.t1s}</div>
                    ) : (
                      <div className="italic">Yet to bat</div>
                    )}
                  </div>
                </div>

                {/* Line 4: Team 2 Details */}
                <div className="flex justify-between mb-2">
                  <p className="text-white text-lg font-medium">{match.t2}</p>
                  <div className="text-gray-100 text-sm text-right">
                    {match.t2s ? (
                      <div>{match.t2s}</div>
                    ) : (
                      <div className="italic">Yet to bat</div>
                    )}
                  </div>
                </div>

                {/* Line 5: Match Status */}
                <p className="text-gray-200 text-sm">{match.status}</p>
                <p className="text-xs text-gray-400">{formatDate(match.date)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Finished Matches Section */}
      {finishedMatches.length > 0 && (
        <div className="mb-8 w-full">
          <h2 className="text-3xl font-bold text-teal-400 mb-4 text-center">
            Finished Matches
          </h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {finishedMatches.map((match, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-gray-700 to-gray-800 p-6 rounded-lg shadow-xl transform hover:scale-105 hover:from-gray-600 hover:to-gray-600 hover:border-1 hover:border-black transition-transform duration-300"

              >
                {/* Line 1: Finished Tag, Date & Series */}
                <div className="mb-2 flex items-center justify-between">
                  <span className="bg-gray-600 text-white text-xs font-bold px-2 py-1 rounded">
                    Finished
                  </span>
                  {/* <span className="text-gray-200 text-sm ml-2">
                    {formatDate(match.date)}
                  </span> */}
                  <span className="text-gray-400 text-sm ml-2">
                    {match.series}
                  </span>
                </div>

                {/* Line 2: Match Details */}
                <p className="text-white text-xl font-semibold mb-4">
                  {/* {match.matchType.toUpperCase()} - {match.name} */}
                </p>

                {/* Line 3: Team 1 Details */}
                <div className="flex justify-between mb-2">
                  <p className="text-white text-lg font-medium">{match.t1}</p>
                  <div className="text-gray-100 text-sm text-right">
                    {match.t1s ? (
                      <div>{match.t1s}</div>
                    ) : (
                      <div className="italic">-</div>
                    )}
                  </div>
                </div>

                {/* Line 4: Team 2 Details */}
                <div className="flex justify-between mb-2">
                  <p className="text-white text-lg font-medium">{match.t2}</p>
                  <div className="text-gray-100 text-sm text-right">
                    {match.t2s ? (
                      <div>{match.t2s}</div>
                    ) : (
                      <div className="italic">-</div>
                    )}
                  </div>
                </div>

                {/* Line 5: Match Status */}
                <p className="text-gray-200 text-sm">{match.status}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fallback Message */}
      {liveMatches.length === 0 && finishedMatches.length === 0 && (
        <p className="text-white text-center text-xl">No matches found!</p>
      )}
    </div>
  );
};

export default InternationalLiveMatch;



// import React, { useEffect, useState } from "react";

// const InternationalLiveMatch = () => {
//   const [matches, setMatches] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Function to fetch match data
//   const fetchMatches = async () => {
//     try {
//       const response = await fetch(
//         "https://api.sportradar.com/cricket-t2/en/matches/sr:sport_event:39497515/summary.json?api_key=q2nvMpB69bFNPhURPJgV7VFtgsG6qLYrokbHBc7J"
//       );
//       const data = await response.json();

//       if (!data || !data.sport_event) {
//         setError("No match data found");
//         setLoading(false);
//         return;
//       }

//       const match = data.sport_event;
//       const matchStatus = data.sport_event_status.match_status;
//       const formattedMatch = {
//         id: match.id,
//         tournament: match.tournament.name,
//         season: match.season.name,
//         scheduled: match.scheduled,
//         venue: match.venue.name,
//         teams: match.competitors.map((team) => ({
//           name: team.name,
//           abbreviation: team.abbreviation,
//           country: team.country,
//           qualifier: team.qualifier,
//         })),
//         status: matchStatus,
//       };

//       setMatches([formattedMatch]);
//     } catch (error) {
//       setError("Error fetching match data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Refresh data every 30 seconds
//   useEffect(() => {
//     fetchMatches();
//     const interval = setInterval(fetchMatches, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   // Format date function
//   const formatDate = (dateStr) => {
//     const date = new Date(dateStr);
//     return date.toLocaleString("en-US", {
//       weekday: "short",
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       timeZone: "Asia/Kolkata",
//     });
//   };

//   if (loading) return <p className="text-center text-white mt-10">Loading match data...</p>;
//   if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

//   return (
//     <div className="min-h-screen bg-gray-900 p-4">
//       <h2 className="text-3xl text-red-400 font-bold mb-4 text-center">International Matches</h2>

//       {matches.length === 0 ? (
//         <p className="text-white text-center text-xl">No matches available</p>
//       ) : (
//         <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto">
//           {matches.map((match, index) => (
//             <div
//               key={index}
//               className="p-6 rounded-lg shadow-xl bg-gradient-to-r from-purple-600 to-blue-600 transform hover:scale-105 transition-transform duration-300"
//             >
//               <div className="mb-2 flex justify-between items-center">
//                 <span className={`px-2 py-1 text-xs font-bold rounded ${match.status === "live" ? "bg-red-500 text-white" : "bg-gray-500 text-gray-200"}`}>
//                   {match.status.toUpperCase()}
//                 </span>
//                 <span className="text-gray-300 text-sm">{formatDate(match.scheduled)}</span>
//               </div>

//               <p className="text-white text-xl font-semibold">{match.tournament} - {match.season}</p>
//               <p className="text-gray-300 text-sm mb-2">{match.venue}</p>

//               {/* Teams */}
//               <div className="flex justify-between mt-4">
//                 {match.teams.map((team, idx) => (
//                   <div key={idx} className="flex flex-col items-center">
//                     <p className="text-white text-lg font-medium">{team.name}</p>
//                     <span className="text-gray-400 text-sm">{team.qualifier.toUpperCase()}</span>
//                   </div>
//                 ))}
//               </div>

//               {/* Match Status */}
//               <p className="text-gray-200 text-sm mt-2">{match.status === "ended" ? "Match Finished" : "Ongoing Match"}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default InternationalLiveMatch;


// import React, { useState, useEffect } from 'react';
// import './InternationalLiveMatche.css';
// import MatchCard from '../Home/Cards/MatchCard';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchLiveData } from "../../redux/Reducers/liveMatchesSlice";
// import { fetchRecentData } from "../../redux/Reducers/recentMatchesSlice";
// import Loader from '../Loader/Loader';
// import Error from '../Error/Error';
// const Matches = () => {
//     const [internationalActive, setInternationalActive] = useState(true);
//     const [womenActive, setWomenActive] = useState(false);
//     const [leagueActive, setLeagueActive] = useState(false);
//     const [domesticActive, setDomesticActive] = useState(false);
//     const { liveMatches, loading, liveRejected } = useSelector((state) => state.liveMatches);
//     const { recentMatches, recentRejected } = useSelector((state) => state.recentMatches);
//     const dispatch = useDispatch();
//     const typeMatchesLive = liveMatches.typeMatches;
//     const typeMatchesRecent = recentMatches.typeMatches;
//     // const seriesMatchesLive = liveMatches.typeMatches;
//     const activeOptionsHandlerIntl = () => {
//         setInternationalActive(true);
//         setWomenActive(false);
//         setLeagueActive(false);
//         setDomesticActive(false);
//     }
//     const activeOptionsHandlerWomen = () => {
//         setInternationalActive(false);
//         setWomenActive(true);
//         setLeagueActive(false);
//         setDomesticActive(false);
//     }
//     const activeOptionsHandlerLeague = () => {
//         setInternationalActive(false);
//         setWomenActive(false);
//         setLeagueActive(true);
//         setDomesticActive(false);
//     }
//     const activeOptionsHandlerDomestic = () => {
//         setInternationalActive(false);
//         setWomenActive(false);
//         setLeagueActive(false);
//         setDomesticActive(true);
//     }
//
//     // International Matches
//     let intlLiveMatchesArr = typeMatchesLive?.[0]?.seriesMatches?.flatMap(seriesMatch => {
//         return seriesMatch?.seriesAdWrapper?.matches ?? [];
//     });
//     let intlRecentMatchesArr = typeMatchesRecent?.[0]?.seriesMatches?.flatMap(seriesMatch => {
//         return seriesMatch?.seriesAdWrapper?.matches ?? [];
//     });
//     // Women Matches
//     let womenLiveMatchesArr = typeMatchesLive?.[3]?.seriesMatches?.flatMap(seriesMatch => {
//         return seriesMatch?.seriesAdWrapper?.matches ?? [];
//     });
//     let womenRecentMatchesArr = typeMatchesRecent?.[3]?.seriesMatches?.flatMap(seriesMatch => {
//         return seriesMatch?.seriesAdWrapper?.matches ?? [];
//     });
//     // League Matches
//     let leagueLiveMatchesArr = typeMatchesLive?.[1]?.seriesMatches?.flatMap(seriesMatch => {
//         return seriesMatch?.seriesAdWrapper?.matches ?? [];
//     });
//     let leagueRecentMatchesArr = typeMatchesRecent?.[1]?.seriesMatches?.flatMap(seriesMatch => {
//         return seriesMatch?.seriesAdWrapper?.matches ?? [];
//     });
//     // Domestic Matches
//     let domesticLiveMatchesArr = typeMatchesLive?.[2]?.seriesMatches?.flatMap(seriesMatch => {
//         return seriesMatch?.seriesAdWrapper?.matches ?? [];
//     });
//     let domesticRecentMatchesArr = typeMatchesRecent?.[2]?.seriesMatches?.flatMap(seriesMatch => {
//         return seriesMatch?.seriesAdWrapper?.matches ?? [];
//     });
//
//     useEffect(() => {
//         dispatch(fetchLiveData());
//         dispatch(fetchRecentData());
//     }, [dispatch]);
//
//
//     return (
//         <>
//             {
//                 loading ? <Loader />
//                     :
//                     <>
//                         {
//                             liveRejected && recentRejected ? <Error />
//                                 :
//                                 <div className='matchesContainer'>
//                                     <div>
//                                         <div className='matchOptions'>
//                                             <span onClick={activeOptionsHandlerIntl} className={internationalActive === true ? 'active' : ''} >International</span>
//                                             <span onClick={activeOptionsHandlerWomen} className={womenActive === true ? 'active' : ''} >Women</span>
//                                             <span onClick={activeOptionsHandlerLeague} className={leagueActive === true ? 'active' : ''} >League</span>
//                                             <span onClick={activeOptionsHandlerDomestic} className={domesticActive === true ? 'active' : ''} >Domestic</span>
//                                         </div>
//
//                                         {/* International Matches */}
//                                         {
//                                             internationalActive &&
//                                             <div className='matches'>
//                                                 <div className="liveMatches">
//                                                     <div className='matchType'><h2> Live International Matches</h2></div>
//                                                     {
//                                                         //For the situation When api limit is reached and all the elements in the array are undefined.
//                                                         intlLiveMatchesArr?.every(element => typeof element === 'undefined') || intlLiveMatchesArr === undefined ?
//                                                             <div className='no-matches'><p>No Live matches happening right now</p></div>
//                                                             : <div className="cardContainer">
//                                                                 {
//                                                                     intlLiveMatchesArr && intlLiveMatchesArr?.filter(x => x !== undefined).map((intlLiveMatchesArr, index) => (
//                                                                         <MatchCard key={index} matchesArr={intlLiveMatchesArr} />
//                                                                     ))
//                                                                 }
//                                                             </div>
//
//                                                     }
//                                                 </div>
//                                                 <div className="recentMatches">
//                                                     <div className='matchType'><h2> Recent International Matches</h2></div>
//                                                     {
//                                                         //For the situation When api limit is reached and all the elements in the array are undefined.
//                                                         intlRecentMatchesArr?.every(element => typeof element === 'undefined') || intlRecentMatchesArr === undefined ?
//                                                             <div className='no-matches'><p>No matches to show right now</p></div>
//                                                             : <div className="cardContainer">
//                                                                 {
//                                                                     intlRecentMatchesArr && intlRecentMatchesArr?.filter(x => x !== undefined).map((intlRecentMatchesArr, index) => (
//                                                                         <MatchCard key={index} matchesArr={intlRecentMatchesArr} />
//                                                                     ))
//                                                                 }
//                                                             </div>
//
//                                                     }
//                                                 </div>
//                                             </div>
//                                         }
//
//
//
//                                         {/* Women matches */}
//                                         {
//                                             womenActive &&
//                                             <div className='matches'>
//                                                 {
//                                                     <div className="liveMatches">
//                                                         <div className='matchType'><h2> Live Women Matches</h2></div>
//                                                         {
//                                                             //For the situation When api limit is reached and all the elements in the array are undefined.
//                                                             womenLiveMatchesArr?.every(element => typeof element === 'undefined') || womenLiveMatchesArr === undefined ?
//                                                                 <div className='no-matches'><p>No Live matches happening right now</p></div>
//                                                                 : <div className="cardContainer">
//                                                                     {
//                                                                         womenLiveMatchesArr && womenLiveMatchesArr?.filter(x => x !== undefined).map((womenLiveMatchesArr, index) => (
//                                                                             <MatchCard key={index} matchesArr={womenLiveMatchesArr} />
//                                                                         ))
//                                                                     }
//                                                                 </div>
//
//                                                         }
//                                                     </div>}
//                                                 <div className="recentMatches">
//                                                     <div className='matchType'><h2> Recent Women Matches</h2></div>
//                                                     {
//                                                         //For the situation When api limit is reached and all the elements in the array are undefined.
//                                                         womenRecentMatchesArr?.every(element => typeof element === 'undefined') || womenRecentMatchesArr === undefined ?
//                                                             <div className='no-matches'><p>No matches to show right now</p></div>
//                                                             : <div className="cardContainer">
//                                                                 {
//                                                                     womenRecentMatchesArr && womenRecentMatchesArr?.filter(x => x !== undefined).map((womenRecentMatchesArr, index) => (
//                                                                         <MatchCard key={index} matchesArr={womenRecentMatchesArr} />
//                                                                     ))
//                                                                 }
//                                                             </div>
//                                                     }
//                                                 </div>
//                                             </div>
//                                         }
//
//
//                                         {/* League Matches  */}
//                                         {
//                                             leagueActive &&
//                                             <div className='matches'>
//                                                 <div className="liveMatches">
//                                                     <div className='matchType'><h2> Live League Matches</h2></div>
//                                                     {
//                                                         //For the situation When api limit is reached and all the elements in the array are undefined.
//                                                         leagueLiveMatchesArr?.every(element => typeof element === 'undefined') || leagueLiveMatchesArr === undefined ?
//                                                             <div className='no-matches'><p>No Live matches happening right now</p></div>
//                                                             : <div className="cardContainer">
//                                                                 {
//                                                                     leagueLiveMatchesArr && leagueLiveMatchesArr?.filter(x => x !== undefined).map((leagueLiveMatchesArr, index) => (
//                                                                         <MatchCard key={index} matchesArr={leagueLiveMatchesArr} />
//                                                                     ))
//                                                                 }
//                                                             </div>
//
//                                                     }
//                                                 </div>
//                                                 <div className="recentMatches">
//                                                     <div className='matchType'><h2>  Recent League Matches</h2></div>
//                                                     {
//                                                         //For the situation When api limit is reached and all the elements in the array are undefined.
//                                                         leagueRecentMatchesArr?.every(element => typeof element === 'undefined') || leagueRecentMatchesArr === undefined ?
//                                                             <div className='no-matches'><p>No matches to show right now</p></div>
//                                                             : <div className="cardContainer">
//                                                                 {
//                                                                     leagueRecentMatchesArr && leagueRecentMatchesArr?.filter(x => x !== undefined).map((leagueRecentMatchesArr, index) => (
//                                                                         <MatchCard key={index} matchesArr={leagueRecentMatchesArr} />
//                                                                     ))
//                                                                 }
//                                                             </div>
//
//                                                     }
//                                                 </div>
//                                             </div>
//                                         }
//
//
//                                         {/* Domestic Matches */}
//                                         {
//                                             domesticActive &&
//                                             <div className='matches'>
//                                                 <div className="liveMatches">
//                                                     <div className='matchType'><h2>  Live Domestic Matches</h2></div>
//                                                     {
//                                                         //For the situation When api limit is reached and all the elements in the array are undefined.
//                                                         domesticLiveMatchesArr?.every(element => typeof element === 'undefined') || domesticLiveMatchesArr === undefined ?
//                                                             <div className='no-matches'><p>No Live matches happening right now</p></div>
//                                                             : <div className="cardContainer">
//                                                                 {
//                                                                     domesticLiveMatchesArr && domesticLiveMatchesArr?.filter(x => x !== undefined).map((domesticLiveMatchesArr, index) => (
//                                                                         <MatchCard key={index} matchesArr={domesticLiveMatchesArr} />
//                                                                     ))
//                                                                 }
//                                                             </div>
//
//                                                     }
//                                                 </div>
//                                                 <div className="recentMatches">
//                                                     <div className='matchType'><h2>  Recent Domestic Matches</h2></div>
//                                                     {
//                                                         //For the situation When api limit is reached and all the elements in the array are undefined.
//                                                         domesticRecentMatchesArr?.every(element => typeof element === 'undefined') || domesticRecentMatchesArr === undefined ?
//                                                             <div className='no-matches'><p>No matches to show right now</p></div>
//                                                             : <div className="cardContainer">
//                                                                 {
//                                                                     domesticRecentMatchesArr && domesticRecentMatchesArr?.filter(x => x !== undefined).map((domesticRecentMatchesArr, index) => (
//                                                                         <MatchCard key={index} matchesArr={domesticRecentMatchesArr} />
//                                                                     ))
//                                                                 }
//                                                             </div>
//                                                     }
//                                                 </div>
//                                             </div>
//                                         }
//
//                                     </div>
//                                 </div>
//                         }
//                     </>
//             }
//         </>
//     )
// }
//
// export default Matches;
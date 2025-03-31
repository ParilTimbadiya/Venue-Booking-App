// import React, { useEffect, useState } from 'react';
// // import './Teams.css';
// import options from '../../apiOptions';

// const Teams = () => {
//   const [teams, setTeams] = useState([]);
//   const [players, setPlayers] = useState([]); 
//   const [selectedTeam, setSelectedTeam] = useState(null); 
//   const [loading, setLoading] = useState(true); 
//   const [error, setError] = useState(null); 

//   useEffect(() => {
//     const fetchTeams = async () => {
//       try {
//         const response = await fetch(
//           'https://cricbuzz-cricket.p.rapidapi.com/teams/v1/international',
//           options
//         );

//         if (!response.ok) {
//           throw new Error('Failed to fetch teams');
//         }

//         const data = await response.json();
//         if (data.list) {
//           setTeams(data.list.filter((team) => team.teamId)); 
//         } else {
//           throw new Error('No teams data found');
//         }
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTeams();
//   }, []);

//   const fetchPlayers = async (teamId) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(
//         `https://cricbuzz-cricket.p.rapidapi.com/teams/v1/${teamId}/players`,
//         options
//       );

//       if (!response.ok) {
//         throw new Error('Failed to fetch players');
//       }

//       const data = await response.json();
//       if (data.player) {
//         setPlayers(data.player);
//       } else {
//         throw new Error('No players data found');
//       }
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTeamClick = (teamId) => {
//     setSelectedTeam(teamId);
//     fetchPlayers(teamId);
//   };

//   const handleBackToTeams = () => {
//     setSelectedTeam(null);
//     setPlayers([]);
//   };

//   // if (loading) {
//   //   return <div className="loading">Loading...</div>;
//   // }

//   if (error) {
//     return <div className="error">Error: {error}</div>;
//   }

//   return (
//     <div>
//     <div className="teams-container">
      

//       {!selectedTeam && (
//         <div><h1 className='teams-header'>International Cricket Teams</h1>
//         <div className="teams-grid">
          
//           {teams.length > 0 ? (
//             teams.map((team) => (
//               <div
//                 key={team.teamId}
//                 className="team-card"
//                 onClick={() => handleTeamClick(team.teamId)}
//               >
//                 <div className="team-image">
//                   <img
//                     src={`https://www.cricbuzz.com/a/img/v1/300x300/i1/c${team.imageId}/team-logos.jpg`} 
//                     alt={team.teamName}
//                     onError={(e) => {
//                       e.target.src = 'https://via.placeholder.com/300';
//                     }}
//                   />
//                 </div>
//                 <h2>{team.teamName}</h2>
//                 <p>{team.teamSName}</p>
//               </div>
//             ))
//           ) : (
//             <div className="no-data">Loading Team...</div>
//           )}
//         </div></div>
//       )}

//       {selectedTeam && (
//         <div className="players-container">
//           <button className="back-button" onClick={handleBackToTeams}>
//             &larr; Back to Teams
//           </button>
//           <h2 className="players-header">Players</h2>
//           {players.length > 0 ? (
//             <div className="players-grid">
//               {players.map((player, index) =>
//                 player.id ? (
//                   <div key={index} className="player-card">
//                     <div className="player-image">
//                       <img
//                         src={`https://www.cricbuzz.com/a/img/v1/300x300/i1/c${player.imageId}/player-logos.jpg`} 
//                         alt={player.name}
//                         onError={(e) => {
//                           e.target.src = 'https://via.placeholder.com/300'; 
//                         }}
//                       />
//                       <h2>{player.name}</h2>
//                     </div>
                    
//                     <p><strong>Batting Style:</strong> {player.battingStyle}</p>
//                     {player.bowlingStyle && (
//                       <p><strong>Bowling Style:</strong> {player.bowlingStyle}</p>
//                     )}
//                   </div>
//                 ) : (
//                   <h2 key={index} className="player-category">{player.name}</h2>
//                 )
//               )}
//             </div>
//           ) : (
//             <div className="no-data">Load Players Information...</div>
//           )}
//         </div>
//       )}
//     </div>
//     </div>
//   );
// };

// export default Teams;




// import React, { useEffect, useState } from 'react';
// import options from '../../apiOptions';
// import { motion } from 'framer-motion';

// const Teams = () => {
//   const [teams, setTeams] = useState([]);
//   const [players, setPlayers] = useState([]);
//   const [selectedTeam, setSelectedTeam] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchTeams = async () => {
//       try {
//         const response = await fetch(
//           'https://cricbuzz-cricket.p.rapidapi.com/teams/v1/international',
//           options
//         );

//         if (!response.ok) {
//           throw new Error('Failed to fetch teams');
//         }

//         const data = await response.json();
//         if (data.list) {
//           setTeams(data.list.filter((team) => team.teamId));
//         } else {
//           throw new Error('No teams data found');
//         }
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTeams();
//   }, []);

//   const fetchPlayers = async (teamId) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(
//         `https://cricbuzz-cricket.p.rapidapi.com/teams/v1/${teamId}/players`,
//         options
//       );

//       if (!response.ok) {
//         throw new Error('Failed to fetch players');
//       }

//       const data = await response.json();
//       if (data.player) {
//         setPlayers(data.player);
//       } else {
//         throw new Error('No players data found');
//       }
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTeamClick = (teamId) => {
//     setSelectedTeam(teamId);
//     fetchPlayers(teamId);
//   };

//   const handleBackToTeams = () => {
//     setSelectedTeam(null);
//     setPlayers([]);
//   };

//   if (error) {
//     return <div className="text-center text-red-500">Error: {error}</div>;
//   }

//   return (
//     <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white">
//       {!selectedTeam ? (
//         <div>
//           <h1 className="text-3xl font-bold text-center mb-6">International Cricket Teams</h1>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {teams.length > 0 ? (
//               teams.map((team) => (
//                 <motion.div
//                   key={team.teamId}
//                   className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:rotate-1"
//                   onClick={() => handleTeamClick(team.teamId)}
//                   whileHover={{ scale: 1.05, rotate: 1 }}
//                 >
//                   <img
//                     src={`https://www.cricbuzz.com/a/img/v1/300x300/i1/c${team.imageId}/team-logos.jpg`}
//                     alt={team.teamName}
//                     className="w-full h-48 object-cover"
//                     onError={(e) => {
//                       e.target.src = 'https://via.placeholder.com/300';
//                     }}
//                   />
//                   <div className="p-4">
//                     <h2 className="text-xl font-semibold">{team.teamName}</h2>
//                     <p className="text-gray-400">{team.teamSName}</p>
//                   </div>
//                 </motion.div>
//               ))
//             ) : (
//               <div className="text-center col-span-full">Loading Teams...</div>
//             )}
//           </div>
//         </div>
//       ) : (
//         <div>
//           <button
//             className="mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-all rounded-lg"
//             onClick={handleBackToTeams}
//           >
//             &larr; Back to Teams
//           </button>
//           <h2 className="text-2xl font-bold mb-4">Players</h2>
//           {players.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {players.map((player, index) =>
//                 player.id ? (
//                   <motion.div
//                     key={index}
//                     className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:rotate-1"
//                     whileHover={{ scale: 1.05, rotate: 1 }}
//                   >
//                     <img
//                       src={`https://www.cricbuzz.com/a/img/v1/300x300/i1/c${player.imageId}/player-logos.jpg`}
//                       alt={player.name}
//                       className="w-full h-48 object-cover"
//                       onError={(e) => {
//                         e.target.src = 'https://via.placeholder.com/300';
//                       }}
//                     />
//                     <div className="p-4">
//                       <h2 className="text-xl font-semibold">{player.name}</h2>
//                       <p className="text-gray-400">Batting Style: {player.battingStyle}</p>
//                       {player.bowlingStyle && (
//                         <p className="text-gray-400">Bowling Style: {player.bowlingStyle}</p>
//                       )}
//                     </div>
//                   </motion.div>
//                 ) : (
//                   <h2 key={index} className="col-span-full text-xl font-semibold mt-4">
//                     {player.name}
//                   </h2>
//                 )
//               )}
//             </div>
//           ) : (
//             <div className="text-center">Loading Players Information...</div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Teams;






import React, { useEffect, useState } from 'react';
import options from '../../apiOptions';
import back from "../../../src/assets/images/back.jpg";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(
          'https://cricbuzz-cricket.p.rapidapi.com/teams/v1/international',
          options
        );

        if (!response.ok) {
          throw new Error('Failed to fetch teams');
        }

        const data = await response.json();
        if (data.list) {
          setTeams(data.list.filter((team) => team.teamId));
        } else {
          throw new Error('No teams data found');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const fetchPlayers = async (teamId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://cricbuzz-cricket.p.rapidapi.com/teams/v1/${teamId}/players`,
        options
      );

      if (!response.ok) {
        throw new Error('Failed to fetch players');
      }

      const data = await response.json();
      if (data.player) {
        setPlayers(data.player);
      } else {
        throw new Error('No players data found');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTeamClick = (teamId) => {
    setSelectedTeam(teamId);
    fetchPlayers(teamId);
  };

  const handleBackToTeams = () => {
    setSelectedTeam(null);
    setPlayers([]);
  };

  if (loading) {
    return (
      <div className="flex items-center bg-[#0c131a] justify-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6 bg-[#0c131a] min-h-screen font-my">
      {!selectedTeam ? (
        <>
          <h1 className="text-4xl my-9 font-bold text-center text-[#cfd1d3]">
            International Cricket Teams
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {teams.length > 0 ? (
              teams.map((team) => (
                <div
                  key={team.teamId}
                  className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 cursor-pointer"
                  onClick={() => handleTeamClick(team.teamId)}
                >
                  <img
                    className="w-full h-48 object-cover"
                    src={`https://www.cricbuzz.com/a/img/v1/300x300/i1/c${team.imageId}/team-logos.jpg`}
                    alt={team.teamName}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300';
                    }}
                  />
                  <div className="p-4 text-[#cfd1d3]">
                    <h2 className="text-xl font-bold">
                      {team.teamName}
                    </h2>
                    <p className="">{team.teamSName}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center bg-[#0c131a] text-gray-500">
                Loading Teams...
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="players-container font-my bg-[#0c131a] py-3">
          <button
            className=" flex flex-row items-center justify-center justify-items-center px-[16px] py-[11px] border-[1px] border-[#6eb5ef40] bg-[#6eb4ef14] rounded-md text-[#6eb4ef] mb-5 cursor-pointer font-medium "
            onClick={handleBackToTeams}
          >
            <img className="w-7 h-7" src={back} alt=""  />
            <p className="">Back to Series</p>
          </button>
          <h2 className=" font-my1 text-4xl font-extrabold text-center text-[#cfd1d3] px-6 my-3">Players</h2>
          {players.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
              {players.map((player, index) =>
                player.id ? (
                  <div
                    key={index}
                    className="bg-gray-800 text-[#cfd1d3] rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
                  >
                    <img
                      className="w-full h-48 object-cover"
                      src={`https://www.cricbuzz.com/a/img/v1/300x300/i1/c${player.imageId}/player-logos.jpg`}
                      alt={player.name}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300';
                      }}
                    />
                    <div className="p-4 text-[#cfd1d3]">
                      <h2 className="text-xl pb-2 font-medium font-my1 ">
                        {player.name}
                      </h2>
                      <p className="text-[#9a9b9c]">
                        <strong className='text-[#babdc1] font-bold'>Batting Style :</strong> {player.battingStyle}
                      </p>
                      {player.bowlingStyle && (
                        <p className="text-[#9a9b9c]">
                          <strong className='text-[#babdc1] font-bold'>Bowling Style :</strong> {player.bowlingStyle}
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <h2
                    key={index}
                    className="col-span-full text-2xl my-3 px-10 font-bold text-[#cfd1d3]"
                  >
                    {player.name}
                  </h2>
                )
              )}
            </div>
          ) : (
            <div className="text-center text-gray-500">Loading Players...</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Teams;




// import React, { useEffect, useState } from "react";
// import options from "../../apiOptions";

// const Teams = () => {
//   const [teams, setTeams] = useState([]);
//   const [players, setPlayers] = useState([]);
//   const [selectedTeam, setSelectedTeam] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchTeams = async () => {
//       try {
//         const response = await fetch(
//           "https://cricbuzz-cricket.p.rapidapi.com/teams/v1/international",
//           options
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch teams");
//         }

//         const data = await response.json();
//         if (data.list) {
//           setTeams(data.list.filter((team) => team.teamId));
//         } else {
//           throw new Error("No teams data found");
//         }
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTeams();
//   }, []);

//   const fetchPlayers = async (teamId) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(
//         `https://cricbuzz-cricket.p.rapidapi.com/teams/v1/${teamId}/players`,
//         options
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch players");
//       }

//       const data = await response.json();
//       if (data.player) {
//         setPlayers(data.player);
//       } else {
//         throw new Error("No players data found");
//       }
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTeamClick = (teamId) => {
//     setSelectedTeam(teamId);
//     fetchPlayers(teamId);
//   };

//   const handleBackToTeams = () => {
//     setSelectedTeam(null);
//     setPlayers([]);
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-6">
//       {!selectedTeam ? (
//         <div>
//           <h1 className="text-3xl font-bold text-center mb-6">International Cricket Teams</h1>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {teams.length > 0 ? (
//               teams.map((team) => (
//                 <div
//                   key={team.teamId}
//                   className="bg-gray-800 p-4 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
//                   onClick={() => handleTeamClick(team.teamId)}
//                 >
//                   <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-gray-700">
//                     <img
//                       src={`https://www.cricbuzz.com/a/img/v1/300x300/i1/c${team.imageId}/team-logos.jpg`}
//                       alt={team.teamName}
//                       onError={(e) => {
//                         e.target.src = "https://via.placeholder.com/300";
//                       }}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <h2 className="text-xl text-center mt-4">{team.teamName}</h2>
//                   <p className="text-center text-gray-400">{team.teamSName}</p>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center">Loading Teams...</div>
//             )}
//           </div>
//         </div>
//       ) : (
//         <div>
//           <button
//             className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md transition-all duration-200"
//             onClick={handleBackToTeams}
//           >
//             &larr; Back to Teams
//           </button>
//           <h2 className="text-3xl font-bold text-center my-6">Players</h2>
//           {players.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {players.map((player, index) =>
//                 player.id ? (
//                   <div
//                     key={index}
//                     className="bg-gray-800 p-4 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
//                   >
//                     <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-gray-700">
//                       <img
//                         src={`https://www.cricbuzz.com/a/img/v1/300x300/i1/c${player.imageId}/player-logos.jpg`}
//                         alt={player.name}
//                         onError={(e) => {
//                           e.target.src = "https://via.placeholder.com/300";
//                         }}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                     <h2 className="text-xl text-center mt-4">{player.name}</h2>
//                     <p className="text-center text-gray-400"><strong>Batting Style:</strong> {player.battingStyle}</p>
//                     {player.bowlingStyle && (
//                       <p className="text-center text-gray-400"><strong>Bowling Style:</strong> {player.bowlingStyle}</p>
//                     )}
//                   </div>
//                 ) : (
//                   <h2 key={index} className="text-center text-lg font-semibold mt-4">{player.name}</h2>
//                 )
//               )}
//             </div>
//           ) : (
//             <div className="text-center">Loading Players Information...</div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Teams;



// import React, { useEffect, useState } from "react";
// import options from "../../apiOptions";

// const Teams = () => {
//   const [teams, setTeams] = useState([]);
//   const [players, setPlayers] = useState([]);
//   const [selectedTeam, setSelectedTeam] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchTeams = async () => {
//       try {
//         const response = await fetch(
//           "https://cricbuzz-cricket.p.rapidapi.com/teams/v1/international",
//           options
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch teams");
//         }

//         const data = await response.json();
//         if (data.list) {
//           setTeams(data.list.filter((team) => team.teamId));
//         } else {
//           throw new Error("No teams data found");
//         }
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTeams();
//   }, []);

//   const fetchPlayers = async (teamId) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(
//         `https://cricbuzz-cricket.p.rapidapi.com/teams/v1/${teamId}/players`,
//         options
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch players");
//       }

//       const data = await response.json();
//       if (data.player) {
//         setPlayers(data.player);
//       } else {
//         throw new Error("No players data found");
//       }
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTeamClick = (teamId) => {
//     setSelectedTeam(teamId);
//     fetchPlayers(teamId);
//   };

//   const handleBackToTeams = () => {
//     setSelectedTeam(null);
//     setPlayers([]);
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-6">
//       {!selectedTeam ? (
//         <div>
//           <h1 className="text-3xl font-bold text-center mb-6">International Cricket Teams</h1>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
//             {teams.length > 0 ? (
//               teams.map((team) => (
//                 <div
//                   key={team.teamId}
//                   className="bg-gray-800 p-4 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer flex flex-col items-center"
//                   onClick={() => handleTeamClick(team.teamId)}
//                 >
//                   <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-700">
//                     <img
//                       src={`https://www.cricbuzz.com/a/img/v1/300x300/i1/c${team.imageId}/team-logos.jpg`}
//                       alt={team.teamName}
//                       onError={(e) => {
//                         e.target.src = "https://via.placeholder.com/300";
//                       }}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <h2 className="text-xl text-center mt-4 font-semibold">{team.teamName}</h2>
//                   <p className="text-center text-gray-400">{team.teamSName}</p>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center">Loading Teams...</div>
//             )}
//           </div>
//         </div>
//       ) : (
//         <div>
//           <button
//             className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md transition-all duration-200"
//             onClick={handleBackToTeams}
//           >
//             Back to Teams
//           </button>
//           <h2 className="text-3xl font-bold text-center my-6">Players</h2>
//           {players.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
//               {players.map((player, index) =>
//                 player.id ? (
//                   <div
//                     key={index}
//                     className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col items-center text-center"
//                   >
//                     <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-700">
//                       <img
//                         src={`https://www.cricbuzz.com/a/img/v1/300x300/i1/c${player.imageId}/player-logos.jpg`}
//                         alt={player.name}
//                         onError={(e) => {
//                           e.target.src = "https://via.placeholder.com/300";
//                         }}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                     <h2 className="text-xl font-semibold mt-4">{player.name}</h2>
//                     <p className="text-gray-400"><strong>Batting Style:</strong> {player.battingStyle}</p>
//                     {player.bowlingStyle && (
//                       <p className="text-gray-400"><strong>Bowling Style:</strong> {player.bowlingStyle}</p>
//                     )}
//                   </div>
//                 ) : (
//                   <h2 key={index} className="text-center text-lg font-semibold mt-4">{player.name}</h2>
//                 )
//               )}
//             </div>
//           ) : (
//             <div className="text-center">Loading Players Information...</div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Teams;




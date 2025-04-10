// import React from "react";
// import "./Cards.css";
// import { useNavigate } from "react-router-dom";
// // import { useSelector } from 'react-redux';
// import get from 'lodash/get';
// const MatchCard = (props) => {
//     const { matchesArr } = props;
//     const navigate = useNavigate();
//     let matchDesc = get(matchesArr, 'matchInfo.matchDesc');
//     let matchId = get(matchesArr, 'matchInfo.matchId');
//     let matchStatus = get(matchesArr, 'matchInfo.status');
//     let seriesName = get(matchesArr, 'matchInfo.seriesName');
//     let team1Name = get(matchesArr, 'matchInfo.team1.teamSName');
//     let team2Name = get(matchesArr, 'matchInfo.team2.teamSName');
//     let team1ScoreKey = get(matchesArr, 'matchScore.team1Score');
//     let team2ScoreKey = get(matchesArr, 'matchScore.team2Score');
//     let team1Score;
//     let team2Score;
//     let team1Wkts = 0;
//     let team2Wkts = 0;

//     // Because the Api does not return wicket key if wickets are 0.
//     if (team1ScoreKey) {
//         if (team1ScoreKey?.inngs1?.wickets) {
//             team1Wkts = team1ScoreKey.inngs1.wickets;
//         }
//         if (team1ScoreKey?.inngs2?.wickets) {
//             team1Wkts = team1ScoreKey.inngs2.wickets;
//         }
//     }

//     if (team2ScoreKey) {
//         if (team2ScoreKey?.inngs1?.wickets) {
//             team2Wkts = team2ScoreKey.inngs1.wickets;
//         }
//         if (team2ScoreKey?.inngs2?.wickets) {
//             team2Wkts = team2ScoreKey.inngs2.wickets;
//         }
//     }

//     //API does not return the teamScore object if the team hasn't batted yet.
//     if (team1ScoreKey) {
//         team1Score = `${team1ScoreKey?.inngs1?.runs}/${team1Wkts} (${team1ScoreKey?.inngs1?.overs} ov)`

//         if (team1ScoreKey?.inngs2) {
//             team1Score = `${team1ScoreKey?.inngs1?.runs} & ${team1ScoreKey?.inngs2?.runs}/${team1Wkts}`
//         }
//     }

//     if (team2ScoreKey && Object.keys(team2ScoreKey).length !== 0) {
//         team2Score = `${team2ScoreKey?.inngs1?.runs}/${team2Wkts} (${team2ScoreKey?.inngs1?.overs} ov)`

//         if (team2ScoreKey?.inngs2) {
//             team2Score = `${team2ScoreKey?.inngs1?.runs} &${team2ScoreKey?.inngs2?.runs}/${team2Wkts}`
//         }
//     }

//     const handleOnClick = () => {
//         navigate(`/match/${matchId}`);
//     }
//     return (
//         <div onClick={handleOnClick} className=' live-card'>
//             <span>{seriesName} - {matchDesc}</span>
//             <div className="match-details">
//                 <div className="score">
//                     <p>{team1Name}</p>
//                     <p>{team1Score}</p>
//                 </div>
//                 <div className="score">
//                     <p>{team2Name}</p>
//                     <p>{team2Score}</p>
//                 </div>
//             </div>
//             <div className="live-card-footer">
//                 <p>{matchStatus}</p>
//             </div>
//         </div>
//     )
// }

// export default MatchCard;



import React from "react";
import { useNavigate } from "react-router-dom";
import get from "lodash/get";
import arrow from "../../../assets/images/arrow.png";

const MatchCard = ({ matchesArr }) => {
  const navigate = useNavigate();

  let matchDesc = get(matchesArr, "matchInfo.matchDesc");
  let matchId = get(matchesArr, "matchInfo.matchId");
  let matchStatus = get(matchesArr, "matchInfo.status");
  let seriesName = get(matchesArr, "matchInfo.seriesName");
  let venue = get(matchesArr, "matchInfo.venueInfo.ground");
  let team1Name = get(matchesArr, "matchInfo.team1.teamSName");
  let team2Name = get(matchesArr, "matchInfo.team2.teamSName");
  let team1Img = get(matchesArr, "matchInfo.team1.imageId", "default1.png");
  let team2Img = get(matchesArr, "matchInfo.team2.imageId", "default2.png");

  let team1ScoreKey = get(matchesArr, "matchScore.team1Score");
  let team2ScoreKey = get(matchesArr, "matchScore.team2Score");

  let team1Score = team1ScoreKey ? `${team1ScoreKey?.inngs1?.runs}/${team1ScoreKey?.inngs1?.wickets} (${team1ScoreKey?.inngs1?.overs})` : "-";
  let team2Score = team2ScoreKey ? `${team2ScoreKey?.inngs1?.runs}/${team2ScoreKey?.inngs1?.wickets} (${team2ScoreKey?.inngs1?.overs})` : "-";

  const handleOnClick = () => {
    navigate(`/match/${matchId}`);
  };

  return (
    <div
      onClick={handleOnClick}
      className="bg-[#0c131a] font-my text-white mx-3 my-4 rounded-lg shadow-md cursor-pointer transform transition-transform duration-500 hover:scale-105 w-96 border-[1px] border-gray-700"
    >
      <div className="p-6  rounded-t-lg bg-[#141e289c]">
      {/* Header with Series Name and Expand Icon */}
      <div className="flex justify-between items-center text-gray-300 font-semibold text-lg ">
        <p className="pr-6">{seriesName}</p>
        <div className="h-11 w-11  ">
          <img className="w-7 h-7" src={arrow} alt="" />
        </div>
      </div>
      </div>


      <div className="p-6">
      {/* Match Description and Venue */}
      <div className="text-gray-400 text-sm mb-3">
        {matchDesc} , {venue}
      </div>

      {/* Teams & Scores */}
      <div className="flex flex-col gap-2">
        {/* Team 1 */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {/* <img src={`/images/${team1Img}`} alt={team1Name} className="w-6 h-6 rounded-full" /> */}
            <span className="text-white font-semibold">{team1Name}</span>
          </div>
          <span className="text-white font-bold">{team1Score}</span>
        </div>

        {/* Team 2 */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {/* <img src={`/images/${team2Img}`} alt={team2Name} className="w-6 h-6 rounded-full" /> */}
            <span className="text-white font-semibold">{team2Name}</span>
          </div>
          <span className="text-white font-bold">{team2Score}</span>
        </div>
      </div>

      {/* Match Status / Winning Info */}
      <div className="text-green-600 text-sm font-semibold mt-4">
        {matchStatus}
      </div>
      </div>

    </div>
  );
};

export default MatchCard;

// import React from 'react'
// import "./matchDetails.css"
// import RecentOvers from './RecentOvers';

// const Overview = (props) => {
//     const {  commentary, scorecard, team1ScoreObj, team2ScoreObj } = props;
//     let miniScore = commentary?.miniscore;

//     let team1Score = '';
//     let team2Score = '';

//     if(scorecard?.scoreCard?.[0]){
//         team1Score = `${team1ScoreObj?.teamShortName} ${team1ScoreObj?.innings1Runs}/${team1ScoreObj?.innings1Wickets} (${team1ScoreObj?.innings1Overs} overs)`;
//     }
//     if(scorecard?.scoreCard?.[1]){
//         team2Score = `${team2ScoreObj?.teamShortName} ${team2ScoreObj?.innings1Runs}/${team2ScoreObj?.innings1Wickets} (${team2ScoreObj?.innings1Overs} overs)`;
//     }

//     if (typeof team1ScoreObj?.innings2Runs !== 'undefined') {
//         team1Score = `${team1ScoreObj?.teamShortName} - ${team1ScoreObj?.innings1Runs} & ${team1ScoreObj?.innings2Runs}/${team1ScoreObj?.innings2Wickets} (${team1ScoreObj?.innings2Overs} overs) `
//     }
//     if (typeof team2ScoreObj?.innings2Runs !== 'undefined') {
//         team2Score = `${team2ScoreObj?.teamShortName} - ${team2ScoreObj?.innings1Runs} & ${team2ScoreObj?.innings2Runs}/${team2ScoreObj?.innings2Wickets} (${team2ScoreObj?.innings2Overs} overs) `
//     }
//     const refreshHandler = () => {
//         window.location.reload();
//       }




//     return (
//         <>
//             <div className="bg-gray-100 rounded-lg p-4 mb-4 shadow">
//                 <h2 className="m-0 py-1.5 text-lg text-gray-800 font-semibold">{team1Score}</h2>
//                 <h2 className="m-0 py-1.5 text-lg text-gray-800 font-semibold">{team2Score}</h2>
//                 <div className='flex justify-between items-center mt-2.5'>
//                     <p className="text-red-600 font-medium m-0">{miniScore?.status}</p>
//                     <br /><br />

//                     <button
//                         onClick={refreshHandler}
//                         className="bg-gradient-to-b from-gray-800 to-gray-600 text-white border-none rounded px-3 py-1.5 cursor-pointer text-sm hover:bg-blue-700 transition-colors"
//                     >
//                         ⟳ Refresh
//                     </button>
//                 </div>
//                 <RecentOvers recentOvsStats={miniScore?.recentOvsStats} />
//             </div>

//             <div className="scorecard-overview-2 bg-gray-700 rounded-lg p-4 mb-4 shadow w-100           ">
//                     <div className=" batting w-100 ">
//                         <div className="  player-name player ">
//                             <div ><p>Batter</p></div>
//                             <div>
//                                 <p>R</p>
//                                 <p>B</p>
//                                 <p>4s</p>
//                                 <p>6s</p>
//                                 <p>SR</p>
//                             </div>
//                         </div>

//                         <div className="player-name batter ">
//                             <div><p>{miniScore?.batsmanStriker?.batName}</p></div>
//                             <div>
//                                 <p>{miniScore?.batsmanStriker?.batRuns}</p>
//                                 <p>{miniScore?.batsmanStriker?.batBalls}</p>
//                                 <p>{miniScore?.batsmanStriker?.batFours}</p>
//                                 <p>{miniScore?.batsmanStriker?.batSixes}</p>
//                                 <p>{miniScore?.batsmanStriker?.batStrikeRate}</p>
//                             </div>
//                         </div>

//                         <div className="player-name batter">
//                             <div><p>{miniScore?.batsmanNonStriker?.batName}</p></div>
//                             <div>
//                                 <p>{miniScore?.batsmanNonStriker?.batRuns}</p>
//                                 <p>{miniScore?.batsmanNonStriker?.batBalls}</p>
//                                 <p>{miniScore?.batsmanNonStriker?.batFours}</p>
//                                 <p>{miniScore?.batsmanNonStriker?.batSixes}</p>
//                                 <p>{miniScore?.batsmanNonStriker?.batStrikeRate}</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className=" bowling w-100">
//                         <div className="player-name player">
//                             <div ><p>Bowler</p></div>
//                             <div>
//                                 <p>O</p>
//                                 <p>M</p>
//                                 <p>R</p>
//                                 <p>W</p>
//                                 <p>Eco</p>
//                             </div>
//                         </div>

//                         <div className="player-name bowler">
//                             <div><p>{miniScore?.bowlerStriker?.bowlName}</p></div>
//                             <div>
//                                 <p>{miniScore?.bowlerStriker?.bowlOvs}</p>
//                                 <p>{miniScore?.bowlerStriker?.bowlMaidens}</p>
//                                 <p>{miniScore?.bowlerStriker?.bowlRuns}</p>
//                                 <p>{miniScore?.bowlerStriker?.bowlWkts}</p>
//                                 <p>{miniScore?.bowlerStriker?.bowlEcon}</p>
//                             </div>
//                         </div>

//                         <div className="player-name bowler">
//                             <div><p>{miniScore?.bowlerNonStriker?.bowlName}</p></div>
//                             <div>
//                                 <p>{miniScore?.bowlerNonStriker?.bowlOvs}</p>
//                                 <p>{miniScore?.bowlerNonStriker?.bowlMaidens}</p>
//                                 <p>{miniScore?.bowlerNonStriker?.bowlRuns}</p>
//                                 <p>{miniScore?.bowlerNonStriker?.bowlWkts}</p>
//                                 <p>{miniScore?.bowlerNonStriker?.bowlEcon}</p>
//                             </div>
//                         </div>
//                     </div>


//             </div>

//             <div className="key-stats bg-gray-700 rounded-lg p-4 mb-4 shadow w-100 ">
//                 <div className='w-100'><p>Key Stats</p></div>
//                 <p>Partnership : {miniScore?.partnerShip?.runs}({miniScore?.partnerShip?.balls})</p>
//                 {miniScore?.lastWicket && <p>Last Wicket  : {miniScore?.lastWicket}</p>}
//                 <p>Current Run Rate : {miniScore?.currentRunRate}</p>
//                 {miniScore?.latestPerformance && <p>Last 10 Overs : {miniScore?.latestPerformance[0]?.runs} runs & {miniScore?.latestPerformance[0]?.wkts} wkts</p>}
//                 <p>Toss : {commentary?.matchHeader?.tossResults?.tossWinnerName} ({commentary?.matchHeader?.tossResults?.decision})</p>
//             </div>
//         </>
//     )
// }

// export default Overview



import React from 'react';
import RecentOvers from './RecentOvers';

const Overview = ({ commentary, scorecard, team1ScoreObj, team2ScoreObj }) => {
    let miniScore = commentary?.miniscore;

    let team1Score = '';
    let team2Score = '';

    if (scorecard?.scoreCard?.[0]) {
        team1Score = `${team1ScoreObj?.teamShortName} ${team1ScoreObj?.innings1Runs}/${team1ScoreObj?.innings1Wickets} (${team1ScoreObj?.innings1Overs} overs)`;
    }
    if (scorecard?.scoreCard?.[1]) {
        team2Score = `${team2ScoreObj?.teamShortName} ${team2ScoreObj?.innings1Runs}/${team2ScoreObj?.innings1Wickets} (${team2ScoreObj?.innings1Overs} overs)`;
    }

    if (typeof team1ScoreObj?.innings2Runs !== 'undefined') {
        team1Score = `${team1ScoreObj?.teamShortName} - ${team1ScoreObj?.innings1Runs} & ${team1ScoreObj?.innings2Runs}/${team1ScoreObj?.innings2Wickets} (${team1ScoreObj?.innings2Overs} overs)`;
    }
    if (typeof team2ScoreObj?.innings2Runs !== 'undefined') {
        team2Score = `${team2ScoreObj?.teamShortName} - ${team2ScoreObj?.innings1Runs} & ${team2ScoreObj?.innings2Runs}/${team2ScoreObj?.innings2Wickets} (${team2ScoreObj?.innings2Overs} overs)`;
    }

    const refreshHandler = () => {
        window.location.reload();
    };

    return (
        <div className="bg-gray-900 text-white p-6 rounded-xl shadow-md space-y-6">
            <div className="p-5 bg-gray-800 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold text-gray-200">{team1Score}</h2>
                <h2 className="text-xl font-bold text-gray-200">{team2Score}</h2>
                <div className='flex justify-between items-center mt-4'>
                    <p className="text-red-500 font-semibold">{miniScore?.status}</p>
                    <button onClick={refreshHandler} className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg transition shadow-md">⟳ Refresh</button>
                </div>
                <RecentOvers recentOvsStats={miniScore?.recentOvsStats} />
            </div>

            <div className="p-5 bg-gray-800 rounded-lg shadow-sm">
                <h3 className="text-yellow-400 text-lg font-bold mb-4">Batting</h3>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                    <p className="font-medium">Batter</p>
                    <div className="flex space-x-4 font-medium">
                        <p>R</p><p>B</p><p>4s</p><p>6s</p><p>SR</p>
                    </div>
                </div>
                {[miniScore?.batsmanStriker, miniScore?.batsmanNonStriker].map((batsman, index) => (
                    <div key={index} className="flex justify-between py-3 border-b border-gray-700">
                        <p>{batsman?.batName}</p>
                        <div className="flex space-x-4">
                            <p>{batsman?.batRuns}</p><p>{batsman?.batBalls}</p>
                            <p>{batsman?.batFours}</p><p>{batsman?.batSixes}</p>
                            <p>{batsman?.batStrikeRate}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-5 bg-gray-800 rounded-lg shadow-sm">
                <h3 className="text-yellow-400 text-lg font-bold mb-4">Bowling</h3>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                    <p className="font-medium">Bowler</p>
                    <div className="flex space-x-4 font-medium">
                        <p>O</p><p>M</p><p>R</p><p>W</p><p>Eco</p>
                    </div>
                </div>
                {[miniScore?.bowlerStriker, miniScore?.bowlerNonStriker].map((bowler, index) => (
                    <div key={index} className="flex justify-between py-3 border-b border-gray-700">
                        <p>{bowler?.bowlName}</p>
                        <div className="flex space-x-4">
                            <p>{bowler?.bowlOvs}</p><p>{bowler?.bowlMaidens}</p>
                            <p>{bowler?.bowlRuns}</p><p>{bowler?.bowlWkts}</p>
                            <p>{bowler?.bowlEcon}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-5 bg-gray-800 rounded-lg shadow-sm">
                <h3 className="text-yellow-400 text-lg font-bold mb-4">Key Stats</h3>
                <p>Partnership: {miniScore?.partnerShip?.runs} ({miniScore?.partnerShip?.balls})</p>
                {miniScore?.lastWicket && <p>Last Wicket: {miniScore?.lastWicket}</p>}
                <p>Current Run Rate: {miniScore?.currentRunRate}</p>
                {miniScore?.latestPerformance && <p>Last 10 Overs: {miniScore?.latestPerformance[0]?.runs} runs & {miniScore?.latestPerformance[0]?.wkts} wkts</p>}
                <p>Toss: {commentary?.matchHeader?.tossResults?.tossWinnerName} ({commentary?.matchHeader?.tossResults?.decision})</p>
            </div>
        </div>
    );
};

export default Overview;
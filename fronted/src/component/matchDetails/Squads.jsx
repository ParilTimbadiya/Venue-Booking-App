// import React from 'react'
// import { useNavigate } from 'react-router-dom';
// import "./Squads.css"
// import { Link } from 'react-router-dom';

// const Squads = (props) => {
//   const { matchInfo } = props;
//   const navigate = useNavigate();

//   let team1Squad = matchInfo?.team1?.playerDetails
//   let team2Squad = matchInfo?.team2?.playerDetails
//   // const playerDetailsRedirect = (item) => {
//   //   navigate(`player/${item?.id}`)
//   // }
//   return (
//     <div className='squad-container'>
//       <div className='team-name-header'>
//         <span>{matchInfo?.team1?.name}</span>
//         <span>{matchInfo?.team2?.name}</span>
//       </div>
//       <div className='text-center text-3xl my-4 font-bold text-gray-300'><p>Playing XI</p></div>
//       <div className="squads">

//         {/* team1 players */}
//         <div>
//           {
//             team1Squad && team1Squad.slice(0, 11).map((item) =>
//               <span style={item?.playingXIChange === "IN" ? { "backgroundColor": "#daf1ebb0" } : {}} key={item.id} >
//                 <Link >
//                   <p className='teamPlayerName'> {item?.fullName}  {item?.captain === true ? "(C)" : ""}  {item?.keeper === true ? "(WK)" : ""}  {item?.playingXIChange === "IN" ? "▲" : ""}</p>
//                   <p className='teamPlayerRole'>{item?.role}</p>
//                 </Link>
//               </span>
//             )
//           }

//         </div>


//         {/* team2 players */}
//         <div>
//           {
//             team2Squad && team2Squad.slice(0, 11).map((item) =>
//               // <span key={item?.id} >
//               <span style={item?.playingXIChange === "IN" ? { "backgroundColor": "#daf1ebb0" } : {}} key={item.id} >
//                 <Link >
//                   <p className='teamPlayerName' > {item?.playingXIChange === "IN" ? "▲" : ""} {item?.captain === true ? "(C)" : ""} {item?.keeper === true ? "(WK)" : ""} {item?.fullName}</p>
//                   <p className='teamPlayerRole' >{item?.role}</p>
//                 </Link>
//               </span>
//             )
//           }

//         </div>

//       </div>


//       <div className='playing11'><p>Bench</p></div>

//       <div className="squads">
//         <div>
//           {
//             team1Squad && team1Squad.slice(11, team1Squad?.length).map((item) =>
//               <span style={item?.playingXIChange === "OUT" ? { "backgroundColor": "#fff4f4" } : {}} key={item.id} >
//                 <Link >
//                   <p className='teamPlayerName'>{item?.fullName} {item?.playingXIChange === "OUT" ? "▼" : ""} </p>
//                   <p className='teamPlayerRole' >{item?.role}</p>
//                 </Link>
//               </span>
//             )
//           }
//         </div>
//         <div>
//           {
//             team2Squad && team2Squad.slice(11, team2Squad?.length).map((item) =>
//               <span style={item?.playingXIChange === "OUT" ? { "backgroundColor": "#fff4f4" } : {}} key={item.id} >
//                 <Link > 
//                   <p className='teamPlayerName'> {item?.playingXIChange === "OUT" ? "▼" : ""} {item?.fullName}</p>
//                   <p className='teamPlayerRole'>{item?.role}</p>
//                  </Link> 
//               </span>
              
//             )
//           }
//         </div>

//       </div>


//     </div >
//   )
// }

// export default Squads




// import React from 'react'
// import { Link } from 'react-router-dom';

// const Squads = (props) => {
//   const { matchInfo } = props;

//   let team1Squad = matchInfo?.team1?.playerDetails;
//   let team2Squad = matchInfo?.team2?.playerDetails;

//   return (
//     <div className="p-4 space-y-6">
//       {/* Header: Team names */}
//       <div className="flex justify-between text-xl font-semibold text-gray-800">
//         <span>{matchInfo?.team1?.name}</span>
//         <span>{matchInfo?.team2?.name}</span>
//       </div>

//       {/* Playing XI title */}
//       <div className="text-center text-2xl font-bold text-gray-600 mt-4 mb-2">
//         <p>Playing XI</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//         {/* Team 1 Players */}
//         <div>
//           {team1Squad && team1Squad.slice(0, 11).map((item) => (
//             <div
//               key={item.id}
//               className={`p-2 mb-2 border rounded-lg ${
//                 item?.playingXIChange === 'IN' ? 'bg-green-100' : ''
//               }`}
//             >
//               <Link>
//                 <p className="font-semibold text-gray-700">
//                   {item?.fullName} 
//                   {item?.captain && "(C)"} 
//                   {item?.keeper && "(WK)"} 
//                   {item?.playingXIChange === 'IN' && "▲"}
//                 </p>
//                 <p className="text-sm text-gray-500">{item?.role}</p>
//               </Link>
//             </div>
//           ))}
//         </div>

//         {/* Team 2 Players */}
//         <div>
//           {team2Squad && team2Squad.slice(0, 11).map((item) => (
//             <div
//               key={item.id}
//               className={`p-2 mb-2 border rounded-lg ${
//                 item?.playingXIChange === 'IN' ? 'bg-green-100' : ''
//               }`}
//             >
//               <Link>
//                 <p className="font-semibold text-gray-700">
//                   {item?.playingXIChange === 'IN' && "▲"} 
//                   {item?.captain && "(C)"} 
//                   {item?.keeper && "(WK)"} 
//                   {item?.fullName}
//                 </p>
//                 <p className="text-sm text-gray-500">{item?.role}</p>
//               </Link>
//             </div>
//           ))}
//         </div>

//       </div>

//       {/* Bench title */}
//       <div className="text-center text-xl font-bold text-gray-600 mt-6 mb-2">
//         <p>Bench</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//         {/* Team 1 Bench */}
//         <div>
//           {team1Squad && team1Squad.slice(11).map((item) => (
//             <div
//               key={item.id}
//               className={`p-2 mb-2 border rounded-lg ${
//                 item?.playingXIChange === 'OUT' ? 'bg-red-100' : ''
//               }`}
//             >
//               <Link>
//                 <p className="font-semibold text-gray-700">
//                   {item?.fullName} 
//                   {item?.playingXIChange === 'OUT' && "▼"}
//                 </p>
//                 <p className="text-sm text-gray-500">{item?.role}</p>
//               </Link>
//             </div>
//           ))}
//         </div>

//         {/* Team 2 Bench */}
//         <div>
//           {team2Squad && team2Squad.slice(11).map((item) => (
//             <div
//               key={item.id}
//               className={`p-2 mb-2 border rounded-lg ${
//                 item?.playingXIChange === 'OUT' ? 'bg-red-100' : ''
//               }`}
//             >
//               <Link>
//                 <p className="font-semibold text-gray-700">
//                   {item?.playingXIChange === 'OUT' && "▼"} 
//                   {item?.fullName}
//                 </p>
//                 <p className="text-sm text-gray-500">{item?.role}</p>
//               </Link>
//             </div>
//           ))}
//         </div>

//       </div>

//     </div>
//   );
// };

// export default Squads;




import React from 'react';
import { Link } from 'react-router-dom';

const Squads = (props) => {
  const { matchInfo } = props;

  let team1Squad = matchInfo?.team1?.playerDetails;
  let team2Squad = matchInfo?.team2?.playerDetails;

  return (
    <div className="p-6 space-y-8 bg-[#11182797] rounded-lg text-gray-100">
      {/* Header: Team names */}
      <div className="flex justify-between text-xl font-semibold">
        <span className="text-gray-300">{matchInfo?.team1?.name}</span>
        <span className="text-gray-300">{matchInfo?.team2?.name}</span>
      </div>

      {/* Playing XI title */}
      <div className="text-center text-2xl font-bold text-gray-300 mt-4 mb-2">
        <p>Playing XI</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Team 1 Players */}
        <div>
          {team1Squad && team1Squad.slice(0, 11).map((item) => (
            <div
              key={item.id}
              className={`p-4 mb-4 border rounded-lg ${
                item?.playingXIChange === 'IN'
                  ? 'bg-green-700 border-green-600'
                  : 'bg-gray-800 border-gray-600'
              } shadow-md hover:shadow-xl transition-shadow duration-300`}
            >
              <Link>
                <p className="font-semibold text-gray-100">
                  {item?.fullName} 
                  {item?.captain && "(C)"} 
                  {item?.keeper && "(WK)"} 
                  {item?.playingXIChange === 'IN' && "▲"}
                </p>
                <p className="text-sm text-gray-400">{item?.role}</p>
              </Link>
            </div>
          ))}
        </div>

        {/* Team 2 Players */}
        <div>
          {team2Squad && team2Squad.slice(0, 11).map((item) => (
            <div
              key={item.id}
              className={`p-4 mb-4 border rounded-lg ${
                item?.playingXIChange === 'IN'
                  ? 'bg-green-700 border-green-600'
                  : 'bg-gray-800 border-gray-600'
              } shadow-md hover:shadow-xl transition-shadow duration-300`}
            >
              <Link>
                <p className="font-semibold text-gray-100">
                  {item?.playingXIChange === 'IN' && "▲"} 
                  {item?.captain && "(C)"} 
                  {item?.keeper && "(WK)"} 
                  {item?.fullName}
                </p>
                <p className="text-sm text-gray-400">{item?.role}</p>
              </Link>
            </div>
          ))}
        </div>

      </div>

      {/* Bench title */}
      <div className="text-center text-xl font-bold text-gray-300 mt-6 mb-2">
        <p>Bench</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Team 1 Bench */}
        <div>
          {team1Squad && team1Squad.slice(11).map((item) => (
            <div
              key={item.id}
              className={`p-4 mb-4 border rounded-lg ${
                item?.playingXIChange === 'OUT'
                  ? 'bg-red-700 border-red-600'
                  : 'bg-gray-800 border-gray-600'
              } shadow-md hover:shadow-xl transition-shadow duration-300`}
            >
              <Link>
                <p className="font-semibold text-gray-100">
                  {item?.fullName} 
                  {item?.playingXIChange === 'OUT' && "▼"}
                </p>
                <p className="text-sm text-gray-400">{item?.role}</p>
              </Link>
            </div>
          ))}
        </div>

        {/* Team 2 Bench */}
        <div>
          {team2Squad && team2Squad.slice(11).map((item) => (
            <div
              key={item.id}
              className={`p-4 mb-4 border rounded-lg ${
                item?.playingXIChange === 'OUT'
                  ? 'bg-red-700 border-red-600'
                  : 'bg-gray-800 border-gray-600'
              } shadow-md hover:shadow-xl transition-shadow duration-300`}
            >
              <Link>
                <p className="font-semibold text-gray-100">
                  {item?.playingXIChange === 'OUT' && "▼"} 
                  {item?.fullName}
                </p>
                <p className="text-sm text-gray-400">{item?.role}</p>
              </Link>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

export default Squads;







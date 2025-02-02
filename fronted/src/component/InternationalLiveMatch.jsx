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
//     <div className="main-container">
//       {/* <div className="container min-h-screen bg-gray-900 flex flex-column  flex-nowrap items-center justify-center p-2"> */}
//       <div className="container min-h-screen bg-gray-900 grid m-auto grid-cols-3 gap-3 p-2">
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

import React, { useEffect, useState } from "react";
import mockData from "./mocks/livescoredata.json";

const InternationalLiveMatch = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  // Use the mock data on component mount
  useEffect(() => {
    setData(mockData.data); // Assuming your JSON structure is { data: [...] }
  }, []);

  return (
    <div className="main-container">
      <div className="min-h-screen bg-gray-900 grid m-auto grid-cols-3 gap-3 p-2">
        {data.length > 0 ? (
          data
            .filter((curVal) => {
              // Filter out matches that haven't started
              if (curVal.status !== "Match not started") {
                // Filter based on the search term
                return (
                  curVal.series.toLowerCase().includes(search.toLowerCase()) ||
                  curVal.t1.toLowerCase().includes(search.toLowerCase()) ||
                  curVal.t2.toLowerCase().includes(search.toLowerCase())
                );
              }
              return false;
            })
            .map((curVal, index) => (
              <div
                key={index}
                className="flex items-center justify-center bg-gray-900 p-2"
              >
                {/* <div className="bg-blue-300 h-60 rounded-2xl p-4 w-80 relative shadow-lg"> */}
                <div className="bg-blue-300 h-64 select-none cursor-pointer rounded-2xl p-4 w-80 relative shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2">
                  {/* Live Indicator */}
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    🔴 Live
                  </div>

                  <div className="mt-6">
                    {/* Match Info */}
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      {curVal.matchType} : {curVal.series}
                    </p>

                    {/* Team 1 Info */}
                    <div>
                      <p className="text-base font-bold text-gray-800">
                        {curVal.t1}
                      </p>
                    </div>
                    <div className="flex items-center mb-2">
                      <img
                        src={curVal.t1img}
                        alt="team1"
                        className="w-6 h-6 mr-2 rounded-full"
                      />
                      <span className="text-sm font-semibold text-gray-600 ml-1">
                        {curVal.t1s}
                      </span>
                    </div>
                    

                    {/* Team 2 Info */}
                    <div>
                      <p className="text-base font-bold text-gray-800">
                        {curVal.t2}
                      </p>
                    </div>
                    <div className="flex items-center mb-2">
                      <img
                        src={curVal.t2img}
                        alt="team 2"
                        className="w-6 h-6 mr-2 rounded-full"
                      />
                      <span className="text-sm font-semibold text-gray-600 ml-1">
                        {curVal.t2s}
                      </span>
                    </div>
                    

                    {/* Match Status */}
                    <p className="text-sm text-gray-700">{curVal.status}</p>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <p className="text-white text-center col-span-3">Data Not Found!</p>
        )}
      </div>
    </div>
  );
};

export default InternationalLiveMatch;

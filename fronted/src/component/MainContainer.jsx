// import React from "react";
// import { useEffect } from "react";
// import Sidebar from "./Sidebar";
// import InternationalLiveMatch from "./InternationalLiveMatch";

// const MainConainer = () => {

//     useEffect(() => {
//         fetch("https://www.cricbuzz.com/") // Replace with the target website
//           .then((response) => response.text()) // Get HTML as text
//           .then((html) => {
//             console.log(html); // This contains the whole HTML of the page
//           })
//           .catch((error) => console.error("Error fetching data:", error));
//       }, []);
      


    
//     return(
//         <div className=" border-red-800 border-2 bg-gray-900 h-screen relative top-[76.67px]">
//             <div className="">
//                 {/* <Sidebar/> */}
//                 <h1 className="text-white">hey!</h1>
//             </div>
//         </div>
//     );
// };

// export default MainConainer;


import React from "react";
import { useEffect, useState } from "react";

function MainConainer() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/scrape") // Fetch from backend
      .then((response) => response.json())
      .then((data) => setMatches(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  console.log(matches);

  return (
    <div>
      <h2>Live Cricket Matches</h2>
      {matches.length > 0 ? (
        <ul>
          {matches.map((match, index) => (
            <li key={index}>
              <a href={match.link} target="_blank" rel="noopener noreferrer">
                {match.title}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MainConainer;

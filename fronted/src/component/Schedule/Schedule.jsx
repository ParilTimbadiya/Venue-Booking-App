// import React, { useState, useEffect } from "react";
// // import "./Schedule.css";
// import { fetchSchedule } from "./../../redux/Reducers/scheduleSlice";
// import { useDispatch, useSelector } from "react-redux";

// const Schedule = () => {
//   const [activeTab, setActiveTab] = useState("international");
//   const dispatch = useDispatch();
//   const { schedule, loading, rejected } = useSelector(
//     (state) => state.schedule
//   );
//   let matchesArr = schedule?.matchScheduleMap;

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//     dispatch(fetchSchedule(tab));
//   };

//   useEffect(() => {
//     dispatch(fetchSchedule("international"));
//   }, [dispatch]);

//   const matchTimeExtractor = (epochTimestamp) => {
//     const startDate = new Date(parseInt(epochTimestamp));
//     const hours = startDate.getHours().toString().padStart(2, "0");
//     const minutes = startDate.getMinutes().toString().padStart(2, "0");
//     const seconds = startDate.getSeconds().toString().padStart(2, "0");
//     const amPm = hours >= 12 ? "PM" : "AM";
//     const formattedHours =
//       hours > 12 ? (hours - 12).toString().padStart(2, "0") : hours;

//     // Get the time zone offset in minutes to show the utc offset along with the time
//     const timezoneOffset = startDate.getTimezoneOffset();
//     const offsetHours = Math.floor(Math.abs(timezoneOffset / 60))
//       .toString()
//       .padStart(2, "0");
//     const offsetMinutes = (Math.abs(timezoneOffset) % 60)
//       .toString()
//       .padStart(2, "0");
//     const offsetSign = timezoneOffset > 0 ? "-" : "+";
//     const utcOffset = `UTC${offsetSign}${offsetHours}:${offsetMinutes}`;
//     return `${formattedHours}:${minutes}:${seconds} ${amPm} (${utcOffset})`;
//   };

//   const renderMatchesContent = () => {
//     if (loading) {
//       return (
//         <div className="loaderContainer">
//           <div className="loader"></div>
//         </div>
//       );
//     }

//     if (rejected) {
//       return (
//         <div className="errorContainer">
//           <h3>Error loading schedule data</h3>
//           <p>Please try again later</p>
//         </div>
//       );
//     }

//     return (
//       <>
//         {matchesArr &&
//           matchesArr
//             ?.filter((x) => x.scheduleAdWrapper?.date !== undefined)
//             .map((item, index) => (
//               <div key={index} className="scheduledMatches">
//                 <div className="scheduledMatchDate">
//                   <p>{item?.scheduleAdWrapper?.date}</p>
//                 </div>
//                 {item.scheduleAdWrapper.matchScheduleList &&
//                   item.scheduleAdWrapper.matchScheduleList.map(
//                     (matchItem, matchIndex) => (
//                       <div key={matchIndex} className="scheduledMatchInfo">
//                         <div className="seriesName">
//                           <p>{matchItem.seriesName}</p>
//                         </div>
//                         <div className="teamsInfo">
//                           <p>
//                             {matchItem?.matchInfo?.[0]?.team1?.teamName} vs{" "}
//                             {matchItem?.matchInfo?.[0]?.team2?.teamName},{" "}
//                             {matchItem?.matchInfo?.[0]?.matchDesc}
//                           </p>
//                           <p>
//                             {matchItem?.matchInfo?.[0]?.venueInfo?.ground},{" "}
//                             {matchItem?.matchInfo?.[0]?.venueInfo?.city}{" "}
//                           </p>
//                         </div>
//                         <div className="scheduledMatchTime">
//                           <p>{`${matchTimeExtractor(
//                             matchItem?.matchInfo?.[0]?.startDate
//                           )}`}</p>
//                         </div>
//                       </div>
//                     )
//                   )}
//               </div>
//             ))}
//       </>
//     );
//   };

//   return (
//     <div className="scheduleContainer">
//       <div className="scheduleHeader">
//         <div>
//           <h1>Schedule Matches </h1>
//         </div>
//         <div className="scheduleOptions">

//           <span
//             onClick={() => handleTabChange("international")}
//             className={activeTab === "international" ? "active" : ""}
//           >
//             International
//           </span>
//           <span
//             onClick={() => handleTabChange("women")}
//             className={activeTab === "women" ? "active" : ""}
//           >
//             Women
//           </span>
//           <span
//             onClick={() => handleTabChange("league")}
//             className={activeTab === "league" ? "active" : ""}
//           >
//             League
//           </span>
//           <span
//             onClick={() => handleTabChange("domestic")}
//             className={activeTab === "domestic" ? "active" : ""}
//           >
//             Domestic
//           </span>
//         </div>
//       </div>

//       {renderMatchesContent()}
//     </div>
//   );
// };

// export default Schedule;





import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSchedule } from "./../../redux/Reducers/scheduleSlice";

const Schedule = () => {
  const [activeTab, setActiveTab] = useState("international");
  const dispatch = useDispatch();
  const { schedule, loading, rejected } = useSelector((state) => state.schedule);
  let matchesArr = schedule?.matchScheduleMap;

  useEffect(() => {
    dispatch(fetchSchedule("international"));
  }, [dispatch]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    dispatch(fetchSchedule(tab));
  };

  const matchTimeExtractor = (epochTimestamp) => {
    const startDate = new Date(parseInt(epochTimestamp));
    const hours = startDate.getHours().toString().padStart(2, "0");
    const minutes = startDate.getMinutes().toString().padStart(2, "0");
    const amPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours > 12 ? (hours - 12).toString().padStart(2, "0") : hours;

    return `${formattedHours}:${minutes} ${amPm}`;
  };

  const renderMatchesContent = () => {
    if (loading) {
      return <div className="text-center text-gray-400">Loading schedule...</div>;
    }

    if (rejected) {
      return <div className="text-center text-red-500">Error loading schedule data</div>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matchesArr &&
          matchesArr
            .filter((x) => x.scheduleAdWrapper?.date !== undefined)
            .map((item, index) => (
              <div key={index} className="bg-[#1e293b] rounded-xl p-5 shadow-lg">
                <h3 className="text-lg font-semibold text-[#6eb4ef] mb-2">
                  {item?.scheduleAdWrapper?.date}
                </h3>
                {item.scheduleAdWrapper.matchScheduleList &&
                  item.scheduleAdWrapper.matchScheduleList.map((matchItem, matchIndex) => (
                    <div key={matchIndex} className="p-3 border-l-4 border-[#6eb4ef] my-2">
                      <p className="text-white font-medium">{matchItem.seriesName}</p>
                      <p className="text-gray-300">
                        {matchItem?.matchInfo?.[0]?.team1?.teamName} vs{" "}
                        {matchItem?.matchInfo?.[0]?.team2?.teamName},{" "}
                        {matchItem?.matchInfo?.[0]?.matchDesc}
                      </p>
                      <p className="text-gray-400">
                        {matchItem?.matchInfo?.[0]?.venueInfo?.ground},{" "}
                        {matchItem?.matchInfo?.[0]?.venueInfo?.city}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {matchTimeExtractor(matchItem?.matchInfo?.[0]?.startDate)}
                      </p>
                    </div>
                  ))}
              </div>
            ))}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-my font-bold text-gray-300 text-center my-6">
        Scheduled Matches
      </h1>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 my-14">
        {["international", "women", "league", "domestic"].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`px-5 py-2 rounded-lg font-medium transition duration-300 
              ${
                activeTab === tab
                  ? "px-[16px] py-[11px] border-[1px] border-[#6eb5ef40] bg-[#6eb4ef14] rounded-md text-[#6eb4ef] mx-2 cursor-pointer font-medium"
                  : "text-[#9fa3a7] px-[16px] py-[11px] border-[1px] border-[#9fa3a740] rounded-md mx-2 cursor-pointer font-medium "
              }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Matches */}
      {renderMatchesContent()}
    </div>
  );
};

export default Schedule;


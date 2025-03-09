import React, { useState, useEffect } from "react";
import "./Schedule.css";
import { fetchSchedule } from "./../../redux/Reducers/scheduleSlice";
import { useDispatch, useSelector } from "react-redux";

const Schedule = () => {
  const [activeTab, setActiveTab] = useState("international");
  const dispatch = useDispatch();
  const { schedule, loading, rejected } = useSelector(
    (state) => state.schedule
  );
  let matchesArr = schedule?.matchScheduleMap;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    dispatch(fetchSchedule(tab));
  };

  useEffect(() => {
    dispatch(fetchSchedule("international"));
  }, [dispatch]);

  const matchTimeExtractor = (epochTimestamp) => {
    const startDate = new Date(parseInt(epochTimestamp));
    const hours = startDate.getHours().toString().padStart(2, "0");
    const minutes = startDate.getMinutes().toString().padStart(2, "0");
    const seconds = startDate.getSeconds().toString().padStart(2, "0");
    const amPm = hours >= 12 ? "PM" : "AM";
    const formattedHours =
      hours > 12 ? (hours - 12).toString().padStart(2, "0") : hours;

    // Get the time zone offset in minutes to show the utc offset along with the time
    const timezoneOffset = startDate.getTimezoneOffset();
    const offsetHours = Math.floor(Math.abs(timezoneOffset / 60))
      .toString()
      .padStart(2, "0");
    const offsetMinutes = (Math.abs(timezoneOffset) % 60)
      .toString()
      .padStart(2, "0");
    const offsetSign = timezoneOffset > 0 ? "-" : "+";
    const utcOffset = `UTC${offsetSign}${offsetHours}:${offsetMinutes}`;
    return `${formattedHours}:${minutes}:${seconds} ${amPm} (${utcOffset})`;
  };

  const renderMatchesContent = () => {
    if (loading) {
      return (
        <div className="loaderContainer">
          <div className="loader"></div>
        </div>
      );
    }

    if (rejected) {
      return (
        <div className="errorContainer">
          <h3>Error loading schedule data</h3>
          <p>Please try again later</p>
        </div>
      );
    }

    return (
      <>
        {matchesArr &&
          matchesArr
            ?.filter((x) => x.scheduleAdWrapper?.date !== undefined)
            .map((item, index) => (
              <div key={index} className="scheduledMatches">
                <div className="scheduledMatchDate">
                  <p>{item?.scheduleAdWrapper?.date}</p>
                </div>
                {item.scheduleAdWrapper.matchScheduleList &&
                  item.scheduleAdWrapper.matchScheduleList.map(
                    (matchItem, matchIndex) => (
                      <div key={matchIndex} className="scheduledMatchInfo">
                        <div className="seriesName">
                          <p>{matchItem.seriesName}</p>
                        </div>
                        <div className="teamsInfo">
                          <p>
                            {matchItem?.matchInfo?.[0]?.team1?.teamName} vs{" "}
                            {matchItem?.matchInfo?.[0]?.team2?.teamName},{" "}
                            {matchItem?.matchInfo?.[0]?.matchDesc}
                          </p>
                          <p>
                            {matchItem?.matchInfo?.[0]?.venueInfo?.ground},{" "}
                            {matchItem?.matchInfo?.[0]?.venueInfo?.city}{" "}
                          </p>
                        </div>
                        <div className="scheduledMatchTime">
                          <p>{`${matchTimeExtractor(
                            matchItem?.matchInfo?.[0]?.startDate
                          )}`}</p>
                        </div>
                      </div>
                    )
                  )}
              </div>
            ))}
      </>
    );
  };

  return (
    <div className="scheduleContainer">
      <div className="scheduleHeader">
        <div>
          <h1>Schedule Matches </h1>
        </div>
        <div className="scheduleOptions">
          
          <span
            onClick={() => handleTabChange("international")}
            className={activeTab === "international" ? "active" : ""}
          >
            International
          </span>
          <span
            onClick={() => handleTabChange("women")}
            className={activeTab === "women" ? "active" : ""}
          >
            Women
          </span>
          <span
            onClick={() => handleTabChange("league")}
            className={activeTab === "league" ? "active" : ""}
          >
            League
          </span>
          <span
            onClick={() => handleTabChange("domestic")}
            className={activeTab === "domestic" ? "active" : ""}
          >
            Domestic
          </span>
        </div>
      </div>

      {renderMatchesContent()}
    </div>
  );
};

export default Schedule;
import React, { useState, useEffect } from "react";
// import "./Matches.css";
import MatchCard from "../Home/Cards/MatchCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchLiveData } from "../../redux/Reducers/liveMatchesSlice";
import { fetchRecentData } from "../../redux/Reducers/recentMatchesSlice";
import Loader from "../Loader/Loader.jsx";
import Error from "../Error/Error.jsx";

const Matches = () => {
  const [internationalActive, setInternationalActive] = useState(true);
  const [womenActive, setWomenActive] = useState(false);
  const [leagueActive, setLeagueActive] = useState(false);
  const [domesticActive, setDomesticActive] = useState(false);
  const { liveMatches, loading, liveRejected } = useSelector(
    (state) => state.liveMatches
  );
  const { recentMatches, recentRejected } = useSelector(
    (state) => state.recentMatches
  );
  const dispatch = useDispatch();
  const typeMatchesLive = liveMatches.typeMatches;
  const typeMatchesRecent = recentMatches.typeMatches;
  // const seriesMatchesLive = liveMatches.typeMatches;
  const activeOptionsHandlerIntl = () => {
    setInternationalActive(true);
    setWomenActive(false);
    setLeagueActive(false);
    setDomesticActive(false);
  };
  const activeOptionsHandlerWomen = () => {
    setInternationalActive(false);
    setWomenActive(true);
    setLeagueActive(false);
    setDomesticActive(false);
  };
  const activeOptionsHandlerLeague = () => {
    setInternationalActive(false);
    setWomenActive(false);
    setLeagueActive(true);
    setDomesticActive(false);
  };
  const activeOptionsHandlerDomestic = () => {
    setInternationalActive(false);
    setWomenActive(false);
    setLeagueActive(false);
    setDomesticActive(true);
  };

  // International Matches
  let intlLiveMatchesArr = typeMatchesLive?.[0]?.seriesMatches?.flatMap(
    (seriesMatch) => {
      return seriesMatch?.seriesAdWrapper?.matches ?? [];
    }
  );
  let intlRecentMatchesArr = typeMatchesRecent?.[0]?.seriesMatches?.flatMap(
    (seriesMatch) => {
      return seriesMatch?.seriesAdWrapper?.matches ?? [];
    }
  );
  // Women Matches
  let womenLiveMatchesArr = typeMatchesLive?.[3]?.seriesMatches?.flatMap(
    (seriesMatch) => {
      return seriesMatch?.seriesAdWrapper?.matches ?? [];
    }
  );
  let womenRecentMatchesArr = typeMatchesRecent?.[3]?.seriesMatches?.flatMap(
    (seriesMatch) => {
      return seriesMatch?.seriesAdWrapper?.matches ?? [];
    }
  );
  // League Matches
  let leagueLiveMatchesArr = typeMatchesLive?.[1]?.seriesMatches?.flatMap(
    (seriesMatch) => {
      return seriesMatch?.seriesAdWrapper?.matches ?? [];
    }
  );
  let leagueRecentMatchesArr = typeMatchesRecent?.[1]?.seriesMatches?.flatMap(
    (seriesMatch) => {
      return seriesMatch?.seriesAdWrapper?.matches ?? [];
    }
  );
  // Domestic Matches
  let domesticLiveMatchesArr = typeMatchesLive?.[2]?.seriesMatches?.flatMap(
    (seriesMatch) => {
      return seriesMatch?.seriesAdWrapper?.matches ?? [];
    }
  );
  let domesticRecentMatchesArr = typeMatchesRecent?.[2]?.seriesMatches?.flatMap(
    (seriesMatch) => {
      return seriesMatch?.seriesAdWrapper?.matches ?? [];
    }
  );

  useEffect(() => {
    dispatch(fetchLiveData());
    dispatch(fetchRecentData());
  }, [dispatch]);

  return (
    <>
      {
        <>
          {liveRejected && recentRejected ? (
            <Error />
          ) : (
            <div className="bg-[#0c131a]">
              <div>
                <div className=" p-8 flex flex-row align-middle justify-items-center">
                  <span
                    onClick={activeOptionsHandlerIntl}
                    className={internationalActive === true ? "px-[16px] py-[11px] border-[1px] border-[#6eb5ef40] bg-[#6eb4ef14] rounded-md text-[#6eb4ef] mx-2 cursor-pointer font-medium" : "text-[#9fa3a7] px-[16px] py-[11px] border-[1px] border-[#9fa3a740] rounded-md mx-2 cursor-pointer font-medium "}
                  >
                    International
                  </span>
                  <span
                    onClick={activeOptionsHandlerWomen}
                    className={womenActive === true ? "px-[16px] py-[11px] border-[1px] border-[#6eb5ef40] bg-[#6eb4ef14] rounded-md text-[#6eb4ef] mx-2 cursor-pointer font-medium" : "text-[#9fa3a7] px-[16px] py-[11px] border-[1px] border-[#9fa3a740] rounded-md mx-2 cursor-pointer font-medium "}
                  >
                    Women
                  </span>
                  <span
                    onClick={activeOptionsHandlerLeague}
                    className={leagueActive === true ? "px-[16px] py-[11px] border-[1px] border-[#6eb5ef40] bg-[#6eb4ef14] rounded-md text-[#6eb4ef] mx-2 cursor-pointer font-medium" : "text-[#9fa3a7] px-[16px] py-[11px] border-[1px] border-[#9fa3a740] rounded-md mx-2 cursor-pointer font-medium "}
                  >
                    League
                  </span>
                  <span
                    onClick={activeOptionsHandlerDomestic}
                    className={domesticActive === true ? "px-[16px] py-[11px] border-[1px] border-[#6eb5ef40] bg-[#6eb4ef14] rounded-md text-[#6eb4ef] mx-2 cursor-pointer font-medium" : "text-[#9fa3a7] px-[16px] py-[11px] border-[1px] border-[#9fa3a740] rounded-md mx-2 cursor-pointer font-medium "}
                  >
                    Domestic
                  </span>
                </div>

                {/* International Matches */}
                {internationalActive && (
                  <div className="px-8">
                    <div className="">
                      <div className="font-my text-3xl text-[#cfd1d3] font py-4 pl-6 font-semibold">
                        <h2> Live International Matches</h2>
                      </div>
                      {
                        //For the situation When api limit is reached and all the elements in the array are undefined.
                        intlLiveMatchesArr?.every(
                          (element) => typeof element === "undefined"
                        ) || intlLiveMatchesArr === undefined ? (
                          <div className="flex justify-center text-[#a0aec0] font-my font-bold text-lg p-4">
                            <p>No Live matches happening right now</p>
                          </div>
                        ) : (
                          <div className="flex flex-wrap justify-start mx-10 ">
                            {intlLiveMatchesArr &&
                              intlLiveMatchesArr
                                ?.filter((x) => x !== undefined)
                                .map((intlLiveMatchesArr, index) => (
                                  <MatchCard
                                    key={index}
                                    matchesArr={intlLiveMatchesArr}
                                  />
                                ))}
                          </div>
                        )
                      }
                    </div>
                    <div className="">
                      <div className="font-my text-[#cfd1d3] text-3xl font py-5 pl-6 font-semibold">
                        <h2> Recent International Matches</h2>
                      </div>
                      {
                        //For the situation When api limit is reached and all the elements in the array are undefined.
                        intlRecentMatchesArr?.every(
                          (element) => typeof element === "undefined"
                        ) || intlRecentMatchesArr === undefined ? (
                          <div className="flex justify-center text-[#a0aec0] font-my font-bold text-lg p-4">
                            <p>No matches to show right now</p>
                          </div>
                        ) : (
                          <div className="flex flex-wrap justify-start mx-10 ">
                            {intlRecentMatchesArr &&
                              intlRecentMatchesArr
                                ?.filter((x) => x !== undefined)
                                .map((intlRecentMatchesArr, index) => (
                                  <MatchCard
                                    key={index}
                                    matchesArr={intlRecentMatchesArr}
                                  />
                                ))}
                          </div>
                        )
                      }
                    </div>
                  </div>
                )}

                {/* Women matches */}
                {womenActive && (
                  <div className="px-8">
                    {
                      <div className="">
                        <div className="font-my text-[#cfd1d3] text-3xl font py-4 pl-6 font-semibold">
                          <h2> Live Women Matches</h2>
                        </div>
                        {
                          //For the situation When api limit is reached and all the elements in the array are undefined.
                          womenLiveMatchesArr?.every(
                            (element) => typeof element === "undefined"
                          ) || womenLiveMatchesArr === undefined ? (
                            <div className="flex justify-center text-[#a0aec0] font-my font-bold text-lg p-4">
                              <p>No Live matches happening right now</p>
                            </div>
                          ) : (
                            <div className="flex flex-wrap justify-start mx-10">
                              {womenLiveMatchesArr &&
                                womenLiveMatchesArr
                                  ?.filter((x) => x !== undefined)
                                  .map((womenLiveMatchesArr, index) => (
                                    <MatchCard
                                      key={index}
                                      matchesArr={womenLiveMatchesArr}
                                    />
                                  ))}
                            </div>
                          )
                        }
                      </div>
                    }
                    <div className="">
                      <div className="font-my text-[#cfd1d3] text-3xl font py-5 pl-6 font-semibold">
                        <h2> Recent Women Matches</h2>
                      </div>
                      {
                        //For the situation When api limit is reached and all the elements in the array are undefined.
                        womenRecentMatchesArr?.every(
                          (element) => typeof element === "undefined"
                        ) || womenRecentMatchesArr === undefined ? (
                          <div className="flex justify-center text-[#a0aec0] font-my font-bold text-lg p-4">
                            <p>No matches to show right now</p>
                          </div>
                        ) : (
                          <div className="flex flex-wrap justify-start mx-10">
                            {womenRecentMatchesArr &&
                              womenRecentMatchesArr
                                ?.filter((x) => x !== undefined)
                                .map((womenRecentMatchesArr, index) => (
                                  <MatchCard
                                    key={index}
                                    matchesArr={womenRecentMatchesArr}
                                  />
                                ))}
                          </div>
                        )
                      }
                    </div>
                  </div>
                )}

                {/* League Matches  */}
                {leagueActive && (
                  <div className="px-8">
                    <div className="">
                      <div className="font-my text-[#cfd1d3] text-3xl font py-4 pl-6 font-semibold">
                        <h2> Live League Matches</h2>
                      </div>
                      {
                        //For the situation When api limit is reached and all the elements in the array are undefined.
                        leagueLiveMatchesArr?.every(
                          (element) => typeof element === "undefined"
                        ) || leagueLiveMatchesArr === undefined ? (
                          <div className="flex justify-center text-[#a0aec0] font-my font-bold text-lg p-4">
                            <p>No Live matches happening right now</p>
                          </div>
                        ) : (
                          <div className="flex flex-wrap justify-start mx-10">
                            {leagueLiveMatchesArr &&
                              leagueLiveMatchesArr
                                ?.filter((x) => x !== undefined)
                                .map((leagueLiveMatchesArr, index) => (
                                  <MatchCard
                                    key={index}
                                    matchesArr={leagueLiveMatchesArr}
                                  />
                                ))}
                          </div>
                        )
                      }
                    </div>
                    <div className="">
                      <div className="font-my text-[#cfd1d3] text-3xl font py-5 pl-6 font-semibold">
                        <h2> Recent League Matches</h2>
                      </div>
                      {
                        //For the situation When api limit is reached and all the elements in the array are undefined.
                        leagueRecentMatchesArr?.every(
                          (element) => typeof element === "undefined"
                        ) || leagueRecentMatchesArr === undefined ? (
                          <div className="flex justify-center text-[#a0aec0] font-my font-bold text-lg p-4">
                            <p>No matches to show right now</p>
                          </div>
                        ) : (
                          <div className="flex flex-wrap justify-start mx-10">
                            {leagueRecentMatchesArr &&
                              leagueRecentMatchesArr
                                ?.filter((x) => x !== undefined)
                                .map((leagueRecentMatchesArr, index) => (
                                  <MatchCard
                                    key={index}
                                    matchesArr={leagueRecentMatchesArr}
                                  />
                                ))}
                          </div>
                        )
                      }
                    </div>
                  </div>
                )}

                {/* Domestic Matches */}
                {domesticActive && (
                  <div className="px-8">
                    <div className="">
                      <div className="font-my text-[#cfd1d3] text-3xl font py-4 pl-6 font-semibold">
                        <h2> Live Domestic Matches</h2>
                      </div>
                      {
                        //For the situation When api limit is reached and all the elements in the array are undefined.
                        domesticLiveMatchesArr?.every(
                          (element) => typeof element === "undefined"
                        ) || domesticLiveMatchesArr === undefined ? (
                          <div className="flex justify-center text-[#a0aec0] font-my font-bold text-lg p-4">
                            <p>No Live matches happening right now</p>
                          </div>
                        ) : (
                          <div className="flex flex-wrap justify-start mx-10">
                            {domesticLiveMatchesArr &&
                              domesticLiveMatchesArr
                                ?.filter((x) => x !== undefined)
                                .map((domesticLiveMatchesArr, index) => (
                                  <MatchCard
                                    key={index}
                                    matchesArr={domesticLiveMatchesArr}
                                  />
                                ))}
                          </div>
                        )
                      }
                    </div>
                    <div className="">
                      <div className="font-my text-[#cfd1d3] text-3xl font py-5 pl-6 font-semibold">
                        <h2> Recent Domestic Matches</h2>
                      </div>
                      {
                        //For the situation When api limit is reached and all the elements in the array are undefined.
                        domesticRecentMatchesArr?.every(
                          (element) => typeof element === "undefined"
                        ) || domesticRecentMatchesArr === undefined ? (
                          <div className="flex justify-center text-[#a0aec0] font-my font-bold text-lg p-4">
                            <p>No matches to show right now</p>
                          </div>
                        ) : (
                          <div className="flex flex-wrap justify-start mx-10">
                            {domesticRecentMatchesArr &&
                              domesticRecentMatchesArr
                                ?.filter((x) => x !== undefined)
                                .map((domesticRecentMatchesArr, index) => (
                                  <MatchCard
                                    key={index}
                                    matchesArr={domesticRecentMatchesArr}
                                  />
                                ))}
                          </div>
                        )
                      }
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      }
    </>
  );
};

export default Matches;



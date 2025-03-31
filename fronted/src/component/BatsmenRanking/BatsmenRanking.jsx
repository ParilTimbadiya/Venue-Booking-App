import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import options from "../../apiOptions";

const Rank = () => {
  // Added state for view toggle
  const [activeView, setActiveView] = useState("team"); // 'team' or 'player'

  const [rankings, setRankings] = useState([]);
  const [topStats, setTopStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState("All");
  const [selectedStat, setSelectedStat] = useState("mostRuns");
  const [sortConfig, setSortConfig] = useState({
    key: "rank",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(null);

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://cricbuzz-cricket.p.rapidapi.com/stats/v1/iccstanding/team/matchtype/1",
          {
            method: "GET",
            headers: {
              "x-rapidapi-key": options.headers["X-RapidAPI-Key"],
              "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        setRankings(data.values || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching rankings:", err);
        setError(`Failed to load rankings: ${err.message}`);
        setLoading(false);
      }
    };

    fetchRankings();
  }, []);

  useEffect(() => {
    const fetchTopStats = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://cricbuzz-cricket.p.rapidapi.com/stats/v1/topstats/0?statsType=${selectedStat}`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-key": options.headers["X-RapidAPI-Key"],
              "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        setTopStats(data.values || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching top stats:", err);
        setError(`Failed to load top stats: ${err.message}`);
        setLoading(false);
      }
    };

    if (activeView === "player") {
      fetchTopStats();
    }
  }, [selectedStat, activeView]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedAndFilteredRankings = React.useMemo(() => {
    let sortableItems = [...rankings];
    if (selectedSeason !== "All") {
      sortableItems = sortableItems.filter(
        (team) => team.season === selectedSeason
      );
    }

    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        const aValue =
          a.value[
            sortConfig.key === "rank" ? 0 : sortConfig.key === "team" ? 2 : 3
          ];
        const bValue =
          b.value[
            sortConfig.key === "rank" ? 0 : sortConfig.key === "team" ? 2 : 3
          ];

        if (!isNaN(aValue)) {
          return sortConfig.direction === "asc"
            ? aValue - bValue
            : bValue - aValue;
        }
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      });
    }
    return sortableItems;
  }, [rankings, selectedSeason, sortConfig]);

  const paginatedRankings = sortedAndFilteredRankings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const filteredRankings = paginatedRankings.filter((team) =>
    team.value[2].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const seasons = [
    "All",
    "World Test Championship (2021-2023)",
    "World Test Championship (2019-2021)",
  ];
  const statsTypes = [
    { value: "mostRuns", header: "Most Runs" },
    { value: "highestScore", header: "Highest Scores" },
    { value: "mostWickets", header: "Most Wickets" },
    { value: "bestBowlingInnings", header: "Best Bowling" },
  ];

  const openModal = (team) => {
    setSelectedTeam(team);
  };

  const closeModal = () => {
    setSelectedTeam(null);
  };

  // Handle tab switching
  const handleViewChange = (view) => {
    setActiveView(view);
    // Reset loading state if switching to player view and we need to fetch data
    if (view === "player" && topStats.length === 0) {
      setLoading(true);
    }
  };

  // if (loading) return (
  //   <div className="flex justify-center items-center min-h-64 p-6 ">
  //     <div className="text-center">
  //       <div className="relative w-16 h-16">
  //         <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-200 rounded-full"></div>
  //         <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
  //       </div>
  //       <p className="mt-4 text-gray-700 font-medium">Loading {activeView === 'team' ? 'team rankings' : 'player stats'} data...</p>
  //     </div>
  //   </div>
  // );

  if (error)
    return (
      <div className="text-center p-6 ">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md">
          <div className="flex items-center">
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <p className="font-bold">Error Loading Data</p>
          </div>
          <p className="mt-2">{error}</p>
        </div>
      </div>
    );

  return (
    <div className="  ">
      <div className="font-my ">
        {/* Updated Header */}
        <div className="my-5">
          <h1 className="text-4xl font-bold text-left text-gray-300 mx-10 ">
            ICC Cricket Statistics
          </h1>
          <p className="text-left text-lg text-gray-400 my-2 mx-10">
            Team Rankings and Player Statistics for Test Cricket
          </p>
        </div>

        {/* Updated View Toggle */}
        <div className="mx-14">
          <span
            className={`${
              activeView === "team"
                ? "px-[16px] py-[11px] border-[1px] border-[#6eb5ef40] bg-[#6eb4ef14] rounded-md text-[#6eb4ef] mx-2 cursor-pointer font-medium"
                : "text-[#9fa3a7] px-[16px] py-[11px] border-[1px] border-[#9fa3a740] rounded-md mx-2 cursor-pointer font-medium "
            }`}
            onClick={() => handleViewChange("team")}
          >
            Team Rankings
          </span>
          <span
            className={`${
              activeView === "player"
                ? "px-[16px] py-[11px] border-[1px] border-[#6eb5ef40] bg-[#6eb4ef14] rounded-md text-[#6eb4ef] mx-2 cursor-pointer font-medium"
                : "text-[#9fa3a7] px-[16px] py-[11px] border-[1px] border-[#9fa3a740] rounded-md mx-2 cursor-pointer font-medium "
            }`}
            onClick={() => handleViewChange("player")}
          >
            Player Stats
          </span>
        </div>

        {/* Team Rankings View */}
        {activeView === "team" && (
          <>
            <div className="flex justify-center my-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
                {/* Stats Cards */}
                {[
                  { value: rankings.length, label: "Total Teams" },
                  { value: rankings[0]?.value[3], label: "Top Team PCT" },
                  { value: seasons.length - 1, label: "Seasons" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-right"
                  >
                    {/* Value Box */}
                    <div className=" w-full font-my1 rounded-t-lg">
                      <div className="text-6xl md:text-7xl lg:text-8xl font-bold text-[#cdcdcd] break-words">
                        {/* {stat.value} */}
                        {parseFloat(stat.value).toFixed(2).slice(0, 5)}
                      </div>
                    </div>
                    {/* Label Box */}
                    <div className="bg-[#15222e] w-full px-4 py-2 rounded-b-lg">
                      <div className="text-[#868c96] font-bold text-sm md:text-base">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rankings Table Section */}
            <div className=" my-6">
              <div className="my-5 mx-14 font-my text-[#bfbfbf] font-bold text-3xl">
                <h2>Team Rankings</h2>
              </div>

              {/* Filters */}
              {/* <div className="p-4 flex flex-wrap gap-4 bg-gray-800"> */}
              {/* <div className="relative flex-1">
                  <select
                    className="w-full bg-gray-700 border border-gray-600 text-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-400"
                    value={selectedSeason}
                    onChange={(e) => setSelectedSeason(e.target.value)}
                  >
                    {seasons.map((season) => (
                      <option key={season} value={season} className="bg-gray-800">
                        {season}
                      </option>
                    ))}
                  </select>
                </div> */}
              {/* <input
                  type="text"
                  placeholder="Search teams..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-gray-700 border border-gray-600 text-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-400"
                /> */}
              {/* </div> */}

              {/* Table */}
              <div className="mx-4 md:mx-16 overflow-x-auto">
                <table className="w-full border-collapse border-0 min-w-max mb-10">
                  <thead className="bg-[#121c27b7] text-[#cccccc]">
                    <tr className="hover:bg-gray-900">
                      {["Rank", "Team", "PCT"].map((header) => (
                        <th
                          key={header}
                          className="px-3 md:px-5 py-3 md:py-4 text-left text-sm md:text-xl font-semibold cursor-pointer border-0"
                          onClick={() => requestSort(header.toLowerCase())}
                        >
                          {header}
                          {sortConfig.key === header.toLowerCase() && (
                            <span className="ml-1">
                              {sortConfig.direction === "asc" ? "↑" : "↓"}
                            </span>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-[#15222e]">
                    {filteredRankings.map((team, index) => (
                      <tr
                        key={index}
                        className="hover:bg-[#1b2741] transition-colors"
                        onClick={() => openModal(team)}
                      >
                        <td className="px-3 md:px-5 py-3 md:py-4 text-xs md:text-base font-bold text-[#b1adad] border-0">
                          {team.value[0]}
                        </td>
                        <td className="px-3 md:px-5 py-3 md:py-4 text-xs md:text-base font-bold text-[#b1adad] border-0">
                          {team.value[2]}
                        </td>
                        <td className="px-3 md:px-5 py-3 md:py-4 text-xs md:text-base font-bold text-[#b1adad] border-0">
                          {team.value[3]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Player Stats View */}
        {activeView === "player" && (
          <div className=" mt-6">
            <div className="pt-6 mx-14 font-my text-[#bfbfbf] font-bold text-3xl">
              <h2>Player Statistics</h2>
            </div>

            {/* Stats Selector */}
            <div className="p-4 w-full md:w-1/3 mx-auto">
              <select
                className="w-full bg-[#15222e] text-[#b1adad] border-2 border-[#1c2834] rounded-lg px-4 py-3 text-sm md:text-base
               focus:ring-2 focus:ring-teal-400 outline-none transition-all duration-200 cursor-pointer hover:bg-[#1b2741]"
                value={selectedStat}
                onChange={(e) => setSelectedStat(e.target.value)}
              >
                {statsTypes.map((stat) => (
                  <option
                    key={stat.value}
                    value={stat.value}
                    className="bg-[#15222e] text-[#b1adad]"
                  >
                    {stat.header}
                  </option>
                ))}
              </select>
            </div>

            {/* Player Stats Table */}
            <div className=" mx-4 md:mx-16 overflow-x-auto">
              <table className="w-full border-collapse border-0 min-w-max my-10">
                <thead className="bg-[#121c27b7] text-[#cccccc]">
                  <tr className="hover:bg-gray-900">
                    {[
                      "Player",
                      "Matches",
                      selectedStat.includes("Wicket") ? "Wickets" : "Runs",
                      "Average",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-3 md:px-5 py-3 md:py-4 text-left text-sm md:text-xl font-semibold cursor-pointer border-0"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-[#15222e]">
                  {topStats.map((stat, index) => (
                    <tr
                      key={index}
                      className="hover:bg-[#1b2741] transition-colors"
                    >
                      <td className="px-3 md:px-5 py-3 md:py-4 text-xs md:text-base font-bold text-[#b1adad] border-0">
                        {stat.values[1]}
                      </td>
                      <td className="px-3 md:px-5 py-3 md:py-4 text-xs md:text-base font-bold text-[#b1adad] border-0">
                        {stat.values[2]}
                      </td>
                      <td className="px-3 md:px-5 py-3 md:py-4 text-xs md:text-base font-bold text-[#b1adad] border-0">
                        {stat.values[3]}
                      </td>
                      <td className="px-3 md:px-5 py-3 md:py-4 text-xs md:text-base font-bold text-[#b1adad] border-0">
                        {stat.values[4]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedTeam && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-300 mb-4">
              {selectedTeam.value[2]}
            </h2>
            <div className="space-y-2 text-gray-300">
              <p>
                Rank:{" "}
                <span className="text-gray-300">{selectedTeam.value[0]}</span>
              </p>
              <p>
                PCT:{" "}
                <span className="text-gray-300">{selectedTeam.value[3]}</span>
              </p>
            </div>
            <button
              onClick={closeModal}
              className="mt-4 w-full py-2 bg-teal-400 text-gray-900 rounded-lg hover:bg-teal-500 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rank;

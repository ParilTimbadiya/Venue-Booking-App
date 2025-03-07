import React, { useEffect, useState } from "react";
import options from "../../apiOptions";
import './Series.css';

const Series = () => {
  const [seriesData, setSeriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [matchesData, setMatchesData] = useState(null);
  const [loadingMatches, setLoadingMatches] = useState(false);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await fetch(
          "https://cricbuzz-cricket.p.rapidapi.com/series/v1/international",
          {
            method: "GET",
            headers: {
              "x-rapidapi-key": options.headers["X-RapidAPI-Key"],
              "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch series data");
        }

        const data = await response.json();
        setSeriesData(data.seriesMapProto);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
  }, []);

  const fetchMatchDetails = async (seriesId) => {
    setLoadingMatches(true);
    try {
      const response = await fetch(
        `https://cricbuzz-cricket.p.rapidapi.com/series/v1/${seriesId}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": options.headers["X-RapidAPI-Key"],
            "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch match details");
      }

      const data = await response.json();
      setMatchesData(data.matchDetails);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingMatches(false);
    }
  };

  const handleSeriesClick = (series) => {
    setSelectedSeries(series);
    fetchMatchDetails(series.id);
  };

  const handleBackClick = () => {
    setSelectedSeries(null);
    setMatchesData(null);
  };

  if (loading) {
    return <div className="loading">Loading series data...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="series-dashboard">
      <h1 className="header">
        {selectedSeries
          ? `Matches in ${selectedSeries.name}`
          : "Current and Upcoming Cricket Series"}
      </h1>

      {selectedSeries ? (
        <div className="matches-container">
          <button
            onClick={handleBackClick}
            className="back-button"
          >
            ← Back to Series
          </button>

          {loadingMatches ? (
            <div className="loading">Loading match details...</div>
          ) : (
            <div className="matches-grid">
              {matchesData?.map((item, index) => {
                // Skip ad items
                if (item.adDetail) return null;

                const { matchDetailsMap } = item;
                if (!matchDetailsMap) return null;

                return (
                  <div key={index} className="match-group">
                    <h3 className="match-date-heading">{matchDetailsMap.key}</h3>
                    <div className="matches-list">
                      {matchDetailsMap.match?.map((matchItem) => {
                        const { matchInfo } = matchItem;
                        return (
                          <div
                            key={matchInfo.matchId}
                            className="match-card"
                          >
                            <div className="match-header">
                              <span className="match-format">{matchInfo.matchFormat}</span>
                              <span className="match-desc">{matchInfo.matchDesc}</span>
                            </div>
                            <div className="teams-container">
                              <div className="team">
                                <div className="team-name">{matchInfo.team1.teamName}</div>
                                <div className="team-code">{matchInfo.team1.teamSName}</div>
                              </div>
                              <div className="versus">VS</div>
                              <div className="team">
                                <div className="team-name">{matchInfo.team2.teamName}</div>
                                <div className="team-code">{matchInfo.team2.teamSName}</div>
                              </div>
                            </div>
                            <div className="match-venue">
                              <i className="venue-icon">📍</i>
                              {matchInfo.venueInfo.ground}, {matchInfo.venueInfo.city}
                            </div>
                            <div className="match-dates">
                              <div className="date-item">
                                <span className="date-label">Start:</span>
                                <span className="date-value">
                                  {new Date(
                                    parseInt(matchInfo.startDate)
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="date-item">
                                <span className="date-label">End:</span>
                                <span className="date-value">
                                  {new Date(
                                    parseInt(matchInfo.endDate)
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <div className="match-status">{matchInfo.state}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div>
          {seriesData.map((month) => (
            <div key={month.date} className="month-section">
              <h2 className="month-title">{month.date}</h2>
              <div className="series-grid">
                {month.series.map((series) => (
                  <div
                    key={series.id}
                    className="series-card"
                    onClick={() => handleSeriesClick(series)}
                  >
                    <h3 className="series-name">{series.name}</h3>
                    <div className="series-dates">
                      <span className="date-badge">
                        Start: {new Date(parseInt(series.startDt)).toLocaleDateString()}
                      </span>
                      <span className="date-badge">
                        End: {new Date(parseInt(series.endDt)).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Series;
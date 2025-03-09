import React, { useEffect, useState } from 'react';
import './Teams.css';
import options from '../../apiOptions';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]); 
  const [selectedTeam, setSelectedTeam] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(
          'https://cricbuzz-cricket.p.rapidapi.com/teams/v1/international',
          options
        );

        if (!response.ok) {
          throw new Error('Failed to fetch teams');
        }

        const data = await response.json();
        if (data.list) {
          setTeams(data.list.filter((team) => team.teamId)); 
        } else {
          throw new Error('No teams data found');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const fetchPlayers = async (teamId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://cricbuzz-cricket.p.rapidapi.com/teams/v1/${teamId}/players`,
        options
      );

      if (!response.ok) {
        throw new Error('Failed to fetch players');
      }

      const data = await response.json();
      if (data.player) {
        setPlayers(data.player);
      } else {
        throw new Error('No players data found');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTeamClick = (teamId) => {
    setSelectedTeam(teamId);
    fetchPlayers(teamId);
  };

  const handleBackToTeams = () => {
    setSelectedTeam(null);
    setPlayers([]);
  };

  // if (loading) {
  //   return <div className="loading">Loading...</div>;
  // }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div>
    <div className="teams-container">
      

      {!selectedTeam && (
        <div><h1 className='teams-header'>International Cricket Teams</h1>
        <div className="teams-grid">
          
          {teams.length > 0 ? (
            teams.map((team) => (
              <div
                key={team.teamId}
                className="team-card"
                onClick={() => handleTeamClick(team.teamId)}
              >
                <div className="team-image">
                  <img
                    src={`https://www.cricbuzz.com/a/img/v1/300x300/i1/c${team.imageId}/team-logos.jpg`} 
                    alt={team.teamName}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300';
                    }}
                  />
                </div>
                <h2>{team.teamName}</h2>
                <p>{team.teamSName}</p>
              </div>
            ))
          ) : (
            <div className="no-data">Loading Team...</div>
          )}
        </div></div>
      )}

      {selectedTeam && (
        <div className="players-container">
          <button className="back-button" onClick={handleBackToTeams}>
            &larr; Back to Teams
          </button>
          <h2 className="players-header">Players</h2>
          {players.length > 0 ? (
            <div className="players-grid">
              {players.map((player, index) =>
                player.id ? (
                  <div key={index} className="player-card">
                    <div className="player-image">
                      <img
                        src={`https://www.cricbuzz.com/a/img/v1/300x300/i1/c${player.imageId}/player-logos.jpg`} 
                        alt={player.name}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300'; 
                        }}
                      />
                      <h2>{player.name}</h2>
                    </div>
                    
                    <p><strong>Batting Style:</strong> {player.battingStyle}</p>
                    {player.bowlingStyle && (
                      <p><strong>Bowling Style:</strong> {player.bowlingStyle}</p>
                    )}
                  </div>
                ) : (
                  <h2 key={index} className="player-category">{player.name}</h2>
                )
              )}
            </div>
          ) : (
            <div className="no-data">Load Players Information...</div>
          )}
        </div>
      )}
    </div>
    </div>
  );
};

export default Teams;
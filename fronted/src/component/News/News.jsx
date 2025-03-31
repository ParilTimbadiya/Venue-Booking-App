import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./News.css";
import options from "../../apiOptions";

const News = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://cricbuzz-cricket.p.rapidapi.com/news/v1/index",
          {
            method: "GET",
            headers: {
              "x-rapidapi-key": options.headers["X-RapidAPI-Key"],
              "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }

        const data = await response.json();
        setNewsList(data.storyList.filter((item) => item.story)); // Filter out ads
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleNewsClick = (newsId) => {
    navigate(`/news/${newsId}`);
  };

  // if (loading) {
  //   return <div className="loading">Loading news...</div>;
  // }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="news-dashboard mt-100">
      <h1>Latest Cricket News</h1>
      <div className="news-grid">
        {newsList.map((item) => {
          const { id, hline, intro, pubTime, source } = item.story;
          return (
            <div
              key={id}
              className="news-card"
              onClick={() => handleNewsClick(id)}
            >
              <div className="news-content">
                <h3>{hline}</h3>
                <p>{intro}</p>
                <div className="news-meta"><br />
                  {/* <span className="source">{source}</span> */}
                  <span className="pub-time">
                    {new Date(parseInt(pubTime)).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default News;
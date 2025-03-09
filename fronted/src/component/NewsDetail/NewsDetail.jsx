import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./NewsDetail.css";
import options from "../../apiOptions";

const NewsDetail = () => {
  const { id } = useParams(); // Extract the `id` parameter from the URL
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setError("News ID is missing");
      setLoading(false);
      return;
    }

    const fetchNewsDetail = async () => {
      try {
        const response = await fetch(
          `https://cricbuzz-cricket.p.rapidapi.com/news/v1/detail/${id}`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-key": options.headers["X-RapidAPI-Key"],
              "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch news details");
        }

        const data = await response.json();
        console.log("API Response:", data); // Debugging: Log the API response
        setNews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading news details...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!news) {
    return <div className="no-news">No news found</div>;
  }

  return (
    <div className="matchesContainer">
      <button onClick={() => navigate(-1)} className="back-button">
        &larr; Back to News
      </button>
      <div className="news-detail">
        <h1>{news.headline || "No Headline Available"}</h1>
        <p className="context">{news.context || "No Context Available"}</p>
        <p className="pub-time">
          Published on:{" "}
          {news.publishTime
            ? new Date(parseInt(news.publishTime)).toLocaleDateString()
            : "No Date Available"}
        </p>

        <div className="content">
          {news.content ? (
            news.content.map((item, index) => (
              <React.Fragment key={index}>
                {item.content && <p>{item.content.contentValue}</p>}
                {/* {item.ad && <div className="ad">Advertisement: {item.ad.name}</div>} */}
              </React.Fragment>
            ))
          ) : (
            <p>No content available for this news.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
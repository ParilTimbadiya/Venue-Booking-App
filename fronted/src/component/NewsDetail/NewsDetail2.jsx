// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// // import "./NewsDetail.css";
// import options from "../../apiOptions";

// const NewsDetail = () => {
//   const { id } = useParams(); // Extract the `id` parameter from the URL
//   const [news, setNews] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!id) {
//       setError("News ID is missing");
//       setLoading(false);
//       return;
//     }

//     const fetchNewsDetail = async () => {
//       try {
//         const response = await fetch(
//           `https://cricbuzz-cricket.p.rapidapi.com/news/v1/detail/${id}`,
//           {
//             method: "GET",
//             headers: {
//               "x-rapidapi-key": options.headers["X-RapidAPI-Key"],
//               "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch news details");
//         }

//         const data = await response.json();
//         console.log("API Response:", data); // Debugging: Log the API response
//         setNews(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNewsDetail();
//   }, [id]);

//   if (loading) {
//     return <div className="loading">Loading news details...</div>;
//   }

//   if (error) {
//     return <div className="error">Error: {error}</div>;
//   }

//   if (!news) {
//     return <div className="no-news">No news found</div>;
//   }

//   return (
//     <div className="matchesContainer">
//       <button onClick={() => navigate(-1)} className="back-button">
//         &larr; Back to News
//       </button>
//       <div className="news-detail">
//         <h1>{news.headline || "No Headline Available"}</h1>
//         <p className="context">{news.context || "No Context Available"}</p>
//         <p className="pub-time">
//           Published on:{" "}
//           {news.publishTime
//             ? new Date(parseInt(news.publishTime)).toLocaleDateString()
//             : "No Date Available"}
//         </p>

//         <div className="content">
//           {news.content ? (
//             news.content.map((item, index) => (
//               <React.Fragment key={index}>
//                 {item.content && <p>{item.content.contentValue}</p>}
//                 {/* {item.ad && <div className="ad">Advertisement: {item.ad.name}</div>} */}
//               </React.Fragment>
//             ))
//           ) : (
//             <p>No content available for this news.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewsDetail;



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import options from "../../apiOptions";
import back from "../../../src/assets/images/back.jpg";

const NewsDetail = () => {
  const { id } = useParams();
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
    return <div className="text-center text-gray-400 py-10 text-lg">Loading news details...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10 text-lg">Error: {error}</div>;
  }

  if (!news) {
    return <div className="text-center text-gray-300 py-10 text-lg">No news found</div>;
  }

  return (
    <div className="min-h-screen font-my bg-[#0c131a] text-gray-300 px-4 sm:px-8 py-6 my-10">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className=" flex flex-row items-center justify-center justify-items-center px-[16px] py-[11px] border-[1px] border-[#6eb5ef40] bg-[#6eb4ef14] rounded-md text-[#6eb4ef] mb-5 cursor-pointer font-medium "
      >
        <img className="w-7 h-7" src={back} alt=""  />
        <p className="">Back to Series</p>
      </button>

      {/* News Details Section */}
      <div className="max-w-4xl mx-auto bg-[#1e293b] p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl md:text-4xl font-bold text-[#6eb4ef] mb-3">
          {news.headline || "No Headline Available"}
        </h1>

        <p className="text-gray-400 text-sm mb-4 font-bold">
          Published on:{" "}
          {news.publishTime
            ? new Date(parseInt(news.publishTime)).toLocaleDateString()
            : "No Date Available"}
        </p>

        <p className="text-lg md:text-2xl font-bold mb-4">{news.context || "No Context Available"}</p>

        <div className="space-y-4 text-gray-300">
          {news.content ? (
            news.content.map((item, index) => (
              <React.Fragment key={index}>
                {item.content && <p className="text-sm md:text-base font-bold "> {item.content.contentValue}</p>}
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


// import React, { useEffect, useState } from "react";

// import { useNavigate } from "react-router-dom";
// // import "./News.css";
// import options from "../../apiOptions";

// const News = () => {
//   const [newsList, setNewsList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const response = await fetch(
//           "https://cricbuzz-cricket.p.rapidapi.com/news/v1/index",
//           {
//             method: "GET",
//             headers: {
//               "x-rapidapi-key": options.headers["X-RapidAPI-Key"],
//               "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch news");
//         }

//         const data = await response.json();
//         setNewsList(data.storyList.filter((item) => item.story)); // Filter out ads
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNews();
//   }, []);

//   const handleNewsClick = (newsId) => {
//     navigate(`/news/${newsId}`);
//   };

//   // if (loading) {
//   //   return <div className="loading">Loading news...</div>;
//   // }

//   if (error) {
//     return <div className="error">Error: {error}</div>;
//   }

//   return (
//     <div className="bg-[#0c131a]">
//       <h1 className="font-my text-3xl font py-4 pl-6 font-semibold">Latest Cricket News</h1>
//       <div className="flex justify-center flex-wrap text-[#a0aec0] font-my font-bold text-lg p-4">
//         {newsList.map((item) => {
//           const { id, hline, intro, pubTime, source } = item.story;
//           return (
//             <div
//               key={id}
//               className="news-card"
//               onClick={() => handleNewsClick(id)}
//             >
//               <div className="news-content">
//                 <h3>{hline}</h3>
//                 <p>{intro}</p>
//                 <div className="news-meta"><br />
//                   {/* <span className="source">{source}</span> */}
//                   <span className="pub-time">
//                     {new Date(parseInt(pubTime)).toLocaleDateString()}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default News;




// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import options from "../../apiOptions";

// const News = () => {
//   const [newsList, setNewsList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const response = await fetch(
//           "https://cricbuzz-cricket.p.rapidapi.com/news/v1/index",
//           {
//             method: "GET",
//             headers: {
//               "x-rapidapi-key": options.headers["X-RapidAPI-Key"],
//               "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch news");
//         }

//         const data = await response.json();
//         setNewsList(data.storyList.filter((item) => item.story)); // Filter out ads
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNews();
//   }, []);

//   const handleNewsClick = (newsId) => {
//     navigate(`/news/${newsId}`);
//   };

//   if (loading) {
//     return <div className="text-center text-gray-400 py-10">Loading news...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-500 py-10">Error: {error}</div>;
//   }

//   return (
//     <div className="bg-[#0c131a] min-h-screen p-6">
//       <h1 className="text-3xl font-semibold text-gray-300 text-center mb-6">
//         Latest Cricket News
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {newsList.map((item) => {
//           const { id, hline, intro, pubTime } = item.story;
//           return (
//             <div
//               key={id}
//               className="bg-[#1e293b] p-5 rounded-xl shadow-lg transition transform hover:scale-105 cursor-pointer"
//               onClick={() => handleNewsClick(id)}
//             >
//               <h3 className="text-lg font-semibold text-[#6eb4ef] mb-2">{hline}</h3>
//               <p className="text-gray-300 mb-3">{intro}</p>
//               <p className="text-gray-500 text-sm">
//                 {new Date(parseInt(pubTime)).toLocaleDateString()}
//               </p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default News;




import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  if (loading) {
    return <div className="text-center text-gray-400 py-10 text-lg">Loading news...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10 text-lg">Error: {error}</div>;
  }

  return (
    <div className="bg-[#0c131a] min-h-screen px-4 md:px-8 py-6 font-my my-8 ">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-300 text-center mb-14">
        Latest Cricket News
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsList.map((item) => {
          const { id, hline, intro, pubTime } = item.story;
          return (
            <div
              key={id}
              className="bg-[#1e293b] p-4 sm:p-5 rounded-xl shadow-md transition transform hover:scale-[1.03] cursor-pointer"
              onClick={() => handleNewsClick(id)}
            >
              <h3 className="text-lg sm:text-xl font-semibold text-[#6eb4ef] mb-2">{hline}</h3>
              <p className="text-gray-300 text-sm sm:text-base mb-3">{intro}</p>
              <p className="text-gray-500 text-xs sm:text-sm">
                {new Date(parseInt(pubTime)).toLocaleDateString()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default News;

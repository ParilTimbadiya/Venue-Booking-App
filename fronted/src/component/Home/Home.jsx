// import './Home.css';
// import Sponsers from './Sponsers/Sponsers';
// import Gallery from './Gallery/Gallery';
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import React,{ useEffect, useState } from 'react';

// function Home() {
//   const [backgroundImage, setBackgroundImage] = useState(''); // Add useState for backgroundImage

//   useEffect(() => {
//     const images = [
//       'https://media-hosting.imagekit.io//54d75f5a41d44e70/contact-bg.png?Expires=1834833047&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=myi1MHuNpepzL5LLNsMQlb4ukU75b9EVmgFOlbUPVNJcmxaMHoFnl5pGswARDtV6RijTNzqtIFuAge3P6ScozeGtXUX9v0Q3t13D~DDmCkrG1cKFSw~ad0fTKgSzVHuz4kp-RmPakVsBwIEC1c32V~ED3iBpt5lMtGrISdK2Alg4~lY5-AC4U-4~OIwlLITlu~wNjAd1mcUopQ~qlvL3fAHDu0VD0pQtNNDER42LPAW7zHOTSSvzRt9l~fl1tm91bNcaREu~NokffE41sBM7KUOhAg7aHIPOmqDlqbN-zKkSRjo-6UcwCUuvyUEo~9uYbeE8mIpk5UPDZM~dE~2Jmg__',
//       // 'https://media-hosting.imagekit.io//7c0592dba3ed4bdb/72eafea2-0b20-4774-ade9-f3906ec98066.jpg?Expires=1834931377&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=hypheYaior83Q21jDyDzTtoLlD3ap1OyzjOP5JzByDdV19KJYpyoeix~csfzoZub8H7AgNTIZZTrhBNdsgwXgifAxxcQeNbhylP5lSiK4zwL3IzDEzkNj2J-M2HfqmrmZZCPfnFvAdHfsWtbO~4~nMQCwnbZ1B~o0m3vNgzKDhwqTDsBz4gqbUdhvZqGE8l7J79mDbTOeaafttSFvDnupoSC496tRCqWTKXP3JdX6wpQ4J6OdsxPD-J~WCUi6tHXvhJEyaxtzHQAxgWQU~sk9Xo7MO2n-IyBl5Ai5eMHfBM5s7-t7nTsaoYsdIUX5dkdMg1-wSUdyJGq7bxsdbrhdQ__',
//       'https://images.augustman.com/wp-content/uploads/sites/6/2023/04/16072649/Untitled-design-2023-04-16T071319.214.jpg?tr=w-1920',
//       'https://images.adsttc.com/media/images/62fb/da85/dfae/2a01/6f1d/1adc/large_jpg/compton-and-edrich-stands-lords-cricket-ground-wilkinsoneyre_1.jpg?1660672666',
//       'https://images.pexels.com/photos/3452544/pexels-photo-3452544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//     ];
//     let currentIndex = 0;

//     const changeBackground = () => {
//       setBackgroundImage(images[currentIndex]);
//       currentIndex = (currentIndex + 1) % images.length;
//     };

//     // Set initial image
//     changeBackground();

//     // Change the background every 1 second
//     const interval = setInterval(changeBackground, 3000);

//     // Clean up interval when component unmounts
//     return () => clearInterval(interval);
//   }, []);

//   const profileData = useSelector((val) => val.profile) || [];

//   return (
//     <div>
//       <div>
//         <div
//           className="home-container"
//           style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} // Added styles for better appearance
//         >
//           <header className="hero-section">
//             <h1>Welcome to Cricket Tournaments</h1>
//             <h1>WickPlay.com</h1>
//             <p>Join and compete in the most exciting cricket tournaments!</p>
// {/*             {*/}
// {/*               Array.isArray(profileData) && profileData.length > 0 ? (*/}
// {/*              <h2 className='namehead'>Welcome @{profileData[0]?.name}</h2>*/}
// {/*               ) : (*/}
// {/*                 <div className="btns">*/}
// {/*                   <Link to='/signin' className='signupbtn'>Login</Link>*/}
// {/*                   <Link to='/signup' className='signupbtn'>Sign Up</Link>*/}
// {/*                 </div>*/}
// {/*               )*/}
// {/*             } */}

//           </header>
//         </div>
//       </div>
//       <Gallery />
//       <Sponsers />
//     </div>
//   );
// }

// export default Home;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import one from "../assets/images/home_1.jpg";
// import two from "../assets/images/home_2.jpg";
// import three from "../assets/images/home_3.jpg";

// const Home = () => {
//   const images = [
//     {
//       url: one, // ✅ Correct way to use the imported image
//       title: "Welcome to the Ultimate Cricket Experience",
//       subtitle: "Join the most exciting tournaments at WickPlay!",
//     },
//     {
//       url: two,
//       title: "Experience the Thrill of Live Matches",
//       subtitle: "Compete with top players and teams!",
//     },
//     {
//       url: three,
//       title: "Your Journey to Glory Begins Here",
//       subtitle: "Step onto the field and make history!",
//     },
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   const profileData = useSelector((state) => state.profile) || [];

//   return (
//     <div
//       className="relative h-screen flex flex-col items-center justify-center text-white bg-cover bg-center transition-all duration-1000"
//       style={{ backgroundImage: `url(${images[currentIndex].url})` }}
//     >
//       <div className="absolute inset-0 bg-black bg-opacity-50"></div>
//       <header className="relative text-center px-6">
//         <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg animate-fade-in">
//           {images[currentIndex].title}
//         </h1>
//         <p className="text-lg md:text-2xl mt-4 drop-shadow-md animate-fade-in">
//           {images[currentIndex].subtitle}
//         </p>
//         {/* {Array.isArray(profileData) && profileData.length > 0 ? (
//           <h2 className="text-xl md:text-2xl mt-6 font-semibold animate-fade-in">
//             Welcome, @{profileData[0]?.name}
//           </h2>
//         ) : (
//           <div className="flex gap-4 mt-6">
//             <Link
//               to="/signin"
//               className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg shadow-lg transition-all"
//             >
//               Login
//             </Link>
//             <Link
//               to="/signup"
//               className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg shadow-lg transition-all"
//             >
//               Sign Up
//             </Link>
//           </div>
//         )} */}
//       </header>
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
// import Sponsers from "./Sponsers/Sponsers";
import Gallery from "./Gallery/Gallery";
// import { useSelector } from "react-redux";
import img1 from "../assets/images/home_1.jpg";
import img2 from "../assets/images/home_3.jpg";
import img3 from "../assets/images/home_4.webp";
import options from "../apiOptions";
import "./Photos/PhotoGallery.css";

const images = [
  {
    url: img1,
    title: "Welcome to the",
    sTitle: "Ultimate Cricket Experience",
    subtitle: "Join the most exciting tournaments at WickPlay!",
  },
  {
    url: img2,
    title: "Experience the",
    sTitle: "Thrill of Live Matches",
    subtitle: "Compete with top players and teams!",
  },
  {
    url: img3,
    title: "Your Journey to",
    sTitle: "Glory Begins Here",
    subtitle: "Step onto the field and make history!",
  },
];

const sponsors = [
  {
    name: "SportPro Gear",
    description: "Top provider of high-quality cricket equipment and apparel.",
    image:
      "https://i.pinimg.com/736x/6d/b7/51/6db7514a01775565741d4a20490352f5.jpg",
  },
  {
    name: "Victory Beverages",
    description:
      "Refreshing drinks designed to energize athletes and fans alike.",
    image:
      "https://i.pinimg.com/564x/5d/90/a8/5d90a87b1c5bc4c079f31b8fd351d5d8.jpg",
  },
  {
    name: "Cricket Stars Clothing",
    description:
      "Stylish and comfortable clothing for cricket enthusiasts and players.",
    image:
      "https://i.pinimg.com/564x/74/16/f5/7416f531a21ca9484bdc9363635d5887.jpg",
  },
  {
    name: "Prime Fitness Solutions",
    description:
      "Expert fitness equipment to enhance player performance and training.",
    image:
      "https://i.pinimg.com/564x/84/ca/74/84ca744e9518cea5d99cf9d33a4ecbee.jpg",
  },
  {
    name: "Elite Sports Nutrition",
    description:
      "Premium nutrition supplements tailored for peak athletic performance.",
    image:
      "https://i.pinimg.com/564x/16/66/30/1666307a7069a356e2a5b97d1bb9903e.jpg",
  },
  {
    name: "Champion Sportswear",
    description:
      "Durable and trendy sportswear for cricket players of all levels.",
    image:
      "https://i.pinimg.com/564x/4a/fb/75/4afb75adc6198afedfb78e85ac93a891.jpg",
  },
  {
    name: "Dynamic Sports Tech",
    description:
      "Innovative technology solutions for enhanced game analysis and performance.",
    image:
      "https://i.pinimg.com/564x/c3/1a/b3/c31ab355c6a6c06e534ba22abc11c063.jpg",
  },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [galleryDetails, setGalleryDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(
          "https://cricbuzz-cricket.p.rapidapi.com/photos/v1/index",
          {
            method: "GET",
            headers: {
              "x-rapidapi-key": options.headers["X-RapidAPI-Key"],
              "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch photos");
        }

        const data = await response.json();
        const filteredPhotos = data.photoGalleryInfoList.filter(
          (item) => item.photoGalleryInfo
        );
        setPhotos(filteredPhotos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const fetchGalleryDetails = async (galleryId) => {
    setDetailsLoading(true);
    try {
      const response = await fetch(
        `https://cricbuzz-cricket.p.rapidapi.com/photos/v1/detail/${galleryId}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": options.headers["X-RapidAPI-Key"],
            "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch gallery details");
      }

      const data = await response.json();
      setGalleryDetails(data);
    } catch (err) {
      console.error("Error fetching gallery details:", err);
      setError(err.message);
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleCardClick = (gallery) => {
    setSelectedGallery(gallery);
    fetchGalleryDetails(gallery.galleryId);
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    setSelectedGallery(null);
    setGalleryDetails(null);
    document.body.classList.remove("modal-open");
  };

  const formatDate = (timestamp) => {
    return new Date(parseInt(timestamp)).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (error && !selectedGallery) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠</div>
        <p>Error: {error}</p>
        <button
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="">
      {/* <Gallery /> */}
      <div className="relative h-screen flex items-center justify-center text-white">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-55 flex flex-col justify-center items-start pl-20">
              <p className="text-[100px] font-my1 font-bold drop-shadow-lg transition-opacity duration-1000 ease-in-out">
                {image.title}
              </p>
              <p className="text-5xl font-my2 mt-2 text-gray-300 drop-shadow-md transition-opacity duration-1000 ease-in-out">
                {image.sTitle}
              </p>
              <p className="text-sm font-my3 mt-3 text-gray-400 uppercase drop-shadow-md transition-opacity duration-1000 ease-in-out">
                {image.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Gallery />

      {/* second */}
      <div className="py-12 bg-[#0c131a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-my3 p-2 text-white font-semibold tracking-wide uppercase">
              WickPlay Sponsors
            </h2>
            <p className="px-16 py-5 text-lg font-my leading-8 font-semibold tracking-tight text-gray-400 sm:text-4xl">
              Thank you to our sponsors for their unwavering support and
              commitment to the spirit of cricket.
            </p>
          </div>
          <div className="mt-10 font-my">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sponsors.map((sponsor, index) => (
                <div
                  key={index}
                  className="relative bg-gray-800 shadow-lg rounded-lg overflow-hidden transform transition-transform duration-500 hover:scale-105 group"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-50"
                      src={sponsor.image}
                      alt={sponsor.name}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white">
                      {sponsor.name}
                    </h3>
                    <p className="mt-3 text-gray-400">{sponsor.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 text-center">
            <a
              href="/contact"
              className="inline-block bg-indigo-600 text-white py-3 px-6 rounded-md text-lg font-medium hover:bg-indigo-700 transition duration-300"
            >
              Become a Sponsor
            </a>
          </div>
        </div>
      </div>

      {/* third */}

      

      
    </div>
  );
};

export default Home;

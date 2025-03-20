import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const images = [
  {
    id: 1,
    src: "https://img.freepik.com/free-photo/portrait-person-playing-cricket-sport_23-2151702088.jpg?t=st=1726588850~exp=1726592450~hmac=41776da5fb8cedf4e39d7361890af7feaf3e4c1d035f3ebfa96c7b829493aeab&w=360",
    description: "Cricket player in action",
  },
  {
    id: 2,
    src: "https://img.freepik.com/free-photo/portrait-person-playing-cricket-sport_23-2151702146.jpg?t=st=1726588897~exp=1726592497~hmac=5ad4ffbd570a9da1525fc778d77ceab0004e1dacf3823fd9cbc0dd214682b533&w=360",
    description: "Cricket player during a match",
  },
  {
    id: 3,
    src: "https://img.freepik.com/free-photo/medium-shot-baseball-player-portrait_23-2151207847.jpg?t=st=1726588947~exp=1726592547~hmac=34d812e361c520f351cc5de6c9887b00829b6b0a88dbae30094329294df4c475&w=996",
    description: "Cricket player portrait",
  },
  {
    id: 4,
    src: "https://img.freepik.com/free-photo/cricket-match-with-player_23-2151702176.jpg?t=st=1726589013~exp=1726592613~hmac=82d4c8238db474adf023cdff3a8ec78fb6e89fc1ecf6870837515cba3f673dee&w=996",
    description: "Cricket match in action",
  },
  {
    id: 5,
    src: "https://img.freepik.com/free-photo/cricket-match-with-player_23-2151702212.jpg?t=st=1726589090~exp=1726592690~hmac=7e76c82010f9ebe51938b30d2547adb57ef0e2344d5096bc28651fa8094841c0&w=996",
    description: "Close-up of a cricket player",
  },
];

function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play effect for infinite scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-full mx-auto p-5 text-center bg-gray-900 min-h-[600px] flex flex-col items-center justify-center">
      <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-6 drop-shadow-lg">
        Tournament Gallery
      </h1>

      {/* Responsive Carousel */}
      <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-[400px] sm:h-[450px] md:h-[500px] flex items-center justify-center overflow-hidden">
        {images.map((image, index) => {
          const offset = (index - currentIndex) * 100;
          const isActive = index === currentIndex;

          return (
            <motion.div
              key={image.id}
              className="absolute w-[80%] sm:w-[70%] md:w-[60%] h-[70%] sm:h-[75%] md:h-[80%] transition-transform duration-700"
              initial={{ opacity: 0 }}
              animate={{
                opacity: isActive ? 1 : 0.5,
                scale: isActive ? 1 : 0.8,
                x: `${offset}%`,
                rotateY: isActive ? 0 : offset > 0 ? -20 : 20,
                zIndex: isActive ? 10 : 5,
              }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              <img
                src={image.src}
                alt={image.description}
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
              />
              <motion.p
                className="text-sm sm:text-lg text-white mt-2 sm:mt-3 opacity-80"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {image.description}
              </motion.p>
            </motion.div>
          );
        })}
      </div>

      {/* Dots Navigation */}
      <div className="flex mt-5 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white scale-125" : "bg-gray-500"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
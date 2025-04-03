// import React, { useEffect, useState } from "react";
// import options from "../../apiOptions";

// // Function to download an image
// const downloadImage = (url, filename) => {
//   fetch(url)
//     .then((response) => response.blob())
//     .then((blob) => {
//       const link = document.createElement("a");
//       link.href = URL.createObjectURL(blob);
//       link.download = filename;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     })
//     .catch((error) => console.error("Error downloading image:", error));
// };

// const PhotoGallery = () => {
//   const [photos, setPhotos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedGallery, setSelectedGallery] = useState(null);
//   const [galleryDetails, setGalleryDetails] = useState(null);
//   const [detailsLoading, setDetailsLoading] = useState(false);

//   useEffect(() => {
//     const fetchPhotos = async () => {
//       try {
//         const response = await fetch(
//           "https://cricbuzz-cricket.p.rapidapi.com/photos/v1/index",
//           {
//             method: "GET",
//             headers: {
//               "x-rapidapi-key": options.headers["X-RapidAPI-Key"],
//               "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch photos");
//         }

//         const data = await response.json();
//         const filteredPhotos = data.photoGalleryInfoList.filter(
//           (item) => item.photoGalleryInfo
//         );
//         setPhotos(filteredPhotos);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPhotos();
//   }, []);

//   const fetchGalleryDetails = async (galleryId) => {
//     setDetailsLoading(true);
//     try {
//       const response = await fetch(
//         `https://cricbuzz-cricket.p.rapidapi.com/photos/v1/detail/${galleryId}`,
//         {
//           method: "GET",
//           headers: {
//             "x-rapidapi-key": options.headers["X-RapidAPI-Key"],
//             "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch gallery details");
//       }

//       const data = await response.json();
//       setGalleryDetails(data);
//     } catch (err) {
//       console.error("Error fetching gallery details:", err);
//       setError(err.message);
//     } finally {
//       setDetailsLoading(false);
//     }
//   };

//   const handleCardClick = (gallery) => {
//     setSelectedGallery(gallery);
//     fetchGalleryDetails(gallery.galleryId);
//     document.body.classList.add("modal-open");
//   };

//   const closeModal = () => {
//     setSelectedGallery(null);
//     setGalleryDetails(null);
//     document.body.classList.remove("modal-open");
//   };

//   const formatDate = (timestamp) => {
//     return new Date(parseInt(timestamp)).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   return (
//     <div className="photo-gallery-container">
//       <div className="py-12 bg-[#0f1720]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Title Section */}
//           <div className="text-center">
//             <h1 className="text-3xl font-my3 p-2 text-white font-semibold tracking-wide uppercase">
//               Cricket Photo Gallery
//             </h1>
//             <p className="px-36 py-5 text-lg font-my leading-8 font-semibold tracking-tight text-gray-400 sm:text-4xl">
//               Explore the exciting moments from cricket matches around the world
//             </p>
//           </div>

//           {/* Photo Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 font-my">
//              {photos.map((item) => (
//               <div
//                 key={item.photoGalleryInfo.galleryId}
//                 className="relative bg-gray-800 shadow-lg rounded-lg overflow-hidden transform transition-transform duration-500 hover:scale-105 group"
//                 onClick={() => handleCardClick(item.photoGalleryInfo)}
//               >
//                 <div className="relative h-56 overflow-hidden">
//                   <img
//                     src={`https://www.cricbuzz.com/a/img/v1/300x300/i1/c${item.photoGalleryInfo.imageId}/photo-gallery.jpg`}
//                     alt={item.photoGalleryInfo.headline}
//                     className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-50"
//                     onError={(e) => {
//                       e.target.src = "https://via.placeholder.com/300";
//                     }}
//                   />
//                   <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <button className="bg-indigo-600 text-white py-2 px-4 rounded-md transform transition-all duration-500 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-hover:shadow-lg group-hover:shadow-indigo-500/50">
//                       View Gallery
//                     </button>
//                   </div>
//                 </div>
//                 <div className="p-6">
//                   <h3 className="text-lg font-bold text-white">
//                     {item.photoGalleryInfo.headline}
//                   </h3>
//                   <p className="mt-3 text-gray-400">
//                     {formatDate(item.photoGalleryInfo.publishedTime)}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Modal for Gallery Details */}
//           {selectedGallery && (
//             <div
//               className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
//               onClick={closeModal}
//             >
//               <div
//                 className="relative bg-gray-900 text-white rounded-lg shadow-lg max-w-5xl w-full p-0 max-h-[90vh] overflow-y-auto"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="sticky top-0 bg-gray-800 z-10 shadow-md p-4 border-b border-gray-600 flex justify-between items-center">
//                   <h2 className="text-xl font-semibold text-gray-200">
//                     {selectedGallery.headline}
//                   </h2>
//                   <button
//                     className="text-gray-400 hover:text-white text-2xl"
//                     onClick={closeModal}
//                   >
//                     &times;
//                   </button>
//                 </div>

//                 {detailsLoading ? (
//                   <div className="flex justify-center py-6">
//                     <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
//                   </div>
//                 ) : galleryDetails ? (
//                   <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                     {galleryDetails.photoGalleryDetails?.map((photo, index) => {
//                       const imageUrl = `https://www.cricbuzz.com/a/img/v1/600x400/i1/c${photo.imageId}/photo-gallery.jpg`;
//                       const imageName = photo.caption
//                         ? photo.caption.replace(/\s+/g, "_") + ".jpg"
//                         : `image_${index}.jpg`;

//                       return (
//                         <div
//                           key={photo.imageId}
//                           className="relative rounded-lg overflow-hidden shadow-md hover:scale-105 transition group"
//                         >
//                           <img
//                             src={imageUrl}
//                             alt={photo.caption}
//                             className="w-full h-64 object-cover"
//                           />

//                           {/* Hover Overlay */}
//                           <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-3">
//                             <span className="text-white text-sm mb-2">
//                               {photo.caption}
//                             </span>
//                             <button
//                               className="bg-green-500 text-white px-3 py-1 rounded-md"
//                               onClick={() => downloadImage(imageUrl, imageName)}
//                             >
//                               Download
//                             </button>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 ) : (
//                   <p className="text-center text-red-400 p-4">
//                     Failed to load gallery details.
//                   </p>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PhotoGallery;




import React, { useEffect, useState } from "react";
import "./PhotoGallery.css";
import options from "../../apiOptions";

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [galleryDetails, setGalleryDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

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
        // Filter out ads and only keep photoGalleryInfo objects
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
    // Add body class to prevent scrolling when modal is open
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    setSelectedGallery(null);
    setGalleryDetails(null);
    // Remove body class when modal is closed
    document.body.classList.remove("modal-open");
  };

  const formatDate = (timestamp) => {
    return new Date(parseInt(timestamp)).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // if (loading) {
  //   return (
  //     <div className="loading-container">
  //       <div className="loading-spinner"></div>
  //       <p>Loading galleries...</p>
  //     </div>
  //   );
  // }

  if (error && !selectedGallery) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
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
    <div className="photo-gallery-container">
      <div className="gallery-header">
        <h1>Cricket Photo Gallery</h1>
        <p className="gallery-subtitle">
          Explore the exciting moments from cricket matches around the world
        </p>
      </div>

      <div className="photo-grid">
        {photos.map((item) => (
          <div 
            key={item.photoGalleryInfo.galleryId} 
            className="photo-card"
            onClick={() => handleCardClick(item.photoGalleryInfo)}
          >
            <div className="card-image-container">
              <img
                src={`https://www.cricbuzz.com/a/img/v1/300x300/i1/c${item.photoGalleryInfo.imageId}/photo-gallery.jpg`}
                alt={item.photoGalleryInfo.headline}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300"; // Fallback image
                }}
              />
              <div className="image-overlay">
                <span className="view-details">View Gallery</span>
              </div>
            </div>
            <div className="photo-info">
              <h2>{item.photoGalleryInfo.headline}</h2>
              <p className="publish-date">
                <span className="date-icon">📅</span> {formatDate(item.photoGalleryInfo.publishedTime)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for gallery details */}
      {selectedGallery && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>
              ×
            </button>
            
            <div className="modal-header">
              <h2>{selectedGallery.headline}</h2>
              <p className="modal-date">
                Published: {formatDate(selectedGallery.publishedTime)}
              </p>
            </div>

            {detailsLoading ? (
              <div className="modal-loading">
                <div className="loading-spinner"></div>
                <p>Loading gallery details...</p>
              </div>
            ) : galleryDetails ? (
              <div className="modal-body">
                {galleryDetails.tags && galleryDetails.tags.length > 0 && (
                  <div className="tags-container">
                    {galleryDetails.tags.map((tag, index) => (
                      <span key={`${tag.itemId}-${index}`} className="tag">
                        {tag.itemName}
                      </span>
                    ))}
                  </div>
                )}

                <div className="gallery-photos">
                  {galleryDetails.photoGalleryDetails && 
                   galleryDetails.photoGalleryDetails.map((photo, index) => (
                    <div key={`${photo.imageId}-${index}`} className="gallery-photo-item">
                      <div className="photo-number">{index + 1}/{galleryDetails.photoGalleryDetails.length}</div>
                      <img
                        src={`https://www.cricbuzz.com/a/img/v1/600x400/i1/c${photo.imageId}/photo-gallery.jpg`}
                        alt={photo.caption}
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/600x400"; // Fallback image
                        }}
                      />
                      <div className="photo-caption">
                        <p>{photo.caption}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="modal-error">
                <p>Failed to load gallery details. Please try again.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
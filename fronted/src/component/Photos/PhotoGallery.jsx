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
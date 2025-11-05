
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const { imdbID, Year, Poster, Title, Type } = movie;
  const navigate = useNavigate();
  const [showTrailer, setShowTrailer] = useState(false);

  // Proxy Download Links
  // const sources = {
  //   movie: `https://fzmovies.live/search.php?searchname=${encodeURIComponent(Title)}`,
  //   series: `https://o2tvseries4u.com/search/list_all_tv_series.php?search=${encodeURIComponent(Title)}`,
  // };

  // const handleDownload = (type = "movie") => {
  //   const fileUrl = sources[type];
  //   const proxyUrl = `http://localhost:5000/download?url=${encodeURIComponent(fileUrl)}&name=${encodeURIComponent(Title)}`;
  //   const link = document.createElement("a");
  //   link.href = proxyUrl;
  //   link.target = "_blank";
  //   document.body.appendChild(link);
  //   link.click();
  //   link.remove();
  // };

  return (
    <div className="movie-card">
      {/* Trailer Modal */}
      {showTrailer && (
        <div className="trailer-overlay">
          <div className="trailer-box">
            <button className="close-trailer" onClick={() => setShowTrailer(false)}>
              ✕
            </button>
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(
                Title + " trailer"
              )}`}
              title={`${Title} Trailer`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Movie Poster */}
      <div className="movie" onClick={() => navigate(`/details/${imdbID}`)} style={{ cursor: "pointer" }}>
        <div>
          <p>{Year}</p>
        </div>
        <div>
          <img
            src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/400"}
            alt={Title}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
        <div>
          <span style={{ textTransform: "capitalize" }}>{Type}</span>
          <h3>{Title}</h3>
        </div>
      </div>

      {/* Action Buttons */}
      {/* <div className="movie-actions" style={{ marginTop: 8, display: "flex", gap: 8 }}>
        <button className="btn" onClick={() => setShowTrailer(true)}>
          ▶ Watch Trailer
        </button>
        <button
          className="btn"
          onClick={() => handleDownload(Type === "movie" ? "movie" : "series")}
        >
          ⤓ Download
        </button>
      </div> */}
    </div>
  );
};

export default MovieCard;

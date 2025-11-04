// import React, { useState } from "react";

// const MovieCard = ({ movie }) => {
//   const { imdbID, Year, Poster, Title, Type } = movie;

//   const imdbUrl = `https://www.imdb.com/title/${imdbID}/`;
//   const awafimUrl = `https://tv.awafim.com.ng/?s=${encodeURIComponent(Title)}`;
//   const fzmoviesUrl = `https://fzmovies.live//search.php?searchname=${encodeURIComponent(
//     Title
//   )}`;
//   const nkiriUrl = `https://nkiri.com/category/international/?s=${encodeURIComponent(
//     Title
//   )}`;

//   const netnaijaUrl = `https://www.thenetnaija.net/search?t=${encodeURIComponent(
//     Title
//   )}`;
//   const o2tvseriesUrl = `https://o2tvseries4u.com/search/list_all_tv_series.php?search=${encodeURIComponent(
//     Title
//   )}`;

//   const fztvseriesUrl = `https://fztvseries.live///search/${encodeURIComponent(
//     Title
//   )}`;
//   const awafimURL = `https://tv.awafim.com.ng/?s=${encodeURIComponent(Title)}`;


//   const [showTrailer, setShowTrailer] = useState(false);

//   return (
//     <div className="movie-card">
//       {showTrailer && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100vw",
//             height: "100vh",
//             background: "rgba(0,0,0,0.9)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             zIndex: 9999,
//           }}
//         >
//           <div
//             style={{
//               position: "relative",
//               width: "80%",
//               maxWidth: "720px",
//               background: "#000",
//               borderRadius: "10px",
//               overflow: "hidden",
//             }}
//           >
//             <button
//               onClick={() => setShowTrailer(false)}
//               style={{
//                 position: "absolute",
//                 top: 10,
//                 right: 10,
//                 background: "red",
//                 color: "white",
//                 border: "none",
//                 padding: "6px 12px",
//                 cursor: "pointer",
//                 borderRadius: "6px",
//                 zIndex: 1000,
//               }}
//             >
//               ✕ Close
//             </button>
//             <iframe
//               width="100%"
//               height="400"
//               src={`https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(
//                 Title + " trailer"
//               )}`}
//               title={`${Title} Trailer`}
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             ></iframe>
//           </div>
//         </div>
//       )}
//       <a
//         href={imdbUrl}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="movie-link"
//       >
//         <div className="movie">
//           <div>
//             <p>{Year}</p>
//           </div>
//           <div>
//             <img
//               src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/400"}
//               alt={Title}
//               style={{ width: "100%", height: "auto", display: "block" }}
//             />
//           </div>
//           <div>
//             <span style={{ textTransform: "capitalize" }}>{Type}</span>
//             <h3>{Title}</h3>
//           </div>
//         </div>
//       </a>

//       <div
//         className="movie-actions"
//         style={{ marginTop: 8, display: "flex", gap: 8 }}
//       >
//         <button className="btn" onClick={() => setShowTrailer(true)}>
//           ▶ Watch Trailer
//         </button>
//         {Type === "movie" ? (
//           <div className="dropdown">
//             <button className="btn">⤓ Download Movie</button>
//             <div className="dropdown-content">
//               <a href={awafimUrl} target="_blank" rel="noopener noreferrer">
//                 Awafim
//               </a>
//               <a href={fzmoviesUrl} target="_blank" rel="noopener noreferrer">
//                 Fzmovies
//               </a>
//               <a href={nkiriUrl} target="_blank" rel="noopener noreferrer">
//                 Nkiri
//               </a>
//             </div>
//           </div>
//         ) : (
//           <div className="dropdown">
//             <button className="btn">⤓ Download Series</button>
//             <div className="dropdown-content">
//               <a href={netnaijaUrl} target="_blank" rel="noopener noreferrer">
//                 Netnaija
//               </a>
//               <a href={o2tvseriesUrl} target="_blank" rel="noopener noreferrer">
//                 O2TVSeries
//               </a>
//               <a href={fztvseriesUrl} target="_blank" rel="noopener noreferrer">
//                 FzTVSeries
//               </a>
//               <a href={awafimURL} target="_blank" rel="noopener noreferrer">
//                 Awafim
//               </a>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MovieCard;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const { imdbID, Year, Poster, Title, Type } = movie;
  const navigate = useNavigate();
  const [showTrailer, setShowTrailer] = useState(false);

  // Proxy Download Links
  const sources = {
    movie: `https://fzmovies.live/search.php?searchname=${encodeURIComponent(Title)}`,
    series: `https://o2tvseries4u.com/search/list_all_tv_series.php?search=${encodeURIComponent(Title)}`,
  };

  const handleDownload = (type = "movie") => {
    const fileUrl = sources[type];
    const proxyUrl = `http://localhost:5000/download?url=${encodeURIComponent(fileUrl)}&name=${encodeURIComponent(Title)}`;
    const link = document.createElement("a");
    link.href = proxyUrl;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

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
      <div className="movie-actions" style={{ marginTop: 8, display: "flex", gap: 8 }}>
        <button className="btn" onClick={() => setShowTrailer(true)}>
          ▶ Watch Trailer
        </button>
        <button
          className="btn"
          onClick={() => handleDownload(Type === "movie" ? "movie" : "series")}
        >
          ⤓ Download
        </button>
      </div>
    </div>
  );
};

export default MovieCard;

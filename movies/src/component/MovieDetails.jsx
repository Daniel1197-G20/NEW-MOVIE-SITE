// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "../App.css";

// const API_URL = "https://www.omdbapi.com?apikey=27c8ae17";

// const MovieDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [movie, setMovie] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [seasonList, setSeasonList] = useState([]);
//   const [selectedSeason, setSelectedSeason] = useState("");

//   useEffect(() => {
//     const fetchMovie = async () => {
//       const res = await fetch(`${API_URL}&i=${id}&plot=full`);
//       const data = await res.json();
//       setMovie(data);
//       setLoading(false);

//       if (data.Type === "series" && data.totalSeasons) {
//         const seasons = Array.from(
//           { length: parseInt(data.totalSeasons) },
//           (_, i) => i + 1
//         );
//         setSeasonList(seasons);
//       }
//     };
//     fetchMovie();
//   }, [id]);

//   const handleDownload = (type) => {
//     let searchQuery = "";

//     if (type === "movie") {
//       searchQuery = movie.Title;
//     } else if (type === "series" && selectedSeason) {
//       searchQuery = `${movie.Title} Season ${selectedSeason}`;
//     }

//     const awafimUrl = `https://tv.awafim.com.ng/?s=${encodeURIComponent(
//       searchQuery
//     )}`;
//     window.open(awafimUrl, "_blank");
//   };

//   if (loading) return <div className="loading">Loading...</div>;
//   if (!movie || movie.Response === "False")
//     return <div className="error">Movie not found</div>;

//   return (
//     <div className="details-page">
//       <button className="back-btn" onClick={() => navigate("/")}>
//         ← Back
//       </button>

//       <div
//         className="details-wrapper"
//         style={{
//           backgroundImage: `url(${movie.Poster})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//         }}
//       >
//         <div className="details-overlay">
//           <div className="details-content">
//             {/* Poster */}
//             <div className="details-poster">
//               <img
//                 src={
//                   movie.Poster !== "N/A"
//                     ? movie.Poster
//                     : "https://via.placeholder.com/400"
//                 }
//                 alt={movie.Title}
//               />
//             </div>

//             {/* Info */}
//             <div className="details-info">
//               <h1>{movie.Title}</h1>
//               <p className="meta">
//                 {movie.Year} • {movie.Genre} • ⭐ {movie.imdbRating}
//               </p>
//               <p className="plot">{movie.Plot}</p>
//               <p>
//                 <strong>Director:</strong> {movie.Director}
//               </p>
//               <p>
//                 <strong>Actors:</strong> {movie.Actors}
//               </p>

//               {/* Watch Trailer */}
//               <button
//                 className="btn-trailer"
//                 onClick={() =>
//                   window.open(
//                     `https://www.youtube.com/results?search_query=${encodeURIComponent(
//                       movie.Title + " trailer"
//                     )}`,
//                     "_blank"
//                   )
//                 }
//               >
//                 ▶ Watch Trailer
//               </button>

//               {/* Movie Download */}
//               {movie.Type === "movie" ? (
//                 <button
//                   className="btn-download"
//                   onClick={() => handleDownload("movie")}
//                 >
//                   ⤓ Download Movie
//                 </button>
//               ) : (
//                 <div className="series-controls">
//                   <h3>Select Season</h3>
//                   <select
//                     onChange={(e) => setSelectedSeason(e.target.value)}
//                     value={selectedSeason}
//                   >
//                     <option value="">-- Select Season --</option>
//                     {seasonList.map((num) => (
//                       <option key={num} value={num}>
//                         Season {num}
//                       </option>
//                     ))}
//                   </select>

//                   {selectedSeason && (
//                     <button
//                       className="btn-download"
//                       onClick={() => handleDownload("series")}
//                     >
//                       ⤓ Download Season {selectedSeason}
//                     </button>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieDetails;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../App.css";

const API_URL = "https://www.omdbapi.com?apikey=27c8ae17";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch movie or series info
  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(`${API_URL}&i=${id}&plot=full`);
      const data = await res.json();
      setMovie(data);
      setLoading(false);
    };
    fetchMovie();
  }, [id]);

  // ✅ Redirect to Awafim search page
  const handleDownload = () => {
    const searchQuery =
      movie.Type === "series"
        ? `${movie.Title} series`
        : `${movie.Title} movie`;

    const awafimUrl = `https://tv.awafim.com.ng/?s=${encodeURIComponent(
      searchQuery
    )}`;
    window.open(awafimUrl, "_blank");
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!movie || movie.Response === "False")
    return <div className="error">Movie not found</div>;

  return (
    <div className="details-page">
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back
      </button>

      <div
        className="details-wrapper"
        style={{
          backgroundImage: `url(${movie.Poster})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="details-overlay">
          <div className="details-content">
            {/* Poster */}
            <div className="details-poster">
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/400"
                }
                alt={movie.Title}
              />
            </div>

            {/* Info */}
            <div className="details-info">
              <h1>{movie.Title}</h1>
              <p className="meta">
                {movie.Year} • {movie.Genre} • ⭐ {movie.imdbRating}
              </p>
              <p className="plot">{movie.Plot}</p>
              <p>
                <strong>Director:</strong> {movie.Director}
              </p>
              <p>
                <strong>Actors:</strong> {movie.Actors}
              </p>

              {/* Watch Trailer */}
              <button
                className="btn-trailer"
                onClick={() =>
                  window.open(
                    `https://www.youtube.com/results?search_query=${encodeURIComponent(
                      movie.Title + " trailer"
                    )}`,
                    "_blank"
                  )
                }
              >
                ▶ Watch Trailer
              </button>

              {/* Download Button (changes text automatically) */}
              <button className="btn-download" onClick={handleDownload}>
                ⤓ Download {movie.Type === "series" ? "Series" : "Movie"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

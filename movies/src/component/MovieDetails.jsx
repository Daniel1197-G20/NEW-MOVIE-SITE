// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "../App.css";

// const API_URL = "https://www.omdbapi.com?apikey=27c8ae17";

// const MovieDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [movie, setMovie] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMovie = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(`${API_URL}&t=${id}&plot=full`);
//         const data = await res.json();
//         if (data.Response === "True") {
//           setMovie(data);
//         } else {
//           setMovie(null);
//         }
//       } catch (err) {
//         console.error("Error fetching movie:", err);
//         setMovie(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMovie();
//   }, [id]);

//   if (loading) return <div className="loading">Loading...</div>;
//   if (!movie) return <div className="error">Movie not found</div>;

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

//               <button
//                 className="btn-download"
//                 onClick={() =>
//                   window.open(
//                     `https://awafim.net/search.php?searchname=${encodeURIComponent(
//                       movie.Title
//                     )}`,
//                     "_blank"
//                   )
//                 }
//               >
//                 ⤓ Download {movie.Type === "series" ? "Series" : "Movie"}
//               </button>
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



  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}&t=${id}&plot=full`);
        const data = await res.json();
        if (data.Response === "True") {
          setMovie(data);
        } else {
          setMovie(null);
        }
      } catch (err) {
        console.error("Error fetching movie:", err);
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);



  if (loading) return <div className="loading">Loading...</div>;
  if (!movie) return <div className="error">Movie not found</div>;

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

              <button
                className="btn-download"
                onClick={() =>
                  window.open(
                    `https://tv.awafim.com.ng/search.php?searchname=${encodeURIComponent(
                      movie.Title
                    )}`,
                    "_blank"
                  )
                }
              >
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

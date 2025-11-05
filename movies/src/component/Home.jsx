// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // for routing to details page
// import MovieCard from "./MovieCard";
// import SearchBar from "./searchBar";
// import "../App.css";

// const API_URL = "https://www.omdbapi.com?apikey=27c8ae17";

// const Home = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [movies, setMovies] = useState([]);
//   const [page, setPage] = useState(1);
//   const navigate = useNavigate();

//   const searchMovies = async (title, newSearch = true, pageNumber = 1) => {
//     const response = await fetch(`${API_URL}&s=${title}&page=${pageNumber}`);
//     const data = await response.json();

//     if (newSearch) {
//       setMovies(data.Search || []);
//       setPage(1);
//     } else {
//       setMovies((prevMovies) => [...prevMovies, ...(data.Search || [])]);
//     }
//   };

//   useEffect(() => {
//     searchMovies("The chosen");
//   }, []);

//   return (
//     <div className="app">
//       <h1>Film haven</h1>

//       <SearchBar
//         searchTerm={searchTerm}
//         setSearchTerm={setSearchTerm}
//         searchMovies={searchMovies}
//       />

//       {movies?.length > 0 ? (
//         <div className="container">
//           {movies.map((movie) => (
//             <div
//               key={movie.imdbID}
//               onClick={() => navigate(`/details/${movie.imdbID}`)} // open details page
//             >
//               <MovieCard movie={movie} />
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="empty">
//           <h2>No movies found</h2>
//         </div>
//       )}

//       {movies?.length > 0 && (
//         <button
//           className="load-more"
//           onClick={() => {
//             const nextPage = page + 1;
//             searchMovies(searchTerm || "The chosen", false, nextPage);
//             setPage(nextPage);
//           }}
//         >
//           Load More
//         </button>
//       )}
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";
import SearchBar from "./searchBar";
import "../App.css";

const API_URL = "https://www.omdbapi.com?apikey=27c8ae17";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showingLatest, setShowingLatest] = useState(true);
  const navigate = useNavigate();

  // 🔹 Fetch Latest Movies from your backend (TMDb)
  const fetchLatestMovies = async (pageNum = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/latest?page=${pageNum}`);
      const data = await res.json();
      if (data.success) {
        if (pageNum === 1) {
          setMovies(data.movies);
        } else {
          setMovies((prev) => [...prev, ...data.movies]);
        }
        setShowingLatest(true);
      }
    } catch (err) {
      console.error("Error fetching latest movies:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Search Movies from OMDb
  const searchMovies = async (title, newSearch = true, pageNumber = 1) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}&s=${title}&page=${pageNumber}`);
      const data = await response.json();

      if (newSearch) {
        setMovies(data.Search || []);
        setPage(1);
      } else {
        setMovies((prev) => [...prev, ...(data.Search || [])]);
      }
      setShowingLatest(false);
    } catch (error) {
      console.error("Error searching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Load latest movies by default on page load
  useEffect(() => {
    fetchLatestMovies();
  }, []);

  return (
    <div className="app">
      <h1>🎬 Film Haven</h1>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchMovies={searchMovies}
      />

      {loading ? (
        <div className="loading">Loading...</div>
      ) : movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <div
              key={movie.imdbID}
              onClick={() => navigate(`/details/${movie.imdbID}`)}
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}

      {movies?.length > 0 && (
        <button
          className="load-more"
          onClick={() => {
            const nextPage = page + 1;
            if (showingLatest) {
              fetchLatestMovies(nextPage);
            } else {
              searchMovies(searchTerm || "Avengers", false, nextPage);
            }
            setPage(nextPage);
          }}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Home;

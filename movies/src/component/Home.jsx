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

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Fetch latest movies from backend (TMDb)
  const fetchLatestMovies = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/latest?page=${pageNumber}`);
      const data = await res.json();
      if (data.success) {
        setMovies((prev) =>
          pageNumber === 1 ? data.movies : [...prev, ...data.movies]
        );
      }
    } catch (err) {
      console.error("Error fetching latest movies:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Search movies using OMDb
  const searchMovies = async (title, newSearch = true, pageNumber = 1) => {
    if (!title.trim()) {
      fetchLatestMovies(1);
      return;
    }

    const response = await fetch(
      `https://www.omdbapi.com?apikey=27c8ae17&s=${title}&page=${pageNumber}`
    );
    const data = await response.json();

    if (newSearch) {
      setMovies(data.Search || []);
      setPage(1);
    } else {
      setMovies((prevMovies) => [...prevMovies, ...(data.Search || [])]);
    }
  };

  // ✅ Load trending movies by default
  useEffect(() => {
    fetchLatestMovies();
  }, []);

  return (
    <div className="app">
      <h1>Film Haven</h1>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchMovies={searchMovies}
      />

      {loading && <div className="loading">Loading...</div>}

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <div
              key={movie.imdbID || movie.Title}
              onClick={() =>
                navigate(`/details/${encodeURIComponent(movie.Title)}`)
              }
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
            if (searchTerm) {
              searchMovies(searchTerm, false, nextPage);
            } else {
              fetchLatestMovies(nextPage);
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

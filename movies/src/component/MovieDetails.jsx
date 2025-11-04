import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../App.css";

const API_URL = "https://www.omdbapi.com?apikey=27c8ae17";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [seasonList, setSeasonList] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState("");
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(`${API_URL}&i=${id}&plot=full`);
      const data = await res.json();
      setMovie(data);
      setLoading(false);

      if (data.Type === "series" && data.totalSeasons) {
        const seasons = Array.from(
          { length: parseInt(data.totalSeasons) },
          (_, i) => i + 1
        );
        setSeasonList(seasons);
      }
    };
    fetchMovie();
  }, [id]);

  const fetchEpisodes = async (seasonNum) => {
    setSelectedSeason(seasonNum);
    setEpisodes([]);
    setSelectedEpisode("");
    try {
      const res = await fetch(`${API_URL}&i=${id}&Season=${seasonNum}`);
      const data = await res.json();
      if (data && data.Episodes) setEpisodes(data.Episodes);
    } catch (err) {
      console.error("Error fetching episodes:", err);
    }
  };

  const handleDownload = (title, type = "movie") => {
    const sources = {
      movie: `https://fzmovies.live/search.php?searchname=${encodeURIComponent(
        title
      )}`,
      series: `https://o2tvseries4u.com/search/list_all_tv_series.php?search=${encodeURIComponent(
        title
      )}`,
    };

    const fileUrl = sources[type];
    const proxyUrl = `http://localhost:5000/download?url=${encodeURIComponent(
      fileUrl
    )}&name=${encodeURIComponent(title)}`;

    const link = document.createElement("a");
    link.href = proxyUrl;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    link.remove();
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

              {movie.Type === "movie" ? (
                <button
                  className="btn-download"
                  onClick={() => handleDownload(movie.Title, "movie")}
                >
                  ⤓ Download Movie
                </button>
              ) : (
                <div className="series-controls">
                  <h3>Select Season</h3>
                  <select
                    onChange={(e) => fetchEpisodes(e.target.value)}
                    value={selectedSeason}
                  >
                    <option value="">-- Select Season --</option>
                    {seasonList.map((num) => (
                      <option key={num} value={num}>
                        Season {num}
                      </option>
                    ))}
                  </select>

                  {episodes.length > 0 && (
                    <>
                      <h3>Select Episode</h3>
                      <select
                        onChange={(e) => setSelectedEpisode(e.target.value)}
                        value={selectedEpisode}
                      >
                        <option value="">-- Select Episode --</option>
                        {episodes.map((ep) => (
                          <option key={ep.imdbID} value={ep.Title}>
                            {ep.Episode}. {ep.Title}
                          </option>
                        ))}
                      </select>
                    </>
                  )}

                  {selectedEpisode && (
                    <button
                      className="btn-download"
                      onClick={() => handleDownload(selectedEpisode, "series")}
                    >
                      ⤓ Download "{selectedEpisode}"
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

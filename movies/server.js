import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());

const TMDB_API_KEY = "your_tmdb_api_key_here"; // Paste your key here

app.get("/", (req, res) => res.send("🎬 Film Haven backend running!"));

app.get("/latest", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}&page=${page}`;
    const { data } = await axios.get(url);

    const movies = data.results.map((m) => ({
      imdbID: m.id,
      Title: m.title || m.name,
      Year: m.release_date ? m.release_date.split("-")[0] : "N/A",
      Poster: m.poster_path
        ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
        : "https://via.placeholder.com/400x600?text=No+Image",
      Type: "movie",
    }));

    res.json({ success: true, movies });
  } catch (err) {
    console.error("❌ Error fetching latest movies:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch latest movies",
    });
  }
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`✅ Film Haven backend running on port ${PORT}`)
);

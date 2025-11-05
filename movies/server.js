import express from "express";
import axios from "axios";
import cors from "cors";
import cheerio from "cheerio";

const app = express();
app.use(cors());

app.get("/download", async (req, res) => {
  const { url, name } = req.query;
  if (!url) return res.status(400).send("Missing URL");

  try {
    // Step 1: Load the HTML page
    const page = await axios.get(url);
    const $ = cheerio.load(page.data);

    // Step 2: Try to find a direct video link (.mp4 or .mkv)
    let realFileLink =
      $("a[href$='.mp4']").attr("href") || $("a[href$='.mkv']").attr("href");

    if (!realFileLink) {
      console.log("No direct video link found on page");
      return res.status(404).send("No downloadable video found");
    }

    // Step 3: Fix relative URLs if necessary
    if (realFileLink.startsWith("/")) {
      const baseUrl = new URL(url).origin;
      realFileLink = baseUrl + realFileLink;
    }

    console.log("🎬 Found video link:", realFileLink);

    
    const videoResponse = await axios({
      url: realFileLink,
      method: "GET",
      responseType: "stream",
    });

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${name || "movie"}.mp4"`
    );
    res.setHeader("Content-Type", "video/mp4");

    videoResponse.data.pipe(res);
  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(500).send("Failed to fetch file");
  }
});

app.listen(5000, () => console.log("🎬 Proxy running on port 5000"));

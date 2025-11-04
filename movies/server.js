import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/download", async (req, res) => {
  const { url, name } = req.query;
  if (!url) return res.status(400).send("Missing URL");

  try {
    // ✅ Step 1: Define allowed domains
    const allowedHosts = [
      "fzmovies.live",
      "nkiri.com",
      "tv.awafim.com.ng",
      "www.thenetnaija.net",
      "o2tvseries4u.com",
      "fztvseries.live",
    ];

    // ✅ Step 2: Extract hostname from the given URL
    const hostname = new URL(url).hostname;

    // ✅ Step 3: Block anything not in allowed list
    if (!allowedHosts.includes(hostname)) {
      console.warn(`❌ Blocked download attempt from disallowed domain: ${hostname}`);
      return res.status(403).send("❌ Domain not allowed");
    }

    // ✅ Step 4: Stream the file if the domain is allowed
    const response = await axios.get(url, {
      responseType: "stream",
      headers: req.headers.range ? { Range: req.headers.range } : {},
    });

    // ✅ Step 5: Set headers so the browser downloads properly
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${name || "file"}.mp4"`
    );
    if (response.headers["content-type"])
      res.setHeader("Content-Type", response.headers["content-type"]);
    if (response.headers["content-length"])
      res.setHeader("Content-Length", response.headers["content-length"]);
    if (response.headers["accept-ranges"])
      res.setHeader("Accept-Ranges", response.headers["accept-ranges"]);

    response.data.pipe(res);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Failed to fetch file");
  }
});

app.listen(5000, () => console.log("✅ Proxy running on port 5000"));

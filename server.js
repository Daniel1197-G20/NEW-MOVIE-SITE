import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/download", async (req, res) => {
  const fileUrl = req.query.url;

  try {
    const response = await fetch(fileUrl);
    const filename = fileUrl.split("/").pop();

    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    response.body.pipe(res);
  } catch (err) {
    res.status(500).send("Download failed.");
  }
});

app.listen(5000, () => console.log("✅ Proxy server running on port 5000"));

import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: "https://info-hub-git-main-darshans-projects-d895b122.vercel.app", // your Vercel URL
  methods: "GET,POST",
  credentials: true
}));

app.use(express.json());

const QUOTES = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "Whether you think you can or you think you can’t, you’re right.",
    author: "Henry Ford",
  },
  {
    text: "It always seems impossible until it’s done.",
    author: "Nelson Mandela",
  },
  {
    text: "The future depends on what you do today.",
    author: "Mahatma Gandhi",
  },
  {
    text: "You miss 100% of the shots you don’t take.",
    author: "Wayne Gretzky",
  },
];

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "InfoHub API",
    time: new Date().toISOString(),
  });
});

app.get("/api/quote", async (_req, res) => {
  try {
    const { data } = await axios.get("https://zenquotes.io/api/random");
    // data is array like: [{ q: "...", a: "..." }]
    res.json({ text: data[0].q, author: data[0].a });
  } catch (err) {
    console.error("Quote error:", err.message);
    res.status(500).json({ error: "Could not fetch quote." });
  }
});

app.get("/api/weather", async (req, res) => {
  const city = req.query.city || process.env.DEFAULT_CITY || "Hyderabad";
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return res
      .status(500)
      .json({ error: "Server missing OPENWEATHER_API_KEY." });
  }

  try {
    const url = "https://api.openweathermap.org/data/2.5/weather";
    const { data } = await axios.get(url, {
      params: { q: city, appid: apiKey, units: "metric" },
    });

    const simplified = {
      city: data.name,
      tempC: data.main?.temp,
      feelsLikeC: data.main?.feels_like,
      condition: data.weather?.[0]?.description || "N/A",
      icon: data.weather?.[0]?.icon || null,
    };

    res.json(simplified);
  } catch (err) {
    console.error("Weather error:", err.response?.data || err.message);
    res.status(500).json({ error: "Could not fetch weather data." });
  }
});

app.get("/api/currency", async (req, res) => {
  try {
    const { data } = await axios.get("https://open.er-api.com/v6/latest/USD"); // Base = USD (most stable worldwide)

    if (!data || data.result !== "success") {
      return res.status(500).json({ error: "Currency rates unavailable" });
    }

    res.json({
      base: "USD",
      rates: data.rates, // 🟢 return full currency list
      date: data.time_last_update_utc,
    });
  } catch (err) {
    console.log("Currency API error:", err.message);
    res.status(500).json({ error: "Could not fetch currency data" });
  }
});

app.listen(PORT, () => {
  console.log(`InfoHub API listening on http://localhost:${PORT}`);
});

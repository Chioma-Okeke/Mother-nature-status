const express = require("express");
const app = express();
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const PORT = 5000;

app.use(
    cors({
        origin: [
            "http://localhost:5174",
            "http://localhost:5173",
            "https://mother-nature-status.vercel.app",
        ], // Add your Vercel URL here
        optionsSuccessStatus: 200,
    })
);

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

app.get("/api/weather", async (req, res) => {
    const { q, units, lat, lon } = req.query;

    try {
        let url;
        if (q) {
            url = `${BASE_URL}weather?q=${q}&units=${units}&appid=${API_KEY}`;
        } else if (lat && lon) {
            url = `${BASE_URL}weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`;
        } else {
            throw new Error("Missing query parameters");
        }
        console.log(`Requesting URL: ${url}`);
        const response = await axios.get(url);
        console.log("Weather API response:", response.data);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching forecast data:", error.message);
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/forecast", async (req, res) => {
    const { lat, lon, units } = req.query;

    try {
        if (!lat || !lon || !units) {
            throw new Error("Missing query parameters");
        }
        const url = `${BASE_URL}forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`;
        console.log(`Requesting URL: ${url}`);
        const response = await axios.get(url);
        console.log("Forecast API response:", response.data);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching forecast data:", error.message);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

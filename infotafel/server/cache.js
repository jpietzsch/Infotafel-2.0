console.log("Hello from cache.js");

const express = require("express");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 8000;

const latitude = 50.84310553905255;
const longitude = 12.875960703035425;


app.use(cors());

const CACHE_FILE_WEATHER = path.join(__dirname, "weather_cache.json");

// full api link
// https://api.open-meteo.com/v1/dwd-icon?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,cloud_cover,apparent_temperature,rain,weather_code,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,rain_sum,wind_speed_10m_max&&hourly=temperature_2m,rain,weather_code&forecast_days=3&timeformat=unixtime&timezone=Europe%2FBerlin
// full api link
// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,apparent_temperature,rain,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,rain,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timeformat=unixtime


//#region [rgba(90,155,243,0.1)] WEATHER DATA
// Function to fetch current weather data from the online API

const fetchWeatherData = async () => {
  try {
    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,rain,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,rain,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timeformat=unixtime`,
    )
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}



const isTimestampExpired = (timestamp, expirationTime) => {
  //Time in Minutes
  return Date.now() - timestamp >= expirationTime * 60 * 1000;
}

app.get("/cache/weather", async (req, res) => {
  try {
    console.log("trigger weather cache")
    let data = await fetchWeatherData();
    res.json(data);

  } catch(error) {
    res.status(500).send("Failed to retrieve weather data");
  }
})
//#endregion
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
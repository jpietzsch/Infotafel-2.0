const express = require("express");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const cors = require("cors");
const cheerio = require("cheerio");

const app = express();
const PORT = 8000;

const latitude = 50.84310553905255;
const longitude = 12.875960703035425;


app.use(cors());

const CACHE_FILE = path.join(__dirname, "cache.json");

// full api link
// https://api.open-meteo.com/v1/dwd-icon?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,cloud_cover,apparent_temperature,rain,weather_code,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,rain_sum,wind_speed_10m_max&&hourly=temperature_2m,rain,weather_code&forecast_days=3&timeformat=unixtime&timezone=Europe%2FBerlin
// full api link
// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,apparent_temperature,rain,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,rain,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timeformat=unixtime


//#region [rgba(90,155,243,0.0)] WEATHER DATA
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
    let cache = {};
    if (fs.existsSync(CACHE_FILE)) {
      cache = JSON.parse(fs.readFileSync(CACHE_FILE));
      if (cache.weather && cache.weather.timestamp && !isTimestampExpired(cache.weather.timestamp, 5)) {
        console.log("return cached weather data")
        return res.json(cache.weather.data);
      } else {
        console.log("cache expired")
      }
    }
    let data = await fetchWeatherData();
    cache.weather = {
        timestamp: Date.now(),
        data
      }
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
    console.log("trigger weather cache");

    res.json(data);

  } catch(error) {
    res.status(500).send("Failed to retrieve weather data");
  }
})
//#endregion


async function parseFoodHTML(html) {
  const $ = cheerio.load(html);
  const daysOfWeek = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"];
  const data = [];
  $("div.speiseplan-lang .kw.slide:first").each((index, element) => {
    let i = 2;
    daysOfWeek.forEach((day) => {
      const meals = { menus: { menuName: [], alergenes: [] }, soup: { soupName: [], alergens: [] } };
      const date = $(element).find(`.col${i}.row1 span`).text().trim().replace(/\s\s+/g, " ");

      for (let j = 2; j <= 6; j++) {
        const meal = $(element).find(`.col${i}.row${j} p.gericht`).text().trim().replace(/\s\s+/g, " ");
        const menuParts = meal.split("/");

        if (menuParts.length > 1) {
          if (j === 2) {
            meals.soup.soupName.push(menuParts[0].trim());
            meals.soup.alergens.push(menuParts[1].trim());

          } else {
            meals.menus.menuName.push(menuParts[0].trim());
            meals.menus.alergenes.push(menuParts[1].trim());
          }
        }
      }
      data.push({ date, meals });
      i++;
    });
  });

  return data;
}


app.get("/cache/food", async (req, res) => {
  try {
    let cache = {};

    if (fs.existsSync(CACHE_FILE)) {
      cache = JSON.parse(fs.readFileSync(CACHE_FILE));
      if (cache.food && cache.food.timestamp && !isTimestampExpired(cache.food.timestamp, 5)) {
        console.log("return cached food data");
        return res.json(cache.food.data);
      } else {
        console.log("cache expired");
      }
    }

    try {
      console.log("Fetching speiseplan data...");
      const response = await axios.get(
        `https://www.kantine-chemnitz.de/speiseplan.html`,
      );
      const parsedFooddata = await parseFoodHTML(response.data);

      const timestamp = Date.now();

      cache.food = {
        timestamp: Date.now(),
        parsedFooddata
      }

      fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));

      res.json(parsedFooddata);
    } catch (error) {
      console.error("Error fetching speiseplan data:", error);
      throw error;
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
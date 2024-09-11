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

const CACHE_FILE_BUSPLAN = path.join(__dirname, "busplan_cache.json");
const CACHE_FILE_MEALPLAN = path.join(__dirname, "mealplan_cache.json");
const CACHE_FILE_WEATHER = path.join(__dirname, "weather_cache.json");

const fetchWeatherData = async () => {
  try {
    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,rain,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,rain,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timeformat=unixtime`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

const isTimestampExpired = (timestamp, expirationTime) => {
  return Date.now() - timestamp >= expirationTime * 60 * 1000;
};

app.get("/cache/weather", async (req, res) => {
  try {
    if (fs.existsSync(CACHE_FILE_WEATHER)) {
      const cachedData = JSON.parse(fs.readFileSync(CACHE_FILE_WEATHER, "utf8"));
      if (!isTimestampExpired(cachedData.timestamp, 5)) {
        res.json(cachedData.data);
        return;
      }
    }
    let data = await fetchWeatherData();
    let timestamp = Date.now();
    const cacheData = { data, timestamp };
    fs.writeFileSync(CACHE_FILE_WEATHER, JSON.stringify(cacheData));
    res.json(data);
  } catch (error) {
    res.status(500).send("Failed to retrieve weather data");
  }
});

async function fetchHTML(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching HTML:", error);
    throw error;
  }
}

function parseHTML(html) {
  const $ = cheerio.load(html);
  const data = [];
  $("div.std3_departure-line").each((index, element) => {
    const lineNr = $(element)
      .find(".std3_dm-mot-info a")
      .text()
      .trim()
      .replace(/[^0-9]/g, "")
      .substring(2, 0);
    const desc = $(element)
      .find(".std3_dm-mot-info")
      .text()
      .trim()
      .replace("Stadtbus", "")
      .replace(/\d+/g, "");
    const time = $(element).find(".std3_dm-time:first").text().trim();
    const realtime = $(element).find(".std3_realtime-column").text().trim();
    const existingEntryIndex = data.findIndex(
      (entry) => entry.lineNr === lineNr && entry.desc === desc
    );

    if (existingEntryIndex !== -1) {
      if (!realtime) {
        data[existingEntryIndex].times.push({ time });
      } else {
        data[existingEntryIndex].times.push({ time, realtime });
      }
    } else {
      if (!realtime) {
        data.push({ lineNr, desc, times: [{ time }] });
      } else {
        data.push({ lineNr, desc, times: [{ time, realtime }] });
      }
    }
    console.log(data);
  });

  return data;
}

function formatBusData(parsedData) {
  const busData = {};
  parsedData.forEach((entry) => {
    const { lineNr, desc, times } = entry;
    const departureTimes = times.map((timeObj) => timeObj.time);
    const realTimes = times.map((timeObj) => timeObj.realtime);
    busData[lineNr.trim()] = { desc: desc.trim(), departureTimes, realTimes };
  });
  return busData;
}

app.get("/cache/busplan", async (req, res) => {
  const baseUrl = "https://efa.vvo-online.de/VMSSL3/XSLT_DM_REQUEST";
  const currentDate = new Date();
  const url = `${baseUrl}?language=de&std3_suggestMacro=std3_suggest&std3_commonMacro=dm&itdDateTimeDepArr=dep&name_dm=Chemnitz%2C+Flemmingstr&type_dm=any&itdDateDayMonthYear=${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}&itdTime=${currentDate.getHours()}%3A${currentDate.getMinutes()}`;

  try {
    if (fs.existsSync(CACHE_FILE_BUSPLAN)) {
      const cachedData = JSON.parse(fs.readFileSync(CACHE_FILE_BUSPLAN, "utf8"));
      if (!isTimestampExpired(cachedData.timestamp, 1)) {
        res.json(cachedData);
        return;
      }
    }
    const html = await fetchHTML(url);
    const timestamp = Date.now();
    const parsedData = parseHTML(html);
    const busData = formatBusData(parsedData);
    const cacheData = { timestamp, busData };
    fs.writeFileSync(CACHE_FILE_BUSPLAN, JSON.stringify(cacheData));
    res.json(cacheData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

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
    if (fs.existsSync(CACHE_FILE_MEALPLAN)) {
      const cachedData = JSON.parse(fs.readFileSync(CACHE_FILE_MEALPLAN, "utf8"));
      res.json(cachedData.parsedFooddata); // Return only the parsed data
      return;
    }

    try {
      console.log("Fetching speiseplan data...");
      const response = await axios.get(`https://www.kantine-chemnitz.de/speiseplan.html`);
      const parsedFooddata = await parseFoodHTML(response.data);

      const timestamp = Date.now();
      const cacheData = { parsedFooddata, timestamp };
      fs.writeFileSync(CACHE_FILE_MEALPLAN, JSON.stringify(cacheData));

      res.json(parsedFooddata); // Send parsedFooddata
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

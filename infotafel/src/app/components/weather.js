"use client";

console.log("Wetter.js");

import React, { useState, useEffect } from "react";
import axios from "axios";

import DailyForecastComponent from "../components/weathers/DailyForecastComponent";
import CurrentWeatherComponent from "../components/weathers/CurrentWeatherComponent";

const API_BASE_URL = "http://localhost:8000/cache";

const debug = false;

/**
 * Renders the weather component.
 * Fetches weather data from an API and displays the current weather, hourly forecast, and daily forecast.
 * Handles loading and error states.
 *
 * @returns {JSX.Element} The rendered weather component.
 */
function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [weatherResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/weather`),
        ]);

        if (debug) {
          console.log("Weather data:", weatherResponse.data);
        }

        setWeatherData(weatherResponse.data);
        setLoading(false); // Set loading to false when all data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error gracefully, e.g., set loading to false and display error message
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const { current: { time } = {} } = weatherData || {};

  if (loading) {
    return (
      <div className="min-h-full h-screen flex flex-col justify-center items-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="min-h-full h-screen flex flex-col justify-center items-center">
        <div className="text-white text-2xl">Error: Data not available</div>
      </div>
    );
  }

  return (
    <div className="min-h-full h-screen flex flex-col flex-grow items-center">
      <h1 className="w-0 h-0" tabIndex="3">
        Wetter
      </h1>

      <div className="flex h-full w-full justify-center items-center flex-col">
        {/* Current Weather */}
        <CurrentWeatherComponent currentWeatherData={weatherData} />
      </div>
    </div>
  );
}

export default Weather;

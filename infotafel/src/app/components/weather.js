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
function Weather({ isActive }) {  // Pass a prop to check if this component is the active one
  console.log("Weather component isActive:", isActive);
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

  // Accessibility: Control tabindex based on whether the component is active
  const tabIndexValue = isActive ? 0 : -1; // Only focusable when active
  const ariaHiddenValue = !isActive; // Hide from screen readers when inactive

  if (loading) {
    return (
      <div
        className="flex flex-col justify-center items-center min-h-screen"
        aria-hidden={ariaHiddenValue}
      >
        <div className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl">Loading...</div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div
        className="flex flex-col justify-center items-center min-h-screen"
        aria-hidden={ariaHiddenValue}
      >
        <div className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl">Error: Data not available</div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center justify-center"
      aria-hidden={ariaHiddenValue}
    >
      <div className="flex w-full justify-center items-center flex-col">
        {/* Current Weather */}
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
          <CurrentWeatherComponent currentWeatherData={weatherData} />
        </div>
      </div>
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mt-6">
        <DailyForecastComponent forecastData={weatherData.daily} />
      </div>
    </div>
  );
}

export default Weather;

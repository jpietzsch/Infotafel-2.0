"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import CurrentWeatherComponent from "../components/weathers/CurrentWeatherComponent";

const API_BASE_URL = "http://localhost:8000/cache";

const debug = false;

function Weather({ isActive }) {  // Pass a prop to check if this component is the active one
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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Accessibility: Control tabindex based on whether the component is active
  const tabIndexValue = isActive ? 0 : -1; // Only focusable when active
  const ariaHiddenValue = !isActive; // Hide from screen readers when inactive

  if (loading) {
    return (
      <div
        className="flex flex-col justify-center items-center min-h-screen"
        aria-hidden={ariaHiddenValue}
      >
        <div className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl" tabIndex={tabIndexValue}>Loading...</div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div
        className="flex flex-col justify-center items-center min-h-screen"
        aria-hidden={ariaHiddenValue}
      >
        <div className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl" tabIndex={tabIndexValue}>Error: Data not available</div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-4"
      aria-hidden={ariaHiddenValue}
    >
      <div className="flex w-full justify-center items-center flex-col">
        {/* Current Weather */}
        <CurrentWeatherComponent
          currentWeatherData={weatherData}
          tabIndexValue={tabIndexValue} // Pass tabIndex to child component
          ariaHiddenValue={ariaHiddenValue} // Pass aria-hidden to child component
        />
      </div>
    </div>
  );
}

export default Weather;

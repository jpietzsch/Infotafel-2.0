// weather.js

"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Lottie from "lottie-react";
import weatherInterpretationCodes from "../weatherInterpretationCodes";

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

  // Merged CurrentWeatherComponent code
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-4"
      aria-hidden={ariaHiddenValue}
    >
      <div className="flex w-full justify-center items-center flex-col">
        <div className="flex flex-row justify-evenly w-screen sm:max-w-screen-lg" aria-hidden={ariaHiddenValue}>
          <div className="sm:mr-64">
            <h1 className="text-4xl font-bold text-white m-12" tabIndex={tabIndexValue}>
              {weatherData?.current
                ? weatherInterpretationCodes[weatherData.current.weather_code].day.desc
                : null}
            </h1>
            <Lottie
              animationData={
                weatherData?.current
                  ? weatherInterpretationCodes[weatherData.current.weather_code].day.animatedIcon
                  : null
              }
              className="w-auto h-86"
            />
          </div>
          <div className="text-white flex flex-col">
            <div className="flex flex-col justify-evenly flex-1">
              <p className="flex flex-row" style={{ fontSize: "50px" }} tabIndex={tabIndexValue}>
                <img
                  src="weather/staticLogos/thermometer.svg"
                  className="w-12 h-auto mr-10"
                  alt=""
                  style={{
                    filter:
                      "invert(80%) sepia(63%) saturate(2257%) hue-rotate(350deg) brightness(102%) contrast(107%)",
                  }}
                />
                {weatherData?.current ? weatherData.current.temperature_2m : null}
                °C
              </p>
              <p className="flex flex-row" style={{ fontSize: "50px" }} tabIndex={tabIndexValue}>
                <img
                  src="weather/staticLogos/wind.svg"
                  className="w-12 h-auto mr-10"
                  alt=""
                  style={{
                    filter:
                      "invert(80%) sepia(63%) saturate(2257%) hue-rotate(350deg) brightness(102%) contrast(107%)",
                  }}
                />
                {weatherData?.current ? weatherData.current.wind_speed_10m : null}
                KM/h
              </p>
              <p className="flex flex-row" style={{ fontSize: "50px" }} tabIndex={tabIndexValue}>
                <img
                  src="weather/staticLogos/clouds.svg"
                  className="w-12 h-auto mr-10"
                  alt=""
                  style={{
                    filter:
                      "invert(80%) sepia(63%) saturate(2257%) hue-rotate(350deg) brightness(102%) contrast(107%)",
                  }}
                />
                {weatherData?.current ? weatherData.current.cloud_cover : null}
                %
              </p>
              <p className="flex flex-row" style={{ fontSize: "50px" }} tabIndex={tabIndexValue}>
                <img
                  src="weather/staticLogos/moderate-rain.svg"
                  alt=""
                  className="w-12 h-auto mr-10"
                  style={{
                    filter:
                      "invert(80%) sepia(63%) saturate(2257%) hue-rotate(350deg) brightness(102%) contrast(107%)",
                  }}
                />
                {weatherData?.current ? weatherData.current.rain : null}
                mm
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;

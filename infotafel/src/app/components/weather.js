"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Lottie from "lottie-react";
import weatherInterpretationCodes from "../weatherInterpretationCodes";

const API_BASE_URL = "http://localhost:8000/cache";
const debug = false;

function Weather({ isActive }) {
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

  const tabIndexValue = isActive ? 0 : -1;
  const ariaHiddenValue = !isActive;

  if (loading) {
    return (
      <div
        className="flex flex-col justify-center items-center min-h-screen"
        aria-hidden={ariaHiddenValue}
      >
        <div className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl" tabIndex={tabIndexValue}>
          Loading...
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div
        className="flex flex-col justify-center items-center min-h-screen"
        aria-hidden={ariaHiddenValue}
      >
        <div className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl" tabIndex={tabIndexValue}>
          Error: Data not available
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-4"
      aria-hidden={ariaHiddenValue}
    >
      <div className="flex flex-col items-center w-full sm:max-w-screen-lg" tabIndex={-1}>
        <div className="flex flex-col sm:flex-row w-full sm:justify-evenly items-center" aria-hidden={ariaHiddenValue}>
          <div className="w-full sm:w-auto sm:mr-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-white text-center sm:text-left m-6" tabIndex={tabIndexValue}>
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
              className="w-40 h-40 sm:w-auto sm:h-auto mx-auto sm:mx-0"
            />
          </div>
          <div className="text-white flex flex-col items-center sm:items-start w-full sm:w-auto">
            <div className="flex flex-col justify-evenly items-center sm:items-start w-full">
              <p className="flex flex-row items-center text-4xl sm:text-5xl my-4" tabIndex={tabIndexValue}>
                <img
                  src="weather/staticLogos/thermometer.svg"
                  className="w-12 h-auto mr-4"
                  alt="Temperature"
                  style={{
                    filter:
                      "invert(80%) sepia(63%) saturate(2257%) hue-rotate(350deg) brightness(102%) contrast(107%)",
                  }}
                />
                {weatherData?.current ? weatherData.current.temperature_2m : null}°C
              </p>
              <p className="flex flex-row items-center text-4xl sm:text-5xl my-4" tabIndex={tabIndexValue}>
                <img
                  src="weather/staticLogos/wind.svg"
                  className="w-12 h-auto mr-4"
                  alt="Wind Speed"
                  style={{
                    filter:
                      "invert(80%) sepia(63%) saturate(2257%) hue-rotate(350deg) brightness(102%) contrast(107%)",
                  }}
                />
                {weatherData?.current ? weatherData.current.wind_speed_10m : null} KM/h
              </p>
              <p className="flex flex-row items-center text-4xl sm:text-5xl my-4" tabIndex={tabIndexValue}>
                <img
                  src="weather/staticLogos/clouds.svg"
                  className="w-12 h-auto mr-4"
                  alt="Cloud Cover"
                  style={{
                    filter:
                      "invert(80%) sepia(63%) saturate(2257%) hue-rotate(350deg) brightness(102%) contrast(107%)",
                  }}
                />
                {weatherData?.current ? weatherData.current.cloud_cover : null}%
              </p>
              <p className="flex flex-row items-center text-4xl sm:text-5xl my-4" tabIndex={tabIndexValue}>
                <img
                  src="weather/staticLogos/moderate-rain.svg"
                  alt="Rain"
                  className="w-12 h-auto mr-4"
                  style={{
                    filter:
                      "invert(80%) sepia(63%) saturate(2257%) hue-rotate(350deg) brightness(102%) contrast(107%)",
                  }}
                />
                {weatherData?.current ? weatherData.current.rain : null} mm
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;

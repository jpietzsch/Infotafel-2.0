import React from "react";
import Lottie from "lottie-react";
import weatherInterpretationCodes from "../../weatherInterpretationCodes";

function CurrentWeatherComponent({ currentWeatherData, tabIndexValue, ariaHiddenValue }) {
  return (
    <div className="flex flex-row justify-evenly w-screen sm:max-w-screen-lg" aria-hidden={ariaHiddenValue}>
      <div className="sm:mr-64">
        <h1 className="text-4xl font-bold text-white m-12" tabIndex={tabIndexValue}>
          {currentWeatherData?.current
            ? weatherInterpretationCodes[currentWeatherData.current.weather_code].day.desc
            : null}
        </h1>
        <Lottie
          animationData={
            currentWeatherData?.current
              ? weatherInterpretationCodes[currentWeatherData.current.weather_code].day.animatedIcon
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
            {currentWeatherData?.current ? currentWeatherData.current.temperature_2m : null}
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
            {currentWeatherData?.current ? currentWeatherData.current.wind_speed_10m : null}
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
            {currentWeatherData?.current ? currentWeatherData.current.cloud_cover : null}
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
            {currentWeatherData?.current ? currentWeatherData.current.rain : null}
            mm
          </p>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeatherComponent;

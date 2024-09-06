import React from 'react';
import weatherInterpretationCodes from "../../weatherInterpretationCodes";
import Lottie from "lottie-react";


// Component to display daily weather forecast
export default function DailyForecastComponent({weatherData}) {
  return (
    <div className="flex mt-10">
      <div className="bg-black flex flex-col max-w-none w-full text-white">
        <div className="flex flex-wrap text-center justify-evenly">
          {weatherData?.daily?.time.slice(0, 6).map((dailyData, index) => (
            <div
              key={index}
              className=" sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 overflow-hidden"
            >
              {/* Display weekday */}
              <h1 className="text-m mt-2 font-lg" tabIndex="0">
                {new Date(dailyData * 1000).toLocaleDateString("de-DE", {
                  weekday: "long",
                })}
              </h1>
              {/* Display date */}
              <h1 className="text-sm" tabIndex="0">
                {new Date(dailyData * 1000).toLocaleDateString()}
              </h1>
              {/* Display weather animation */}
              <Lottie
                animationData={
                  weatherInterpretationCodes[weatherData.daily.weather_code[index + 1]].day
                    .animatedIcon
                }
                className="w-auto h-28"
              />
              {/* Display weather description */}
              <h1 className="text-xl font-semibold m-1" tabIndex="0">
                {
                  weatherInterpretationCodes[weatherData.daily.weather_code[index + 1]].day
                    .desc
                }
              </h1>
              <div className="flex flex-row items-center justify-evenly">
                <div className="m-6 flex justify-between flex-col">
                  {/* Display maximum temperature */}
                  <p className="font-bold text-xl flex flex-row" tabIndex="0">
                    <img
                      src="weather/staticLogos/icons8-thermometer-up-100.svg"
                      alt=""
                      className="w-6 h-6"
                      style={{
                        filter:
                          "invert(80%) sepia(63%) saturate(2257%) hue-rotate(350deg) brightness(102%) contrast(107%)",
                      }}
                    />
                    {weatherData.daily.temperature_2m_max[index + 1]} °C
                  </p>
                </div>
                <div>
                  {/* Display minimum temperature */}
                  <p className="font-bold text-xl flex flex-row" tabIndex="0">
                    <img
                      src="weather/staticLogos/icons8-thermometer-down-100.svg"
                      className="w-6 h-6"
                      alt=""
                      style={{
                        filter:
                          "invert(80%) sepia(63%) saturate(2257%) hue-rotate(350deg) brightness(102%) contrast(107%)",
                      }}
                    />
                    {weatherData.daily.temperature_2m_min[index + 1]} °C
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


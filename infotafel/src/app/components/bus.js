"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ArrowRight from "@mui/icons-material/ArrowRight";

import { ThemeProvider } from "@emotion/react";
import { SvgIcon, createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const locations = {
  31: {
    extra_times: [1, 2, 3, 5, 6, 7, 11, 12, 14, 15, 17, 18, 22],
    locations: [
      "Rehabilitationszentrum für Blinde, Chemnitz",
      "Frauen- und Kinderklinik, Chemnitz",
      "Klinikum Flemmingstr., Chemnitz",
      "Talanger, Chemnitz",
      "Wattstraße, Chemnitz",
      "Kanalstraße, Chemnitz",
      "Leonhardtstraße, Chemnitz",
      "Henriettenstraße, Chemnitz",
      "Gerhart-Hauptmann-Platz, Chemnitz",
      "Marianne-Brandt-Straße, Chemnitz",
      "Reichsstraße, Chemnitz",
      "Zentralhaltestelle, Chemnitz",
    ],
  },
  62: {
    extra_times: [1, 2, 3, 5, 6, 7, 11, 12, 14, 15, 17, 18, 22],
    locations: ["DEBUG1", "DEBUG2", "DEBUG3", "DEBUG4", "DEBUG5", "DEBUG6"],
  },
};

function Fahrplan() {
  const [busplanData, setBusplanData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/cache/busplan");
        console.log("Fahrplan data:", response.data.busData);
        setBusplanData(response.data.busData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!busplanData) return;

      const currentTime = new Date().getTime();
      const updatedBusplanData = { ...busplanData };

      for (const bus in busplanData) {
        if (busplanData[bus].departureTimes?.length) {
          const departureTime = new Date(
            busplanData[bus].departureTimes[0]
          ).getTime();
          if (departureTime < currentTime) {
            updatedBusplanData[bus].departureTimes.shift();
          }
        }
      }

      setBusplanData(updatedBusplanData);
    }, 60000);

    return () => clearTimeout(timer);
  }, [busplanData]);

  if (loading) {
    return (
      <div className="bg-site-background mx-auto px-4 text-white flex-grow w-screen justify-evenly ">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div
      className="mx-auto text-white flex-grow w-full justify-evenly overflow-hidden"
      tabIndex="0"
    >
      <div
        className="flex flex-grow items-center"
        tabIndex="0"
      >
        <div
          className="flex w-full justify-center items-center flex-col"
          tabIndex="0"
        >
          <ThemeProvider theme={darkTheme}>
              
                <div
                  className="mt-10 flex flex-col items-center w-full font-semibold"
                  tabIndex="0"
                >
                  <div
                    className="flex w-full justify-evenly items-center"
                    tabIndex="0"
                  >
                    {busplanData &&
                      busplanData["31"]?.departureTimes
                        ?.slice(0, 4)
                        .map((time, index, array) => (
                          <React.Fragment key={index}>
                            <Typography tabIndex="0">{time}</Typography>
                            {index !== array.length - 1 && (
                              <SvgIcon component={ArrowRight} tabIndex="0" />
                            )}
                          </React.Fragment>
                        ))}
                  </div>
                  <div
                    className="flex w-full justify-evenly items-center mb-5"
                    tabIndex="0"
                  >
                    {busplanData &&
                      busplanData["31"]?.realTimes
                        ?.slice(0, 4)
                        .map((time, index, array) => {
                          let typographyClass = "";
                          if (
                            busplanData["31"].departureTimes[index] !== time
                          ) {
                            typographyClass = "text-red-500";
                          } else {
                            typographyClass = "text-green-500";
                          }

                          return (
                            <React.Fragment key={index}>
                              <p className={typographyClass} tabIndex="0">
                                {time}
                              </p>
                              {index !== array.length - 1 && (
                                <SvgIcon component={ArrowRight} tabIndex="0" />
                              )}
                            </React.Fragment>
                          );
                        })}
                  </div>
                </div>
                <div
                  className="flex flex-row w-full justify-evenly"
                  tabIndex="0"
                >
                  <div className="flex flex-col space-y-4" tabIndex="0">
                    {locations["31"].locations.map((location, index) => (
                      <div
                        key={index}
                        className="flex items-center"
                        tabIndex="0"
                      >
                        <div
                          className="w-4 h-4 bg-white rounded-full"
                          tabIndex="0"
                        ></div>
                        <div className="ml-4" tabIndex="0">
                          <Typography tabIndex="0">{location}</Typography>
                          <Typography tabIndex="0">
                            {busplanData &&
                              addMinutesToTime(
                                busplanData["31"]?.realTimes[0] || "00:00",
                                locations["31"].extra_times[index]
                              )}
                          </Typography>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="w-1/2" tabIndex="0">
                    <img
                      src="31fahrplan.jpg"
                      alt="Fahrplan 31"
                      className="w-full"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-400" tabIndex="0">
                  *Alle Angaben sind unverbindlich. Busse können früher oder
                  später eintreffen. Manchmal auch garnicht.
                </p>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}

const addMinutesToTime = (timeString, extraMinutes) => {
  if (!timeString) return "N/A";

  const [hoursStr, minutesStr] = timeString.split(":");
  let hours = parseInt(hoursStr);
  let minutes = parseInt(minutesStr);

  minutes += extraMinutes;

  hours += Math.floor(minutes / 60);
  minutes = minutes % 60;

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
};

export default Fahrplan;

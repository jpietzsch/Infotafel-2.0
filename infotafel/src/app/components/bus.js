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

function Fahrplan({ isActive }) {
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

  // Accessibility settings
  const tabIndexValue = isActive ? 0 : -1; // Only focusable when active
  const ariaHiddenValue = !isActive; // Hidden from screen readers when inactive

  if (loading) {
    return (
      <div
        className="bg-site-background mx-auto px-4 text-white flex-grow w-screen justify-evenly"
        tabIndex={tabIndexValue}
        aria-hidden={ariaHiddenValue}
      >
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div
      className="mx-auto text-white flex-grow w-full justify-evenly overflow-hidden"
      tabIndex={tabIndexValue}
      aria-hidden={ariaHiddenValue}
    >
      <div className="flex flex-grow items-center">
        <div className="flex w-full justify-center items-center flex-col">
          <ThemeProvider theme={darkTheme}>
            <div className="mt-10 flex flex-col items-center w-full font-semibold">
              <div className="flex flex-col md:flex-row w-full justify-evenly items-center">
                {busplanData &&
                  busplanData["31"]?.departureTimes
                    ?.slice(0, 4)
                    .map((time, index, array) => (
                      <React.Fragment key={index}>
                        <Typography tabIndex={tabIndexValue}>
                          {time}
                        </Typography>
                        {index !== array.length - 1 && (
                          <SvgIcon component={ArrowRight} />
                        )}
                      </React.Fragment>
                    ))}
              </div>
              <div className="flex flex-col md:flex-row w-full justify-evenly items-center mb-5">
                {busplanData &&
                  busplanData["31"]?.realTimes
                    ?.slice(0, 4)
                    .map((time, index, array) => {
                      let typographyClass = "";
                      if (busplanData["31"].departureTimes[index] !== time) {
                        typographyClass = "text-red-500";
                      } else {
                        typographyClass = "text-green-500";
                      }

                      return (
                        <React.Fragment key={index}>
                          <p className={typographyClass} tabIndex={tabIndexValue}>
                            {time}
                          </p>
                          {index !== array.length - 1 && (
                            <SvgIcon component={ArrowRight} />
                          )}
                        </React.Fragment>
                      );
                    })}
              </div>
            </div>
            <div className="flex flex-col lg:flex-row w-full justify-evenly">
              <div className="flex flex-col space-y-4">
                {locations["31"].locations.map((location, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                    <div className="ml-4">
                      <Typography tabIndex={tabIndexValue}>
                        {location}
                      </Typography>
                      <Typography tabIndex={tabIndexValue}>
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
              <div className="w-full lg:w-1/2">
                <img
                  src="31fahrplan.jpg"
                  alt="Fahrplan 31"
                  className="w-full"
                  tabIndex={tabIndexValue}
                  aria-hidden={ariaHiddenValue}
                />
              </div>
            </div>
            <p
              className="text-xs text-gray-400"
              tabIndex={tabIndexValue}
              aria-hidden={ariaHiddenValue}
            >
              *Alle Angaben sind unverbindlich. Busse können früher oder später
              eintreffen. Manchmal auch garnicht.
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

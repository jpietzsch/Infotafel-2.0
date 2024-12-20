"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ThemeProvider } from "@emotion/react";
import { createTheme, Typography, Box, SvgIcon, Divider } from "@mui/material";
import ArrowRight from "@mui/icons-material/ArrowRight";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import dotenv from 'dotenv'

dotenv.config()

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function Fahrplan({ isActive }) {
  const [busplanData, setBusplanData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_APP_API_URL + "cache/busplan");
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

  const renderTimeStatus = (stationName, busLine, plannedTime, realTime, index) => {
    const isDelayed = plannedTime !== realTime;
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mb={2}
        key={index}
        className="w-full transition-transform transform hover:scale-105 duration-200 px-3 py-2 bg-gray-800 rounded-md shadow-md hover:bg-gray-700 transition duration-200"
        sx={{
          width: "100%",
          maxWidth: "600px", // Increased max width on desktop
          mx: "auto", // Center the container horizontally
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" mb={1}>
          {/* Station Name and Bus Line Header */}
          <Typography
            variant="h6"
            className="text-white font-semibold"
            tabIndex={tabIndexValue}
            sx={{
              fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" }, // Responsive font size for different screen sizes
              display: "flex",
              alignItems: "center",
              marginBottom: "5px", // Reduced margin to make it tighter
            }}
          >
            <SvgIcon component={DirectionsBusIcon} sx={{ mr: 1, fontSize: "1.4rem" }} />
            {stationName} - Bus {busLine}
          </Typography>
          <Divider sx={{ width: "80%", my: 1, borderColor: "gray" }} />
        </Box>

        <Box
          display="flex"
          flexDirection={{ xs: "row", sm: "row" }} // Ensures the times are side by side for mobile
          justifyContent="center" // Centers both time boxes horizontally
          alignItems="center"
          mb={1}
          sx={{
            width: "100%", // Ensure the times take up full width
            gap: { xs: 1, sm: 2 }, // Adjust gap to be smaller on mobile
            px: { xs: 2, sm: 3 }, // Padding for mobile and small devices
          }}
        >
          {/* Geplante Zeit (Planned Time) */}
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography
              className="text-gray-400"
              tabIndex={tabIndexValue}
              sx={{ fontSize: "0.9rem", textAlign: "center" }}
            >
              Geplante Zeit
            </Typography>
            <SvgIcon component={AccessTimeIcon} color="primary" sx={{ fontSize: "1.2rem", mb: 1 }} />
            <Typography
              className="ml-2"
              tabIndex={tabIndexValue}
              sx={{ fontSize: "1.1rem", textAlign: "center" }}
            >
              {plannedTime}
            </Typography>
          </Box>

          {/* Aktuelle Zeit (Real-Time) */}
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography
              className="text-gray-400"
              tabIndex={tabIndexValue}
              sx={{ fontSize: "0.9rem", textAlign: "center" }}
            >
              Aktuelle Zeit
            </Typography>
            {isDelayed ? (
              <SvgIcon component={ErrorIcon} color="error" sx={{ fontSize: "1.3rem", mb: 1 }} />
            ) : (
              <SvgIcon component={CheckCircleIcon} color="success" sx={{ fontSize: "1.3rem", mb: 1 }} />
            )}
            <Typography
              className={`ml-2 ${isDelayed ? "text-red-500" : "text-green-500"}`}
              tabIndex={tabIndexValue}
              sx={{ fontSize: "1.1rem", textAlign: "center" }}
            >
              {realTime}
            </Typography>
          </Box>
        </Box>

        {isDelayed && (
          <Typography className="ml-4 text-sm text-red-500">{`Verspätet`}</Typography>
        )}
      </Box>
    );
  };

  return (
    <div
      className="mx-auto text-white flex-grow w-full justify-evenly overflow-hidden"
      aria-hidden={ariaHiddenValue}
    >
      <div className="flex flex-grow items-center">
        <div className="flex w-full justify-center items-center flex-col">
          <ThemeProvider theme={darkTheme}>
            <div className="mt-10 flex flex-col items-center w-full font-semibold">
              <Box
                className="w-full"
                sx={{
                  maxWidth: "1200px", // Maximum width for desktop
                  width: "90%", // Allow some padding on both sides
                  px: { xs: 1, sm: 2 }, // Padding for mobile and small devices
                }}
              >
                {busplanData &&
                  busplanData["31"]?.departureTimes
                    ?.slice(0, 4)
                    .map((time, index) => {
                      const stationName = "Flemmingstraße (Haus 7)"; // Can be customized
                      const busLine = "31"; // Can be customized
                      const realTime = busplanData["31"]?.realTimes?.[index] || time;
                      return renderTimeStatus(stationName, busLine, time, realTime, index);
                    })}
              </Box>
            </div>

            {/* Disclaimer Text */}
            <Box
              display="flex"
              justifyContent="center"
              mt={3}
              className="text-gray-400 text-xs"
              tabIndex={tabIndexValue}
            >
              <Typography className="p-2 text-center">
                Für die angegebene Zeit haften wir nicht. Zeiten können variieren.
              </Typography>
            </Box>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}

export default Fahrplan;

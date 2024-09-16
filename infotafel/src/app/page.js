"use client";

import React, { useState, useEffect } from "react";
import Events from "./components/events";
import Fahrplan from "./components/bus";
import Weather from "./components/weather";
import LocInfo from "./components/locinfo";
import Foods from "./components/foods";

export default function Home() {
  // State to manage the active component in the carousel
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState("right"); // Keep track of the slide direction

  // List of components to cycle through in the carousel
  const components = [
    { component: <Weather key="weather" />, key: "weather" },
    { component: <Foods key="foods" />, key: "foods" },
    { component: <Fahrplan key="fahrplan" />, key: "fahrplan" },
    { component: <Events key="events" />, key: "events" },
    { component: <LocInfo key="locinfo" />, key: "locinfo" }
  ];

  // Handle forward navigation in the carousel
  const handleNext = () => {
    setDirection("right");
    setActiveIndex((prevIndex) => (prevIndex + 1) % components.length); // Loop back to first
  };

  // Handle backward navigation in the carousel
  const handlePrev = () => {
    setDirection("left");
    setActiveIndex((prevIndex) => (prevIndex - 1 + components.length) % components.length); // Loop back to last
  };

  // Automatically cycle every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext(); // Move to the next component every 5 seconds
    }, 10000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex-1 bg-cover bg-center w-full h-screen flex flex-col p-0 m-0"
      style={{ backgroundImage: `url('aE12.jpg?v=1')`, objectFit: "cover" }}
    >
      <div className="flex-1 flex bg-black/65 w-full h-full relative overflow-hidden">
        {/* Left arrow */}
        <button
          className="absolute left-0 w-1/12 flex items-center justify-center sm:w-1/20 md:w-1/24 lg:w-1/32 xl:w-1/40"
          tabIndex="1"
          onClick={handlePrev} // Move back
        >
          <img src="arrowleft.png" alt="Left Arrow" />
        </button>

        {/* Render all components and control visibility */}
        <div className="flex-1 sm:w-10/12 md:w-11/12 lg:w-13/14 xl:w-14/15 relative">
          {components.map((item, index) => (
            <div
              key={item.key}
              className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ${
                index === activeIndex
                  ? "transform translate-x-0" // Active component
                  : index < activeIndex
                  ? "transform -translate-x-full" // Previous components slide out to the left
                  : direction === "right"
                  ? "transform translate-x-full" // New component slides in from the right
                  : "transform -translate-x-full" // When moving backwards, slide in from the left
              }`}
              style={{
                transition: "transform 0.5s ease", // Smooth sliding transition
              }}
            >
              {item.component}
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          className="absolute right-0 w-1/12 flex items-center justify-center sm:w-1/20 md:w-1/24 lg:w-1/32 xl:w-1/40"
          tabIndex="100"
          onClick={handleNext} // Move forward
        >
          <img src="arrowright.png" alt="Right Arrow" />
        </button>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

function Foods({ isActive }) {
  const [loading, setLoading] = useState(true);
  const [mealPlan, setMealPlan] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null); // Für das Dropdown ausgewählter Tag
  const [isMobile, setIsMobile] = useState(false); // Erkennung der Bildschirmgröße

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/cache/food");
        setMealPlan(Array.isArray(response.data) ? response.data : []);
        if (response.data.length > 0) {
          setSelectedDay(response.data[0].date);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();

    //Responsive dingens
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  const tabIndexValue = isActive ? 0 : -1;
  const ariaHiddenValue = !isActive;

  return (
    <div
      className="flex flex-col justify-center min-h-full"
      aria-hidden={ariaHiddenValue}
    >
      {loading && (
        <div className="text-2xl mx-auto flex items-center justify-center text-gray-300">
          <div className="loader border-4 rounded-full h-12 w-12 mr-4"></div>
          <p>Loading...</p>
        </div>
      )}

      {/* Handy */}
      {!loading && isMobile && mealPlan && mealPlan.length > 0 && (
        <div className="m-4">
          <label htmlFor="day-selector" className="block text-white mb-2">
            Wähle einen Tag:
          </label>
          <select
            id="day-selector"
            value={selectedDay}
            onChange={handleDayChange}
            className="w-full p-2 bg-gray-700 text-white rounded-md"
          >
            {mealPlan.map((day) => (
              <option key={day.date} value={day.date}>
                {day.date}
              </option>
            ))}
          </select>

          {mealPlan
            .filter((day) => day.date === selectedDay)
            .map((day) => (
              <div
                key={day.date}
                className="m-4 p-4 bg-gray-800 rounded-lg text-white"
              >
                <h1 className="text-2xl font-bold">{day.date}</h1>
                {day.meals?.menus?.menuName?.length > 0 ? (
                  day.meals.menus.menuName.map((meal, mealIndex) => (
                    <div
                      key={mealIndex}
                      className="p-4 mt-2 rounded-md bg-gray-700"
                    >
                      <p>{meal}</p>
                      {day.meals.menus.alergenes[mealIndex] && (
                        <p className="text-sm text-gray-400 mt-2">
                          Allergene: {day.meals.menus.alergenes[mealIndex]}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">Keine Mahlzeiten verfügbar</p>
                )}
              </div>
            ))}
        </div>
      )}

      {/* PC*/}
      {!loading && !isMobile && mealPlan && mealPlan.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 m-8">
          {mealPlan.map((day) => (
            <div
              key={day.date}
              className="font-bold p-6 shadow-sm rounded-lg transition-transform transform hover:scale-105 duration-200 hover:shadow-lg"
            >
              <h1 className="font-semibold text-xl text-white">{day.date}</h1>
              <div className="mt-4 text-gray-300">
                {day.meals?.menus?.menuName?.length > 0 ? (
                  day.meals.menus.menuName.map((meal, mealIndex) => (
                    <div
                      key={mealIndex}
                      className="p-4 mt-2 rounded-md bg-gray-700"
                    >
                      <p>{meal}</p>
                      {day.meals.menus.alergenes[mealIndex] && (
                        <p className="text-sm text-gray-400 mt-2">
                          Allergene: {day.meals.menus.alergenes[mealIndex]}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">Keine Mahlzeiten verfügbar</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && (!mealPlan || mealPlan.length === 0) && (
        <div className="text-2xl mx-auto text-gray-300">
          <p>Kein Speiseplan verfügbar</p>
        </div>
      )}
    </div>
  );
}

export default Foods;

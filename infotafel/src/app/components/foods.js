"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

function Foods({ isActive }) {
  const [loading, setLoading] = useState(true);
  const [mealPlan, setMealPlan] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/cache/food");
        console.log("Fetched Data: ", response.data);
        setMealPlan(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Accessibility settings
  const tabIndexValue = isActive ? 0 : -1; // Only focusable when active
  const ariaHiddenValue = !isActive; // Hidden from screen readers when inactive

  return (
    <div className="flex flex-col justify-center items min-h-full" aria-hidden={ariaHiddenValue}>
      {/* Loading state */}
      {loading && (
        <div
          className="text-2xl mx-auto self-center flex items-center justify-center text-gray-300"
          tabIndex={tabIndexValue}
        >
          <div className="loader ease-linear rounded-full border-4 border-t-4 h-12 w-12 mr-4"></div>
          <p>Loading...</p>
        </div>
      )}

      {/* Meal plan content */}
      {!loading && mealPlan && mealPlan.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {mealPlan.map((day) => (
            <div
              className="font-bold p-6 shadow-sm rounded-lg transition-transform transform hover:scale-105 duration-200 hover:shadow-lg"
              key={day.date}
              tabIndex={tabIndexValue}
              aria-hidden={ariaHiddenValue}
            >
              <h1 className="font-semibold text-2xl sm:text-3xl text-white">
                {day.date}
              </h1>
              <div className="font-medium text-lg mt-4 text-gray-300">
                {day.meals &&
                day.meals.menus &&
                Array.isArray(day.meals.menus.menuName) &&
                day.meals.menus.menuName.length > 0 ? (
                  day.meals.menus.menuName.map((meal, mealIndex) => (
                    <div
                      className="p-4 mt-2 rounded-md bg-gray-700"
                      key={mealIndex}
                      aria-hidden={ariaHiddenValue}
                    >
                      <p
                        className="text-base sm:text-lg md:text-xl text-gray-200"
                        tabIndex={tabIndexValue}
                      >
                        {meal}
                      </p>
                      {day.meals.menus.alergenes[mealIndex] && (
                        <p
                          className="text-sm mt-2 text-gray-400"
                          tabIndex={tabIndexValue}
                        >
                          Allergene: {day.meals.menus.alergenes[mealIndex]}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No meals available</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No meal plan available */}
      {!loading && (!mealPlan || mealPlan.length === 0) && (
        <div className="text-2xl mx-auto self-center text-gray-300" tabIndex={tabIndexValue}>
          <p>No meal plan available</p>
        </div>
      )}
    </div>
  );
}

export default Foods;

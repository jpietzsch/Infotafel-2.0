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
    <div className="flex flex-col" tabIndex={tabIndexValue} aria-hidden={ariaHiddenValue}>
      {/* Loading state */}
      {loading && (
        <div className="text-2xl mx-auto self-center" tabIndex={tabIndexValue}>
          Loading...
        </div>
      )}

      {/* Meal plan content */}
      {!loading && mealPlan && mealPlan.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {mealPlan.map((day) => (
            <div
              className="font-bold p-4 sm:p-6 rounded-md shadow-md"
              key={day.date}
              tabIndex={tabIndexValue}
              aria-hidden={ariaHiddenValue}
            >
              <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2">
                {day.date}
              </h1>
              <div className="font-semibold text-lg sm:text-xl md:text-2xl mt-4">
                {day.meals &&
                day.meals.menus &&
                Array.isArray(day.meals.menus.menuName) &&
                day.meals.menus.menuName.length > 0 ? (
                  day.meals.menus.menuName.map((meal, mealIndex) => (
                    <div
                      className="p-4 sm:p-6 mt-2 rounded-md"
                      key={mealIndex}
                      tabIndex={tabIndexValue}
                      aria-hidden={ariaHiddenValue}
                    >
                      <p className="text-base sm:text-lg md:text-xl">
                        {meal}
                      </p>
                      {day.meals.menus.alergenes[mealIndex] ? (
                        <p className="text-sm sm:text-base md:text-lg mt-2">
                          Allergene: {day.meals.menus.alergenes[mealIndex]}
                        </p>
                      ) : null}
                    </div>
                  ))
                ) : (
                  <p>No meals available</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No meal plan available */}
      {!loading && !mealPlan && (
        <div className="text-2xl mx-auto self-center" tabIndex={tabIndexValue}>
          No meal plan available
        </div>
      )}
    </div>
  );
}

export default Foods;

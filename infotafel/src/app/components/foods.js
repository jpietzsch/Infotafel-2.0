"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

function Foods() {
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

  return (
    <div className="w-screen mx-auto px-4 flex flex-col min-w-screen md:flex-row md:flex-wrap">
      <div className="mx-4 md:mx-10 flex flex-col items-start w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
        {loading ? (
          <div className="text-2xl">Loading...</div>
        ) : Array.isArray(mealPlan) && mealPlan.length > 0 ? (
          mealPlan.map((day) => (
            <div
              className="font-bold my-4 p-4 sm:p-6 rounded-md shadow-md w-full"
              key={day.date}
            >
              <h1 tabindex="4" className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2">
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
                    >
                      <p tabindex="4" className="text-base sm:text-lg md:text-xl">
                        {meal}
                      </p>
                      {day.meals.menus.alergenes[mealIndex] ? (
                        <p tabindex="4" className="text-sm sm:text-base md:text-lg mt-2">
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
          ))
        ) : (
          <div className="text-2xl">No meal plan available</div>
        )}
      </div>
    </div>
  );
}

export default Foods;

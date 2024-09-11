"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

function Foods() {
  const [loading, setLoading] = useState(true);
  const [mealPlan, setMealPlan] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/cache/food");
        console.log("Fetched Data: ", response.data); // Log the data here
        setMealPlan(Array.isArray(response.data.parsedFooddata) ? response.data.parsedFooddata : []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  let mealIndex = 0;

  return (
    <div className="bg-site-background w-screen mx-auto px-4 text-white flex-grow min-w-screen flex justify-center">
      <div className="flex flex-row items-center w-fit h-auto">
        {loading ? (
          <div className="text-2xl">Loading...</div>
        ) : Array.isArray(mealPlan) && mealPlan.length > 0 ? (
          mealPlan.map((day) => (
            <div
              className="flex flex-col bg-gray-700 p-4 m-4 rounded-lg"
              key={day.date}
            >
              <h1 className="text-2xl font-bold">{day.date}</h1>
              <div className="flex flex-col">
                {/* Check if menus object and menuName array exist before mapping */}
                {day.meals && day.meals.menus && Array.isArray(day.meals.menus.menuName) && day.meals.menus.menuName.length > 0 ? (
                  day.meals.menus.menuName.map((meal, mealIndex) => (
                    <div className="flex flex-row" key={mealIndex}>
                      <p className="text-xl">{meal}</p>
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

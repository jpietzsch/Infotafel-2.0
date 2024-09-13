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
    <div className="bg-site-background w-screen mx-auto px-4 text-white flex-grow min-w-screen flex justify-center">
      <h1 className="w-0 h-0" tabIndex="3">
        Speiseplan
      </h1>
      <div className="flex flex-row items-start w-fit h-auto space-x-4">
        {loading ? (
          <div className="text-2xl">Loading...</div>
        ) : Array.isArray(mealPlan) && mealPlan.length > 0 ? (
          mealPlan.map((day) => (
            <div
              className="flex flex-col bg-gray-700 p-4 m-4 rounded-lg w-64 flex-grow"
              key={day.date}
            >
              <h1 tabindex="4" className="text-2xl font-bold ">
                {day.date}
              </h1>
              <div className="flex flex-col space-y-2 h-1000 ">
                {day.meals &&
                day.meals.menus &&
                Array.isArray(day.meals.menus.menuName) &&
                day.meals.menus.menuName.length > 0 ? (
                  day.meals.menus.menuName.map((meal, mealIndex) => (
                    <div
                      className="bg-gray-600 p-2 rounded-md h-100 flex flex-col justify-between"
                      key={mealIndex}
                    >
                      <p tabindex="4" className="text-xl">
                        {meal}
                      </p>
                      {day.meals.menus.alergenes[mealIndex] ? (
                        <p tabindex="4" className="text-sm text-gray-400">
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

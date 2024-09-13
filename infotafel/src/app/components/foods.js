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
    <div className="h-screen w-screen mx-auto px-4 flex flex-grow min-w-screen">
      <div className="flex flex-row items-start w-full">
        {loading ? (
          <div className="text-2xl">Loading...</div>
        ) : Array.isArray(mealPlan) && mealPlan.length > 0 ? (
          mealPlan.map((day) => (
            <div
              className="font-bold text-2xl my-16 sm:text-2xl md:text-3xl lg:text-4xl"
              key={day.date}
            >
              <h1 className="font-semibold text-4xl flex flex-col mt-8 ">{day.date}</h1>
              <div className="font-semibold text-xl flex flex-col mt-8">
                {day.meals && day.meals.menus && Array.isArray(day.meals.menus.menuName) && day.meals.menus.menuName.length > 0 ? (
                  day.meals.menus.menuName.map((meal, mealIndex) => (
                    <div
                      className="p-6 rounded-md flex flex-col justify-between"
                      key={mealIndex}
                    >
                      <p className="text-xl sm:text-base md:text-lg">{meal}</p>
                      {day.meals.menus.alergenes[mealIndex] ? (
                        <p className=" text-base mt-2 text-gray-400">
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

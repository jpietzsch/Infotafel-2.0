import axios from "axios";
import React, { useState, useEffect } from "react";

export default function GenInfo({ isActive }) {
  const [genInfo, setGenInfo] = useState([]);

  const tabIndexValue = isActive ? 0 : -1;
  const ariaHiddenValue = !isActive;

  /*useEffect(() => {
    const fetchData = async () => {
          try {
      const response = await axios.get(`http://localhost:1337/api/gen-infos?`)
      console.log(response.data.data)
      setLocInfo(response.data.data)

      } catch (e) {
        console.log('The API request failed')
      }
    }
    fetchData()
  }, [])*/

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3 gap-28 min-h-full items-center"
      aria-hidden={ariaHiddenValue}
    >
      <div className="flex flex-col w-full h-20 items-center text-center space-y-4 transform transition-transform hover:scale-105">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            PlaceHolder
          </h1>
          <p>Placeholder Mini</p>
        </div>
      </div>
    </div>
  );
}

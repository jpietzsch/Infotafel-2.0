"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { ArrowBack, ArrowForward } from "@mui/icons-material";


export default function Plan() {
  const [fachrichtung, setFachrichtung] = useState("FPBK"); // Set initial key to "FI"
  const [planToday, setPlanToday] = useState([]);
  const [planTomorrow, setPlanTomorrow] = useState([]);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    initial: 0,
    slides: {
      perView: 3,
      spacing: 10,
      origin: "center",
    },
    slideChanged(s) {
      const newIndex = s.track.details.rel;
      setFachrichtung(fachrichtungen[newIndex].key);
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dateToday = new Date().toISOString().split("T")[0];
        const dateTomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0];
        const todayResponse = await axios.get(
          `http://localhost:1337/api/stundenplaene?populate=*&filters[beruf][Name][$eq]=${fachrichtung}&filters[Datum][$eq]=${dateToday}`
        );
        const tomorrowResponse = await axios.get(
          `http://localhost:1337/api/stundenplaene?populate=*&filters[beruf][Name][$eq]=${fachrichtung}&filters[Datum][$eq]=${dateTomorrow}`
        );

        const todayData = todayResponse.data.data[0]?.Vertretungsplan || [];
        const tomorrowData = tomorrowResponse.data.data[0]?.Vertretungsplan || [];

        if (todayData) {
          todayData.sort((a, b) => a.Stunde - b.Stunde);
          setPlanToday(todayData);
        }
        if (tomorrowData) {
          tomorrowData.sort((a, b) => a.Stunde - b.Stunde);
          setPlanTomorrow(tomorrowData);
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [fachrichtung]);

  return (
    <div className="flex flex-col items-center p-4">
      {/* Buttons for Fachinformatik and Kaufleute */}
      <div className="mb-6 flex justify-center space-x-4">
        <button
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={() => setFachrichtung("FI")}
        >
          Fachinformatik (FI)
        </button>
        <button
          className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          onClick={() => setFachrichtung("KBM")}
        >
          Kaufleute (KBM)
        </button>
      </div>



      {/* Table for Today in a Horizontal Grid */}
      <h1 className="text-xl font-bold mb-4">Heute</h1>
      <table className="table-auto border-collapse border border-gray-400 mb-8 w-max">
        <thead>
          <tr>
            {Array.from({ length: 10 }).map((_, index) => (
              <th key={index} className="border border-gray-300 p-2 text-center">
                Stunde {index + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Array.from({ length: 10 }).map((_, index) => (
              <td key={index} className="border border-gray-300 p-2 text-center">
                {planToday.find(item => item.Stunde === index + 1) ? (
                  planToday.find(item => item.Stunde === index + 1).Text
                ) : (
                  "Keine Vertretung"
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      {/* Table for Tomorrow in a Horizontal Grid */}
      <h1 className="text-xl font-bold mb-4">Morgen</h1>
      <table className="table-auto border-collapse border border-gray-400 w-max">
        <thead>
          <tr>
            {Array.from({ length: 10 }).map((_, index) => (
              <th key={index} className="border border-gray-300 p-2 text-center">
                Stunde {index + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Array.from({ length: 10 }).map((_, index) => (
              <td key={index} className="border border-gray-300 p-2 text-center">
                {planTomorrow.find(item => item.Stunde === index + 1) ? (
                  planTomorrow.find(item => item.Stunde === index + 1).Text
                ) : (
                  "Keine Vertretung"
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

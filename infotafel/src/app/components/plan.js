"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

// Name ist wie es angezeigt wird, key ist was von der API
const fachrichtungen = [
  { name: "Fachinformatiker", key: "FI" },
  { name: "Dialogmarketing", key: "DM" },
  { name: "KBM", key: "KBM" },
  { name: "FPBK", key: "FPBK" },
  { name: "Berufsvorbereitung", key: "BVB" },
  { name: "Zerspaner", key: "ZM" },
  { name: "Gärtner", key: "GÄ" },
  { name: "FGU", key: "FGU" },
  { name: "Handwerker", key: "HW" },
  { name: "Bko", key: "Bko" },
  { name: "ZM4", key: "ZM4" },
  { name: "BVJ1", key: "BVJ1" },
  { name: "BVJ2", key: "BVJ2" },
  { name: "BVJ3", key: "BVJ3" },
  { name: "E-Commerce", key: "KFEC" },
  { name: "BvBHs", key: "BvBHS" },
];

export default function Plan() {
  const [fachrichtung, setFachrichtung] = useState("Fachinformatik");
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
        const todayResponse = await axios.get(`http://localhost:1337/api/stundenplaene?populate=*&filters[beruf][Name][$eq]=${fachrichtung}&filters[Datum][$eq]=${dateToday}`);
        const tomorrowResponse = await axios.get(`http://localhost:1337/api/stundenplaene?populate=*&filters[beruf][Name][$eq]=${fachrichtung}&filters[Datum][$eq]=${dateTomorrow}`);

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

  useEffect(() => {
    console.log("Updated Plan:", planToday, planTomorrow);
  }, [planToday, planTomorrow]);

  return (

    <div className="ml-96">
      <p className="mb-10">
        <h1>Heute</h1>
        <div>
          {Array.from({ length: 10 }).map((_, index) => (
            <p key={index}>
              {planToday.find(item => item.Stunde === index + 1) ? (
                <span>{planToday.find(item => item.Stunde === index + 1).Text}</span>
              ) : (
                <span>Keine Vertretung</span>
              )}
            </p>
          ))}
        </div>
      </p>
      <p>
        <h1>Morgen</h1>
        <div>
          {Array.from({ length: 10 }).map((_, index) => (
            <p key={index}>
              {planTomorrow.find(item => item.Stunde === index + 1) ? (
                <span>{planTomorrow.find(item => item.Stunde === index + 1).Text}</span>
              ) : (
                <span>Keine Vertretung</span>
              )}
            </p>
          ))}
        </div>
      </p>


    {/*<div className="flex-1 h-screen flex flex-col justify-center p-0 m-0">
      <div className="flex justify-center mt-32 items-center w-full max-w-screen-lg mx-auto">
        <button
          onClick={() => instanceRef.current?.prev()}
          className="text-2xl text-white px-4 py-2 rounded-md mx-2"
        >
          <ArrowBack />
        </button>
        <div className="keen-slider" ref={sliderRef}>
          {fachrichtungen.map((fachrichtung, index) => (
            <div
              key={index}
              className={`keen-slider__slide flex justify-center items-center ${
                index === instanceRef.current?.track.details.rel
                  ? "text-white font-bold"
                  : "text-gray-400"
              }`}
            >
              <div className="text-2xl px-4 py-2 rounded-md mx-2">
                {fachrichtung.name}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => instanceRef.current?.next()}
          className="text-2xl text-white px-4 py-2 rounded-md mx-2"
        >
          <ArrowForward />
        </button>
      </div>
      <div className="overflow-x-auto">
        <p className="m-auto text-center">Heute</p>
        <table className="mt-10 m-auto w-full max-w-5xl">
          <thead>
            <tr>
              <th className="border-2 px-4 py-3 min-w-[100px]">
                1. <br /> 7:30-8:15
              </th>
              <th className="border-2 px-4 py-3 min-w-[100px]">
                2. <br /> 8:20-9:05
              </th>
              <th className="border-2 px-4 py-3 min-w-[100px]">
                3. <br /> 9:25-10:10
              </th>
              <th className="border-2 px-4 py-3 min-w-[100px]">
                4. <br /> 10:15-11:00
              </th>
              <th className="border-2 px-4 py-3 min-w-[100px]">
                5. <br /> 11:05-11:50
              </th>
              <th className="border-2 px-4 py-3 min-w-[100px]">
                6. <br /> 12:35-13:20
              </th>
              <th className="border-2 px-4 py-3 min-w-[100px]">
                7. <br /> 13:25-14:10
              </th>
              <th className="border-2 px-4 py-3 min-w-[100px]">
                8. <br /> 14:20-15:05
              </th>
              <th className="border-2 px-4 py-3 min-w-[100px]">
                9. <br /> 15:15-16:00
              </th>
              <th className="border-2 px-4 py-3 min-w-[100px]">
                10.
                <br /> 16:00-16:45
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {vertretungsplan.heute.map((vertretung, index) => (
                <td
                  key={index}
                  className="border-2 px-2 py-2 min-w-[100px] h-20"
                >
                  {vertretung || ""}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="overflow-x-auto">
        <p className="m-auto text-center">Morgen</p>
        <table className="mt-10 m-auto w-full max-w-5xl">
          <thead>
            <tr>
              <th className="border-2 px-4 py-3 min-w-[100px]">
                1. <br /> 7:30-8:15
              </th>
              <th className="border-2 px-4 py-3 min-w-[100px]">
                2. <br /> 8:20-9:05
              </th>
              <th className="border-2 px-4 py-3 min-w-[100px]">
                3. <br /> 9:25-10:10
              </th>
              <th className="border-2 px-4 py-3 min-w-[100px]">
                4. <br /> 10:15-11:00
              </th>
              <th className="border-2 px-4 py-3 min-w-[100px]">
                5. <br /> 11:05-11:50
              </th>
              <th className="border-2 px-4 py-3 min-w-[100px]">
                6. <br /> 12:35-13:20
              </th>
              <th className="border-2 px-4 py-3 min-w-[100px]">
                7. <br /> 13:25-14:10
              </th>
              <th className="border-2 px-4 py-3 min-w-[100px]">
                8. <br /> 14:20-15:05
              </th>
              <th className="border-2 px-4 py-3 min-w-[100px]">
                9. <br /> 15:15-16:00
              </th>
              <th className="border-2 px-4 py-3 min-w-[100px]">
                10.<br /> 16:00-16:45
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {vertretungsplan.morgen.map((vertretung, index) => (
                <td key={index} className="border-2 px-2 py-2 min-w-[100px] h-20">
                  {vertretung || ""}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  */}
      </div>
  );
}
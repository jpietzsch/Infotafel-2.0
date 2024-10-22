import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Plan({ isActive = true }) { // default isActive to true
  const [fachrichtung, setFachrichtung] = useState("BVB"); // Set BVB as default
  const [jobList, setJobList] = useState([]);
  const [planToday, setPlanToday] = useState([]);
  const [planTomorrow, setPlanTomorrow] = useState([]);

  // Accessibility settings
  const tabIndexValue = isActive ? 0 : -1; // Only focusable when active
  const ariaHiddenValue = !isActive; // Hidden from screen readers when inactive

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:1337/api/berufe`);
        const jobsData = response.data.data;

        if (jobsData && jobsData.length > 0) {
          const jobNames = jobsData
            .map((job) => job.Name || "Unnamed Job")
            .sort((a, b) => a.localeCompare(b));
          setJobList(jobNames);
        } else {
          console.log("No jobs found.");
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    if (!fachrichtung) return;

    const fetchData = async () => {
      try {
        const dateToday = new Date().toISOString().split("T")[0];
        const dateTomorrow = new Date(
          new Date().getTime() + 24 * 60 * 60 * 1000
        )
          .toISOString()
          .split("T")[0];

        const todayResponse = await axios.get(
          `http://localhost:1337/api/stundenplaene?populate=*&filters[beruf][Name][$eq]=${fachrichtung}&filters[Datum][$eq]=${dateToday}`
        );
        const tomorrowResponse = await axios.get(
          `http://localhost:1337/api/stundenplaene?populate=*&filters[beruf][Name][$eq]=${fachrichtung}&filters[Datum][$eq]=${dateTomorrow}`
        );

        const todayData = todayResponse.data.data[0]?.Vertretungsplan || [];
        const tomorrowData =
          tomorrowResponse.data.data[0]?.Vertretungsplan || [];

        if (todayData.length > 0) {
          todayData.sort((a, b) => a.Stunde - b.Stunde);
          setPlanToday(todayData);
        } else {
          setPlanToday([]);
        }

        if (tomorrowData.length > 0) {
          tomorrowData.sort((a, b) => a.Stunde - b.Stunde);
          setPlanTomorrow(tomorrowData);
        } else {
          setPlanTomorrow([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [fachrichtung]); // Automatically fetch data for the default fachrichtung (BVB)

  return (
    <div className="flex flex-col items-center p-6 space-y-8" aria-hidden={ariaHiddenValue}>
      <div className="flex flex-wrap justify-center w-full max-w-screen-lg">
        {jobList.map((job, index) => (
          <button
            key={index}
            className={`text-white text-lg font-bold uppercase hover: transition duration-300 ${
              fachrichtung === job ? "underline" : ""
            }`}
            onClick={() => setFachrichtung(job)}
            style={{
              textShadow: "none",
              transition: "text-shadow 0.3s",
              margin: "10px", // Adds consistent margin around each button
              textDecoration: fachrichtung === job ? "underline" : "none", // Apply underline for the active button
            }}
            tabIndex={tabIndexValue} // Set the correct tab index
            aria-hidden={ariaHiddenValue} // Hide from screen readers when inactive
            onMouseEnter={(e) =>
              (e.target.style.textShadow = "1px 1px 10px rgba(234, 179, 8, 1)")
            }
            onMouseLeave={(e) => (e.target.style.textShadow = "none")}
          >
            {job}
          </button>
        ))}
      </div>

      <div className="w-full max-w-screen-lg mt-6">
        <h1 className="text-2xl font-bold mb-4 text-yellow-500" tabIndex={tabIndexValue}>
          Heute
        </h1>
        <table className="table-auto border-collapse border border-gray-400 w-full text-center shadow-lg">
          <thead>
            <tr className="bg-yellow-500 text-black" tabIndex={tabIndexValue}>
              {Array.from({ length: 10 }).map((_, index) => (
                <th key={index} className="p-3">
                  Stunde {index + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {Array.from({ length: 10 }).map((_, index) => (
                <td key={index} className="p-3 border border-gray-300" tabIndex={tabIndexValue}>
                  {planToday.find((item) => item.Stunde === index + 1)
                    ? planToday.find((item) => item.Stunde === index + 1).Text
                    : "-"}
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        <h1 className="text-2xl font-bold mb-4 text-yellow-500 mt-8" tabIndex={tabIndexValue}>
          Morgen
        </h1>
        <table className="table-auto border-collapse border border-gray-400 w-full text-center shadow-lg">
          <thead>
            <tr className="bg-yellow-500 text-black" tabIndex={tabIndexValue}>
              {Array.from({ length: 10 }).map((_, index) => (
                <th key={index} className="p-3">
                  Stunde {index + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {Array.from({ length: 10 }).map((_, index) => (
                <td key={index} className="p-3 border border-gray-300" tabIndex={tabIndexValue}>
                  {planTomorrow.find((item) => item.Stunde === index + 1)
                    ? planTomorrow.find((item) => item.Stunde === index + 1).Text
                    : "-"}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

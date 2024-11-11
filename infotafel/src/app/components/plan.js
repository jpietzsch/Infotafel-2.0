import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Plan({ isActive = true }) {
  const [fachrichtung, setFachrichtung] = useState("BVB");
  const [jobList, setJobList] = useState([]);
  const [planToday, setPlanToday] = useState([]);
  const [planTomorrow, setPlanTomorrow] = useState([]);

  // Accessibility settings
  const tabIndexValue = isActive ? 0 : -1; // Only focusable when active
  const ariaHiddenValue = !isActive; // Hide from screen readers when inactive

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
  }, [fachrichtung]);

  return (
    <div
      className="flex flex-col items-center p-6 space-y-8"
      aria-hidden={ariaHiddenValue}
      role="region"
      aria-labelledby="plan-title"
    >
      <h1 id="plan-title" className="sr-only">
        Vertretungsplan
      </h1>

      {/* Dropdown for job selection */}
      <div className="w-full max-w-screen-lg">
        <select
          id="job-select"
          className="w-1/3 p-2 text-lg font-bold text-yellow-500 bg-black rounded-lg focus:outline-none border border-white" // Add border styling
          value={fachrichtung}
          onChange={(e) => setFachrichtung(e.target.value)}
          tabIndex={tabIndexValue}
          aria-hidden={ariaHiddenValue}
          style={{
            maxHeight: "200px", // Max height for scrollable dropdown
            overflowY: "auto" // Enable scrolling if there are many items
          }}
        >
          {jobList.map((job, index) => (
            <option key={index} value={job}>
              {job}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full max-w-screen-lg mt-6">
        <h1
          className="text-2xl font-bold mb-4 text-yellow-500"
          tabIndex={tabIndexValue}
          aria-live="polite"
        >
          Heute
        </h1>
        <table
          className="table-auto border-collapse border border-gray-400 w-full text-center shadow-lg"
          role="table"
          aria-label="Stundenplan für heute"
        >
          <thead>
            <tr className="bg-yellow-500 text-black" tabIndex={tabIndexValue} role="row">
              {Array.from({ length: 10 }).map((_, index) => (
                <th key={index} className="p-3" role="columnheader">
                  Stunde {index + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr role="row">
              {Array.from({ length: 10 }).map((_, index) => (
                <td
                  key={index}
                  className="p-3 border border-gray-300"
                  tabIndex={tabIndexValue}
                  role="cell"
                >
                  {planToday.find((item) => item.Stunde === index + 1)
                    ? planToday.find((item) => item.Stunde === index + 1).Text
                    : "-"}
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        <h1
          className="text-2xl font-bold mb-4 text-yellow-500 mt-8"
          tabIndex={tabIndexValue}
          aria-live="polite"
        >
          Morgen
        </h1>
        <table
          className="table-auto border-collapse border border-gray-400 w-full text-center shadow-lg"
          role="table"
          aria-label="Stundenplan für morgen"
        >
          <thead>
            <tr className="bg-yellow-500 text-black" tabIndex={tabIndexValue} role="row">
              {Array.from({ length: 10 }).map((_, index) => (
                <th key={index} className="p-3" role="columnheader">
                  Stunde {index + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr role="row">
              {Array.from({ length: 10 }).map((_, index) => (
                <td
                  key={index}
                  className="p-3 border border-gray-300"
                  tabIndex={tabIndexValue}
                  role="cell"
                >
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

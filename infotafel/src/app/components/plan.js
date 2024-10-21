import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Plan() {
  const [fachrichtung, setFachrichtung] = useState(""); // Initially empty
  const [jobList, setJobList] = useState([]); // For storing jobs
  const [planToday, setPlanToday] = useState([]);
  const [planTomorrow, setPlanTomorrow] = useState([]);

  useEffect(() => {
    // Fetch all jobs to populate the buttons dynamically
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:1337/api/berufe`); // Correct endpoint for jobs
        console.log("Jobs API Response:", response.data); // Log API response for checking
        const jobsData = response.data.data;
  
        // Log each job to verify its structure
        jobsData.forEach((job) => {
          console.log("Job:", job); // Log each job individually
        });
  
        if (jobsData && jobsData.length > 0) {
          // Map over the job data and extract the Name field
          const jobNames = jobsData.map((job) => job.Name || "Unnamed Job");
          setJobList(jobNames);
          console.log("Job List:", jobNames); // Log out the job list to verify correct names
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
          setPlanToday([]); // Clear if no data
        }

        if (tomorrowData.length > 0) {
          tomorrowData.sort((a, b) => a.Stunde - b.Stunde);
          setPlanTomorrow(tomorrowData);
        } else {
          setPlanTomorrow([]); // Clear if no data
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [fachrichtung]);

  return (
    <div className="flex flex-col items-center p-4">
      {/* Dynamic buttons for jobs */}
      <div className="mb-6 flex justify-center space-x-4">
        {jobList.map((job, index) => (
          <button
            key={index}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={() => setFachrichtung(job)}
          >
            {job}
          </button>
        ))}
      </div>

      {/* Table for Today */}
      <h1 className="text-xl font-bold mb-4">Heute</h1>
      <table className="table-auto border-collapse border border-gray-400 mb-8 w-max">
        <thead>
          <tr>
            {Array.from({ length: 10 }).map((_, index) => (
              <th
                key={index}
                className="border border-gray-300 p-2 text-center"
              >
                Stunde {index + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Array.from({ length: 10 }).map((_, index) => (
              <td
                key={index}
                className="border border-gray-300 p-2 text-center"
              >
                {planToday.find((item) => item.Stunde === index + 1)
                  ? planToday.find((item) => item.Stunde === index + 1).Text
                  : "Keine Vertretung"}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      {/* Table for Tomorrow */}
      <h1 className="text-xl font-bold mb-4">Morgen</h1>
      <table className="table-auto border-collapse border border-gray-400 w-max">
        <thead>
          <tr>
            {Array.from({ length: 10 }).map((_, index) => (
              <th
                key={index}
                className="border border-gray-300 p-2 text-center"
              >
                Stunde {index + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Array.from({ length: 10 }).map((_, index) => (
              <td
                key={index}
                className="border border-gray-300 p-2 text-center"
              >
                {planTomorrow.find((item) => item.Stunde === index + 1)
                  ? planTomorrow.find((item) => item.Stunde === index + 1).Text
                  : "Keine Vertretung"}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

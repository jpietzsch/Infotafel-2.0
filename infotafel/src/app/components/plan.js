import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Plan() {
  const [fachrichtung, setFachrichtung] = useState("");
  const [jobList, setJobList] = useState([]);
  const [planToday, setPlanToday] = useState([]);
  const [planTomorrow, setPlanTomorrow] = useState([]);

  // Fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:1337/api/berufe`);
        const jobsData = response.data.data;

        if (jobsData && jobsData.length > 0) {
          // Sort the job names alphabetically
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
    <div className="flex flex-col items-center p-6 space-y-8">
      <div className="flex flex-wrap justify-center space-x-8 space-y-4 w-full max-w-screen-lg">
        {jobList.map((job, index) => (
          <button
            key={index}
            className={`text-white text-lg font-bold uppercase hover:text-xl transition duration-300 ${
              fachrichtung === job ? "underline" : ""
            }`}
            onClick={() => setFachrichtung(job)}
          >
            {job}
          </button>
        ))}
      </div>

      <div className="w-full max-w-screen-lg mt-6">
        <h1 className="text-2xl font-bold mb-4 text-yellow-500">Heute</h1>
        <table className="table-auto border-collapse border border-gray-400 w-full text-center shadow-lg">
          <thead>
            <tr className="bg-yellow-500 text-black">
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
                <td key={index} className="p-3 border border-gray-300">
                  {planToday.find((item) => item.Stunde === index + 1)
                    ? planToday.find((item) => item.Stunde === index + 1).Text
                    : "-"}
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        <h1 className="text-2xl font-bold mb-4 text-yellow-500 mt-8">Morgen</h1>
        <table className="table-auto border-collapse border border-gray-400 w-full text-center shadow-lg">
          <thead>
            <tr className="bg-yellow-500 text-black">
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
                <td key={index} className="p-3 border border-gray-300">
                  {planTomorrow.find((item) => item.Stunde === index + 1)
                    ? planTomorrow.find((item) => item.Stunde === index + 1)
                        .Text
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

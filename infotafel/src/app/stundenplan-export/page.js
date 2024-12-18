"use client"

import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

export default function ExportPage() {
  const [jobs, setJobs] = useState([]);
  const [plan, setPlan] = useState([]);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:1337/api/berufe");
        const jobsData = response.data.data || [];
        setJobs(jobsData.map((job) => ({ Name: job.Name || "Unnamed Job", kurz: job.kurz })));
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
    console.log(jobs)
  }, []);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1337/api/stundenplaene?populate=*&filters[Datum][$eq]=${selectedDate}`
        );
        const planData = response.data.data || [];
        setPlan(
          planData.flatMap((item) =>
            item.Vertretungsplan.map((entry) => ({
              Beruf: { Name: item.beruf?.Name || "Unknown" },
              Stunde: entry.Stunde,
              Text: entry.Text || "Keine Vertretung",
            }))
          )
        );
      } catch (error) {
        console.error("Error fetching plan:", error);
      }
    };

    if (selectedDate) {
      fetchPlan();
    }
  }, [selectedDate]);

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();

    const headers = ["Hour", ...jobs.map((job) => job.kurz)];
    const rows = [];
    for (let hour = 1; hour <= 10; hour++) {
      const row = [hour];
      jobs.forEach((job) => {
        const substitution = plan.find(
          (item) => item.Beruf?.Name === job.Name && item.Stunde === hour
        );
        row.push(substitution ? substitution.Text : "");
      });
      rows.push(row);
    }

    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    XLSX.utils.book_append_sheet(workbook, worksheet, `Schedule ${selectedDate}`);

    // Create a blob and download it
    const excelFile = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelFile], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

    // Create a temporary download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `schedule_${selectedDate}.xlsx`;

    // Append link, trigger download, and clean up
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <h1 className="text-xl font-bold">Export Substitution Plan</h1>

      {/* Date Picker */}
      <label className="text-lg">
        Select Date:{" "}
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border rounded p-2"
        />
      </label>

      {/* Export Button */}
      <button
        onClick={exportToExcel}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Export to Excel
      </button>
    </div>
  );
}

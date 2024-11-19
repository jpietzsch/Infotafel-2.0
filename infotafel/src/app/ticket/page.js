"use client";
import React, { useState } from "react";
import axios from "axios";

function page() {
  const baseURL = "http://localhost:1337/api";

  // State to manage loading, success, or error status
  const [status, setStatus] = useState(null); // `null`, 'success', or 'error'

  async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    // Convert formData to an object
    const data = Object.fromEntries(formData.entries());
    console.log(data); // This will log an object with key-value pairs of form data

    try {
      // Make the POST request to create the ticket
      await axios.post(`${baseURL}/tickets`, {
        data: {
          vorname: data.vorname,
          nachname: data.nachname,
          email: data.email,
          standort: data.standort,
          beschreibung: data.beschreibung,
        },
      });

      // If the request is successful, update the status to 'success'
      setStatus("success");
    } catch (error) {
      // If there's an error, update the status to 'error'
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4"
      style={{ backgroundImage: "url('aE12.jpg?v=1')" }}
    >
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-lg md:max-w-2xl lg:max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Informatik Support
        </h1>

        <div className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="vorname" className="text-lg font-medium mb-2">
              Vorname:
            </label>
            <input
              type="text"
              id="vorname"
              name="vorname"
              placeholder="Placeholder Name"
              className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="nachname" className="text-lg font-medium mb-2">
              Nachname:
            </label>
            <input
              type="text"
              id="nachname"
              name="nachname"
              placeholder="Placeholder Name Name"
              className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-lg font-medium mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="normale@gmail.com"
              className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="standort" className="text-lg font-medium mb-2">
              Standort:
            </label>
            <input
              type="text"
              id="standort"
              name="standort"
              placeholder="wo hin gehst du, wohin?"
              className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="beschreibung" className="text-lg font-medium mb-2">
              Beschreibung:
            </label>
            <textarea
              id="beschreibung"
              name="beschreibung"
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
              className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
            ></textarea>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
            onClick={() => (window.location.href = "../")}
          >
            Zurück Startseite
          </button>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Abschicken
          </button>
        </div>

        {/* Visual confirmation message */}
        {status === "success" && (
          <p className="text-green-500 mt-4 text-center">Ticket send!</p>
        )}
        {status === "error" && (
          <p className="text-red-500 mt-4 text-center">
            Error creating ticket. Please try again later.
          </p>
        )}
      </div>
    </form>
  );
}

export default page;

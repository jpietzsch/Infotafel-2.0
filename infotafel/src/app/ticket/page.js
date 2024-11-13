'use client';
import React from 'react'
import axios from 'axios';

function page() {
  const baseURL = "http://localhost:1337/api"

  async function onSubmit(event) {
    event.preventDefault();
  
    const formData = new FormData(event.target);
  
    // Convert formData to an object
    const data = Object.fromEntries(formData.entries());
    console.log(data); // This will log an object with key-value pairs of form data
    

    axios.post(
      `${baseURL}/tickets`  , {
        data: {
          vorname: data.vorname,
          nachname: data.nachname,
          email: data.email,
          standort: data.standort,
          beschreibung: data.beschreibung
        }
      }
    )




  }
  


  return (
    <form onSubmit={onSubmit}>
      <div className="bg-black text-white flex items-center justify-center h-screen">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Informatik Support</h1>

          <div className="space-y-3">
            <div>
              <label htmlFor="vorname" className="block text-lg font-medium">Vorname:</label>
              <input type="text" id="vorname" name='vorname' placeholder="Placeholder Name" className="w-72 p-3 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label htmlFor="nachname" className="block text-lg font-medium">Nachname:</label>
              <input type="text" id="nachname" name='nachname' placeholder="Placeholder Name Name" className="w-72 p-3 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label htmlFor="email" className="block text-lg font-medium">Email:</label>
              <input type="email" id="email" name='email' placeholder="normale@gmail.com" className="w-72 p-3 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label htmlFor="standort" className="block text-lg font-medium">Standort:</label>
              <input type="text" id="standort" name='standort' placeholder="wo hin gehst du, wohin?" className="w-72 p-3 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label htmlFor="beschreibung" className="block text-lg font-medium">Beschreibung:</label>
              <textarea id="beschreibung" name='beschreibung' placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..." className="w-72 h-24 p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
            </div>
          </div>

          <div className="flex justify-center space-x-4 pt-4">
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full">Abbrechen</button>
            <button type='submit' className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full">Abschicken</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default page
'use client';
import React, { useState } from 'react';
import axios from 'axios';

function page() {
  const baseURL = "http://localhost:1337/api";
  
  // State to manage loading, success, or error status
  const [status, setStatus] = useState(null);  // `null`, 'success', or 'error'

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
          beschreibung: data.beschreibung
        }
      });

      // If the request is successful, update the status to 'success'
      setStatus('success');
    } catch (error) {
      // If there's an error, update the status to 'error'
      setStatus('error');
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="bg-black text-white flex items-center justify-center h-screen">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Informatik Support</h1>

          <div className="space-y-6">
            <div className="flex items-center space-x-14">
              <label htmlFor="vorname" className="text-lg font-medium ">Vorname:</label>
              <input type="text" id="vorname" name='vorname' placeholder="Placeholder Name" className="w-72 p-3 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="flex items-center space-x-10">
              <label htmlFor="nachname" className="text-lg font-medium">Nachname:</label>
              <input type="text" id="nachname" name='nachname' placeholder="Placeholder Name Name" className="w-72 p-3 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className='flex items-center space-x-20'>
              <label htmlFor="email" className="text-lg font-medium">Email:</label>
              <input type="email" id="email" name='email' placeholder="normale@gmail.com" className="w-72 p-3 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className='flex items-center space-x-14'>
              <label htmlFor="standort" className="text-lg font-medium">Standort:</label>
              <input type="text" id="standort" name='standort' placeholder="wo hin gehst du, wohin?" className="w-72 p-3 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className='flex items-center space-x-4'>
              <label htmlFor="beschreibung" className="text-lg font-medium">Beschreibung:</label>
              <textarea id="beschreibung" name='beschreibung' placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..." className="w-72 h-24 p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
            </div>
          </div>

          <div className="flex justify-center space-x-4 pt-4">
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full" onClick={() => window.location.href = '../'}>Zurück Startseite</button>
            <button type='submit' className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full">Abschicken</button>
          </div>

          {/* Visual confirmation message */}
          {status === 'success' && <p className="text-green-500 mt-4">Ticket send!</p>}
          {status === 'error' && <p className="text-red-500 mt-4">Error creating ticket. Please try again later.</p>}
        </div>
      </div>
    </form>
  );
}

export default page;

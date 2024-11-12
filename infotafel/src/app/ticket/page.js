import React from 'react'

function page() {
  return (
    <div className="bg-black text-white flex items-center justify-center h-screen">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Informatik Support</h1>

        <div className="space-y-3">
          <div>
            <label htmlFor="vorname" className="block text-lg font-medium">Vorname:</label>
            <input type="text" id="vorname" placeholder="Placeholder Name" className="w-72 p-3 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <label htmlFor="nachname" className="block text-lg font-medium">Nachname:</label>
            <input type="text" id="nachname" placeholder="Placeholder Name Name" className="w-72 p-3 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <label htmlFor="email" className="block text-lg font-medium">Email:</label>
            <input type="email" id="email" placeholder="normale@gmail.com" className="w-72 p-3 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <label htmlFor="standort" className="block text-lg font-medium">Standort:</label>
            <input type="text" id="standort" placeholder="wo hin gehst du, wohin?" className="w-72 p-3 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <label htmlFor="beschreibung" className="block text-lg font-medium">Beschreibung:</label>
            <textarea id="beschreibung" placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..." className="w-72 h-24 p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
          </div>
        </div>

        <div className="flex justify-center space-x-4 pt-4">
          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full">Abbrechen</button>
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full">Abschicken</button>
        </div>
      </div>
    </div>
  )
}

export default page
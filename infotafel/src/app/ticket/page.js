'use client';

import React, { useState } from 'react';

function Page() {
  // State to store form data
  const [ticketData, setTicketData] = useState({
    vorname: '',
    nachname: '',
    email: '',
    standort: '',
    beschreibung: '',
  });

  // State to handle form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setTicketData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = {
      ticketNumber: `TICKET-${Date.now()}`, // Strapi will handle UID generation automatically
      Vorname: ticketData.vorname,
      Nachname: ticketData.nachname,
      Email: ticketData.email,
      TicketStatus: 'booked', // Example of a static status, adjust as needed
      Beschreibung: ticketData.beschreibung,
      Standort: ticketData.standort,
    };

    try {
      const response = await fetch('http://localhost:1337/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Ticket creation failed');
      }

      const result = await response.json();
      setSubmissionStatus('Ticket successfully created!');
      setTicketData({ vorname: '', nachname: '', email: '', standort: '', beschreibung: '' });
    } catch (error) {
      setSubmissionStatus('Error creating ticket. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-black text-white flex items-center justify-center h-screen">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Informatik Support</h1>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="vorname" className="block text-lg font-medium">Vorname:</label>
            <input
              type="text"
              id="vorname"
              value={ticketData.vorname}
              onChange={handleChange}
              placeholder="Vorname"
              className="w-72 p-3 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="nachname" className="block text-lg font-medium">Nachname:</label>
            <input
              type="text"
              id="nachname"
              value={ticketData.nachname}
              onChange={handleChange}
              placeholder="Nachname"
              className="w-72 p-3 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-lg font-medium">Email:</label>
            <input
              type="email"
              id="email"
              value={ticketData.email}
              onChange={handleChange}
              placeholder="normale@gmail.com"
              className="w-72 p-3 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="standort" className="block text-lg font-medium">Standort:</label>
            <input
              type="text"
              id="standort"
              value={ticketData.standort}
              onChange={handleChange}
              placeholder="Standort"
              className="w-72 p-3 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="beschreibung" className="block text-lg font-medium">Beschreibung:</label>
            <textarea
              id="beschreibung"
              value={ticketData.beschreibung}
              onChange={handleChange}
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
              className="w-72 h-24 p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>

          <div className="flex justify-center space-x-4 pt-4">
            <button type="button" className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full">
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full"
            >
              {isSubmitting ? 'Abschicken...' : 'Abschicken'}
            </button>
          </div>
        </form>

        {submissionStatus && (
          <div className="mt-4 text-lg">
            <span className={submissionStatus.includes('Error') ? 'text-red-500' : 'text-green-500'}>
              {submissionStatus}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;

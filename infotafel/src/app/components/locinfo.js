import axios from "axios";
import { useEffect, useState } from "react";

export default function LocInfo({ isActive }) {
  const [locInfo, setLocInfo] = useState([]);

  // Accessibility settings
  const tabIndexValue = isActive ? 0 : -1; // Only focusable when active
  const ariaHiddenValue = !isActive; // Hide from screen readers when inactive


  //get backend info from strappi API
  useEffect(() => {
    const fetchData = async () => {
          try {
      const response = await axios.get(`http://localhost:1337/api/betreuers?`)
      console.log(response.data.data)
      setLocInfo(response.data.data)

      } catch (e) {
        console.log('The API request failed')
      }
    }
    fetchData()
  }, [])




  // Extract repeated block as a reusable component

  return (
    <div
      className="grid grid-cols-3 gap-4 min-h-full items-center"
      aria-hidden={ariaHiddenValue}
    >
      {locInfo.map((data, index) => (
        <div key={index} className="flex flex-col md:w-6/12 mt-8 md:mt-0 items-center">
          <h1 className="">{data.WG}</h1>
          <h2>{data.Betreuer}</h2>
          <h2>{data.Telefon}</h2>
        </div>
      ))}
    </div>
  );
}

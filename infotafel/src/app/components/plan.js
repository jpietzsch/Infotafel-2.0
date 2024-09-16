export default function Plan() {
    return (
      <div className="flex-1 h-screen flex flex-col justify-center p-0 m-0">
        <div className=" flex justify-center mt-32">
            <button className="text-2xl text-white px-4 py-2 rounded-md mx-2 ">Fachinformatiker</button>
            <button className="text-2xl text-white px-4 py-2 rounded-md mx-2">Gärtner</button>
            <button className="text-2xl text-white px-4 py-2 rounded-md mx-2">E-Commerce</button>
            <button className="text-2xl text-white px-4 py-2 rounded-md mx-2">Metall-Typen</button>
            <button className="text-2xl text-white px-4 py-2 rounded-md mx-2">BVB</button>
        </div>
        <div className=" flex justify-center mt-52">
            <button className="text-2xl text-white bg- px-4 py-2 rounded-md mr-2">AE</button>
            <button className="text-2xl text-white px-4 py-2 rounded-md">SI</button>
        </div>
        <table className="mt-10 m-auto">
          <thead>
            <tr>
              <th className="border-2 px-4 py-3">1. <br></br> 7:30-8:15 </th>
              <th className="border-2 px-4 py-3">2. <br></br> 8:20-9:05 </th>
              <th className="border-2 px-4 py-3">3. <br></br> 9:25-10:10 </th>
              <th className="border-2 px-4 py-3">4. <br></br> 10:15-11:00 </th>
              <th className="border-2 px-4 py-3">5. <br></br> 11:05-11:50 </th>
              <th className="border-2 px-4 py-3">6. <br></br> 12:35-13:20 </th>
              <th className="border-2 px-4 py-3">7. <br></br> 13:25-14:10 </th>
              <th className="border-2 px-4 py-3">8. <br></br> 14:20-15:05 </th>
              <th className="border-2 px-4 py-3">9. <br></br> 15:15-16:00 </th>
              <th className="border-2 px-4 py-3">10.<br></br> 16:00-16:45 </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-2 px-2 py-2">Piep</td>
              <td className="border-2 px-2 py-2">Piep</td>
              <td className="border-2 px-2 py-2">Piep</td>
              <td className="border-2 px-2 py-2">Piep</td>
              <td className="border-2 px-2 py-2">Piep Piep Piep Piep</td>
              <td className="border-2 px-2 py-2">Piep</td>
              <td className="border-2 px-2 py-2">Piep</td>
              <td className="border-2 px-2 py-2">Piep</td>
              <td className="border-2 px-2 py-2">Piep</td>
              <td className="border-2 px-2 py-2">Piep</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td className="border-2 px-2 py-2">Herr Typ-da</td>
              <td className="border-2 px-2 py-2">Herr Typ-da</td>
              <td className="border-2 px-2 py-2">Herr Typ-da</td>
              <td className="border-2 px-2 py-2">Herr Typ-da</td>
              <td className="border-2 px-2 py-2">Herr Typ-da</td>
              <td className="border-2 px-2 py-2">Herr Typ-da</td>
              <td className="border-2 px-2 py-2">Herr Typ-da</td>
              <td className="border-2 px-2 py-2">Herr Typ-da</td>
              <td className="border-2 px-2 py-2">Herr Typ-da</td>
              <td className="border-2 px-2 py-2">Herr Typ-da</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
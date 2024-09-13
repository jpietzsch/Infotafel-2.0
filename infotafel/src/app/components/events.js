export default function Events() {
    const content = `Gestern Abend ereignete sich ein tragischer Vorfall, 
    als eine unbekannte Person von einer Brücke in die Tiefe sprang. 
    Rettungskräfte waren schnell vor Ort, 
    konnten jedoch nicht mehr helfen. 
    Die genauen Hintergründe des Geschehens sind noch unklar, 
    die Ermittlungen laufen. 
    Zeugen werden gebeten, 
    sich bei der Polizei zu melden.`;
  
    return (

      <div className="w-full flex-1 flex h-1000 items-center">
        <h1 className="w-0 h-0" tabIndex="3">
        News
      </h1>
        <div className="w-7/12 flex flex-col">
          <h2 tabIndex="4" className="text-white text-4xl font-bold mb-20 mx-20">Irgendjemand hat sich gestern von der Brücke gestürzt</h2>
          <p tabIndex="5" className="text-white text-xl whitespace-pre-line ml-20">
            {content}
          </p>
        </div>

        <div className="w-5/12 flex items-center justify-end">
          <img
            src="pipebomb.jpeg"
            alt="bildi"
            style={{
              objectFit: "cover",
              width: "506px",
              height: "506px",
              borderRadius: "30px",
              borderStyle: "solid",
              borderColor: "white",
              borderWidth: "6px",
              margin: "auto"
            }}
          />
        </div>
      </div>
    );
  }
  
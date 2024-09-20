export default function Events({ isActive }) {
  const content = `Gestern Abend ereignete sich ein tragischer Vorfall, 
    als eine unbekannte Person von einer Brücke in die Tiefe sprang. 
    Rettungskräfte waren schnell vor Ort, 
    konnten jedoch nicht mehr helfen. 
    Die genauen Hintergründe des Geschehens sind noch unklar, 
    die Ermittlungen laufen. 
    Zeugen werden gebeten, 
    sich bei der Polizei zu melden.`;

  // Accessibility settings
  const tabIndexValue = isActive ? 0 : -1; // Only focusable when active
  const ariaHiddenValue = !isActive; // Hidden from screen readers when inactive

  return (
    <div
      className="w-full flex flex-col md:flex-row h-auto md:h-1000 items-center px-4 md:px-0"
      tabIndex={tabIndexValue}
      aria-hidden={ariaHiddenValue}
    >
      <div className="w-full md:w-7/12 flex flex-col mb-8 md:mb-0">
        <h2
          className="text-white text-3xl md:text-4xl font-bold mb-8 md:mb-20 mx-0 md:mx-20"
          tabIndex={tabIndexValue}
        >
          Irgendjemand hat sich gestern von der Brücke gestürzt
        </h2>
        <p
          className="text-white text-base md:text-xl whitespace-pre-line ml-0 md:ml-20"
          tabIndex={tabIndexValue}
        >
          {content}
        </p>
      </div>

      <div
        className="w-full md:w-5/12 mt-2 flex justify-center p-4 md:p-6"
        tabIndex={tabIndexValue}
        aria-hidden={ariaHiddenValue}
      >
          <img
          src="pipebomb.jpeg"
          alt="bildi"
          className="object-cover w-64 h-64 md:w-[506px] md:h-[506px] rounded-[30px] border-6 border-solid border-white"
        />
      </div>
    </div>
  );
}

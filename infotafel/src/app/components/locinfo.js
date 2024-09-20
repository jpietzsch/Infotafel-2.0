export default function LocInfo({ isActive }) {
  // Accessibility settings
  const tabIndexValue = isActive ? 0 : -1; // Only focusable when active
  const ariaHiddenValue = !isActive; // Hide from screen readers when inactive

  return (
    <div
      className="min-mx-4 mx-10 md:ml-52 mt-8 md:mt-16 w-full flex flex-col md:flex-row"
      tabIndex={tabIndexValue}
      aria-hidden={ariaHiddenValue}
    >
      <div className="flex-col w-3/4 md:w-6/12">
        <div className="justify-end">
          <div
            className="mt-10 md:mt-20 text-4xl md:text-6xl font-semibold"
            tabIndex={tabIndexValue}
          >
            WG:
          </div>
          <div
            className="mt-4 md:mt-8 font-thin text-2xl md:text-4xl"
            tabIndex={tabIndexValue}
          >
            Vallah-Billah-Straße.187
          </div>
          <div
            className="mt-20 md:mt-36 text-4xl md:text-6xl font-semibold"
            tabIndex={tabIndexValue}
          >
            Betreuer:
          </div>
          <div
            className="mt-4 md:mt-8 font-thin text-2xl md:text-4xl"
            tabIndex={tabIndexValue}
          >
            Herr Typ-da
          </div>
          <div
            className="mt-20 md:mt-36 text-4xl md:text-6xl font-semibold"
            tabIndex={tabIndexValue}
          >
            Tel.:
          </div>
          <div
            className="mt-4 md:mt-8 font-thin text-2xl md:text-4xl"
            tabIndex={tabIndexValue}
          >
            06516516511
          </div>
        </div>
      </div>

      {/* Repeat the content for other sections */}
      <div className="flex flex-col md:w-6/12 mt-8 md:mt-0">
        <div className="justify-end">
          <div
            className="mt-10 md:mt-20 text-4xl md:text-6xl font-semibold"
            tabIndex={tabIndexValue}
          >
            WG:
          </div>
          <div
            className="mt-4 md:mt-8 font-thin text-2xl md:text-4xl"
            tabIndex={tabIndexValue}
          >
            Vallah-Billah-Straße.187
          </div>
          <div
            className="mt-20 md:mt-36 text-4xl md:text-6xl font-semibold"
            tabIndex={tabIndexValue}
          >
            Betreuer:
          </div>
          <div
            className="mt-4 md:mt-8 font-thin text-2xl md:text-4xl"
            tabIndex={tabIndexValue}
          >
            Herr Typ-da
          </div>
          <div
            className="mt-20 md:mt-36 text-4xl md:text-6xl font-semibold"
            tabIndex={tabIndexValue}
          >
            Tel.:
          </div>
          <div
            className="mt-4 md:mt-8 font-thin text-2xl md:text-4xl"
            tabIndex={tabIndexValue}
          >
            06516516511
          </div>
        </div>
      </div>

      {/* Third section */}
      <div className="flex flex-col md:w-6/12 mt-8 md:mt-0">
        <div className="justify-end">
          <div
            className="mt-10 md:mt-20 text-4xl md:text-6xl font-semibold"
            tabIndex={tabIndexValue}
          >
            WG:
          </div>
          <div
            className="mt-4 md:mt-8 font-thin text-2xl md:text-4xl"
            tabIndex={tabIndexValue}
          >
            Vallah-Billah-Straße.187
          </div>
          <div
            className="mt-20 md:mt-36 text-4xl md:text-6xl font-semibold"
            tabIndex={tabIndexValue}
          >
            Betreuer:
          </div>
          <div
            className="mt-4 md:mt-8 font-thin text-2xl md:text-4xl"
            tabIndex={tabIndexValue}
          >
            Herr Typ-da
          </div>
          <div
            className="mt-20 md:mt-36 text-4xl md:text-6xl font-semibold"
            tabIndex={tabIndexValue}
          >
            Tel.:
          </div>
          <div
            className="mt-4 md:mt-8 font-thin text-2xl md:text-4xl"
            tabIndex={tabIndexValue}
          >
            06516516511
          </div>
        </div>
      </div>

      {/* Fourth section */}
      <div className="flex flex-col md:w-6/12 mt-8 md:mt-0">
        <div className="justify-end">
          <div
            className="mt-10 md:mt-20 text-4xl md:text-6xl font-semibold"
            tabIndex={tabIndexValue}
          >
            WG:
          </div>
          <div
            className="mt-4 md:mt-8 font-thin text-2xl md:text-4xl"
            tabIndex={tabIndexValue}
          >
            Vallah-Billah-Straße.187
          </div>
          <div
            className="mt-20 md:mt-36 text-4xl md:text-6xl font-semibold"
            tabIndex={tabIndexValue}
          >
            Betreuer:
          </div>
          <div
            className="mt-4 md:mt-8 font-thin text-2xl md:text-4xl"
            tabIndex={tabIndexValue}
          >
            Herr Typ-da
          </div>
          <div
            className="mt-20 md:mt-36 text-4xl md:text-6xl font-semibold"
            tabIndex={tabIndexValue}
          >
            Tel.:
          </div>
          <div
            className="mt-4 md:mt-8 font-thin text-2xl md:text-4xl"
            tabIndex={tabIndexValue}
          >
            06516516511
          </div>
        </div>
      </div>
    </div>
  );
}

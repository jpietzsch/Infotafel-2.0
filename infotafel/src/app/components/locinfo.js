export default function LocInfo({ isActive }) {
  // Accessibility settings
  const tabIndexValue = isActive ? 0 : -1; // Only focusable when active
  const ariaHiddenValue = !isActive; // Hide from screen readers when inactive

  // Extract repeated block as a reusable component
  const InfoBlock = ({ label, content }) => (
    <div>
      <div className="mt-10 md:mt-20 text-4xl md:text-6xl font-semibold" tabIndex={tabIndexValue}>
        {label}
      </div>
      <div className="mt-4 md:mt-8 font-thin text-2xl md:text-4xl" tabIndex={tabIndexValue}>
        {content}
      </div>
    </div>
  );

  // Reusable section component
  const Section1 = () => (
    <div className="flex flex-col md:w-6/12 mt-8 md:mt-0">
      <InfoBlock label="WG:" content="Vallah-Billah-Straße.187" />
      <InfoBlock label="Betreuer:" content="Herr Typ-da" />
      <InfoBlock label="Tel.:" content="06516516511" />
    </div>
  );
  const Section2 = () => (
    <div className="flex flex-col md:w-6/12 mt-8 md:mt-0">
      <InfoBlock label="WG:" content="Vallah-Billah-Straße.187a" />
      <InfoBlock label="Betreuer:" content="Herr Typ-daa" />
      <InfoBlock label="Tel.:" content="06516516511" />
    </div>
  );
  const Section3 = () => (
    <div className="flex flex-col md:w-6/12 mt-8 md:mt-0">
      <InfoBlock label="WG:" content="Vallah-Billah-Straße.187b" />
      <InfoBlock label="Betreuer:" content="Herr Typ-daaa" />
      <InfoBlock label="Tel.:" content="06516516511" />
    </div>
  );
  const Section4 = () => (
    <div className="flex flex-col md:w-6/12 mt-8 md:mt-0">
      <InfoBlock label="WG:" content="Vallah-Billah-Straße.187c" />
      <InfoBlock label="Betreuer:" content="Herr Typ-daaaa" />
      <InfoBlock label="Tel.:" content="06516516511" />
    </div>
  );

  return (
    <div
      className="min-mx-4 mx-10 md:ml-52 mt-8 md:mt-16 flex flex-col md:flex-row"
      aria-hidden={ariaHiddenValue}
    >
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
    </div>
  );
}

import Events from "./components/events";
import Weather from "./components/weather";
import LocInfo from "./components/locinfo";

export default function Home() {
  return (
    <div
      className="flex-1 bg-cover bg-center w-full flex flex-col p-0 m-0"
      style={{ backgroundImage: `url('aE12.jpg?v=1')` }}
    >
      <div className="w-full flex-1 flex bg-black/65 w-full h-full">
        {/*left arrow */}
        <button className="w-1/12 flex items-center justify-center">
          <img src="arrowleft.png" alt="Left Arrow" />
        </button>

        {/*main content */}
        <LocInfo className="w-10/12 flex-1"></LocInfo>
        
        {/*right arrow */}
        <button className="w-1/12 flex items-center justify-center">
          <img src="arrowright.png" alt="Left Arrow" />{" "}
        </button>
      </div>
    </div>
  );
}

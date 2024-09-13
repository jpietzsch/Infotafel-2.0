import Events from "./components/events";
import Fahrplan from "./components/bus";
import Weather from "./components/weather";
import LocInfo from "./components/locinfo";
import Foods from "./components/foods";

export default function Home() {
  return (
    <div
      className="flex-1 bg-cover bg-center w-full h-screen flex flex-col p-0 m-0"
      style={{ backgroundImage: `url('aE12.jpg?v=1')`, objectFit: 'cover' }}
    >
      <div className="flex-1 flex bg-black/65 w-full h-full">
        {/*left arrow */}
        <button className="w-1/12 flex items-center justify-center sm:w-1/20 md:w-1/24 lg:w-1/32 xl:w-1/40" tabIndex="1">
          <img src="arrowleft.png" alt="Left Arrow" />
        </button>

        {/*main content */}
        <Weather className="flex-1 sm:w-10/12 md:w-11/12 lg:w-13/14 xl:w-14/15"></Weather>
        
        {/*right arrows */}
        <button className="w-1/12 flex items-center justify-center sm:w-1/20 md:w-1/24 lg:w-1/32 xl:w-1/40" tabIndex="50">
          <img src="arrowright.png" alt="Left Arrow" />
        </button>
      </div>
    </div>
  );
}

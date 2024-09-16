"use client";

import React, { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Events from "./components/events";
import Fahrplan from "./components/bus";
import Weather from "./components/weather";
import LocInfo from "./components/locinfo";
import Foods from "./components/foods";
import Image from "next/image";

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    // Check the initial state when Embla is ready
    emblaApi.on("select", onSelect);
    onSelect(); // Run once on mount to initialize button states

    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  return (
    <div
      className="flex-1 bg-cover bg-center w-full h-screen flex flex-col p-0 m-0"
      style={{ backgroundImage: `url('aE12.jpg?v=1')`, objectFit: "cover" }}
    >
      <div className="flex-1 flex bg-black/65 w-full relative overflow-hidden">
        {/* Embla Carousel */}
        <div className="relative w-full" ref={emblaRef}>
          <div className="flex transition-transform duration-100 ease-in-out">
            {/* Carousel Items */}
            <div className="embla__slide w-full flex-shrink-0">
              <Events />
            </div>
            <div className="embla__slide w-full flex-shrink-0">
              <Fahrplan />
            </div>
            <div className="embla__slide w-full flex-shrink-0">
              <Weather />
            </div>
            <div className="embla__slide w-full flex-shrink-0">
              <LocInfo />
            </div>
            <div className="embla__slide w-full flex-shrink-0">
              <Foods />
            </div>
          </div>

          {/* Left Arrow */}
          <button
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 ${
              !canScrollPrev ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={scrollPrev}
            disabled={!canScrollPrev}
          >
            <Image src="/arrowleft.png" alt="Previous" width={50} height={50} />
          </button>

          {/* Right Arrow */}
          <button
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 ${
              !canScrollNext ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={scrollNext}
            disabled={!canScrollNext}
          >
            <Image src="/arrowright.png" alt="Next" width={50} height={50} />
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Events from "./components/events";
import Fahrplan from "./components/bus";
import Weather from "./components/weather";
import LocInfo from "./components/locinfo";
import Foods from "./components/foods";
import Plan from "./components/plan";
import Image from "next/image";

// Generate a random number between 1 and 1000 for 1% chance
const safeRandom = Math.floor(Math.random() * 1000) + 1;
console.log(safeRandom + " safeRandom");

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0); // Keep track of active slide

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
      setActiveIndex(emblaApi.selectedScrollSnap()); // Update active slide index
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Numpad4") {
        scrollPrev();
      } else if (event.code === "Numpad6") {
        scrollNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [scrollPrev, scrollNext]);

  const backgroundImage =
    safeRandom === 69 ? "placeholder.jpg" : "aE12.jpg?v=1";

  const slides = [
    //<Weather key="weather" />,
    <Events key="events" />,
    <LocInfo key="locinfo" />,
    <Fahrplan key="fahrplan" />,
    <Foods key="foods" />,
    <Plan key="plan" />
  ];

  return (
    <div
      className="flex-1 bg-cover bg-center w-full h-screen flex flex-col p-0 m-0"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        objectFit: "cover",
      }}
    >
      <div className="flex-1 flex bg-black/65 w-full relative overflow-hidden">
        {/* Carousel */}
        <div className="relative w-full" ref={emblaRef}>
          <div className="flex transition-transform duration-100 ease-in-out">
            {slides.map((slide, index) => (
              <div
                key={index}
                className="embla__slide w-full flex-shrink-0"
                tabIndex={index === activeIndex ? 0 : -1} // Focusable only when active
                aria-hidden={index !== activeIndex} // Hidden from screen readers when inactive
              >
                {slide}
              </div>
            ))}
          </div>

          {/* Left Arrow */}
          <button
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 ${
              !canScrollPrev ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous Slide"
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
            aria-label="Next Slide"
          >
            <Image src="/arrowright.png" alt="Next" width={50} height={50} />
          </button>
        </div>
      </div>
    </div>
  );
}

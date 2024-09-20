"use client";

import React, { useRef } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Events from "../components/events";
import Fahrplan from "../components/bus";
import Weather from "../components/weather";
import LocInfo from "../components/locinfo";
import Foods from "../components/foods";
import Plan from "../components/plan";
import Image from "next/image";

function Page() {
  const [mainSliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
    },
  });

  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);

  const updateArrows = () => {
    if (instanceRef.current) {
      const details = instanceRef.current.details();
      if (prevButtonRef.current) {
        prevButtonRef.current.disabled = details.relativeSlide === 0;
      }
      if (nextButtonRef.current) {
        nextButtonRef.current.disabled = details.relativeSlide === details.size - 1;
      }
    }
  };

  return (
    <div>
      <Plan />
    </div>
  );
}

export default Page;
"use client";
import { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Update the time every second
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return <div className="font-semibold text-3xl" suppressHydrationWarning tabIndex={-1}>{time.toLocaleTimeString()}</div>;
};

export default Clock;
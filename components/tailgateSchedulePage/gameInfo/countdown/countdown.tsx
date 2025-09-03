"use client";

import { useEffect, useState } from "react";

interface GameCountdownProps {
  date: Date | string;
}

function getTimeRemaining(targetDate: Date) {
  const total = targetDate.getTime() - new Date().getTime();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { total, days, hours, minutes, seconds };
}

export default function Countdown({ date }: GameCountdownProps) {
  const [timeLeft, setTimeLeft] = useState(() =>
    getTimeRemaining(new Date(date))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const updated = getTimeRemaining(new Date(date));
      setTimeLeft(updated);

      if (updated.total <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  return (
    <>
      {timeLeft.total > 0 ? (
        <p className="text-tw-dark-red text-3xl md:text-4xl lg:text-5xl font-semibold my-4 lg:my-8">
          {`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
        </p>
      ) : (
        <p className="text-foreground text-3xl md:text-4xl lg:text-5xl font-semibold my-4 lg:my-8">
          Game is live or completed!
        </p>
      )}
    </>
  );
}

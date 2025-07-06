"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";
import { Game } from "@/types";

interface CalendarSectionProps {
  games: Game[];
}

type CalendarValue = Date | [Date | null, Date | null] | null;

export default function CalendarSection({ games }: CalendarSectionProps) {
  const [date, setDate] = useState<CalendarValue>(new Date());
  console.log("Games:", games);

  const gameMap = new Map(
    games.map((game) => [new Date(game.date).toISOString().split("T")[0], game])
  );

  return (
    <div className="flex justify-center items-center p-2 w-full">
      <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-[768px]">
        <Calendar
          onChange={(value) => setDate(value)}
          value={date}
          calendarType="gregory"
          tileContent={({ date: tileDate }) => {
            const iso = tileDate.toISOString().split("T")[0];
            const game = gameMap.get(iso);

            if (!game)
              return (
                <div className="flex flex-col items-center justify-end h-[3.7rem]">
                  <span className="text-[10px] text-gray-500">No Game</span>
                </div>
              );

            return (
              <div className="flex flex-col items-center mt-1">
                <img
                  src={game.opponent.logo}
                  alt={game.opponent.name}
                  className="w-10 h-10 object-contain"
                />
                <span className="hidden sm:block text-[10px] text-center">
                  {game.opponent.name}
                </span>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
}

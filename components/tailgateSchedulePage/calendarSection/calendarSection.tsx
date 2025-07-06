"use client";

import { Dispatch, SetStateAction } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";
import { Game } from "@/types";

interface CalendarSectionProps {
  games: Game[];
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
}

export default function CalendarSection({
  games,
  selectedDate,
  setSelectedDate,
}: CalendarSectionProps) {
  const gameMap = new Map(
    games.map((game) => [new Date(game.date).toISOString().split("T")[0], game])
  );

  return (
    <div className="flex justify-center items-center p-4 lg:py-6 w-full">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-[768px]">
        <Calendar
          onChange={(value) => {
            if (value instanceof Date) setSelectedDate(value);
          }}
          value={selectedDate}
          calendarType="gregory"
          tileContent={({ date: tileDate }) => {
            const iso = tileDate.toISOString().split("T")[0];
            const game = gameMap.get(iso);

            if (!game)
              return (
                <div className="flex flex-col items-center justify-end h-[2.75rem] md:h-[3.8rem]">
                  {/* <span className="text-[10px] md:text-[12px] text-gray-500">
                    No Game
                  </span> */}
                </div>
              );

            return (
              <div className="flex flex-col items-center mt-1">
                <img
                  src={game.opponent.logo}
                  alt={game.opponent.name}
                  className="w-10 h-10 object-contain"
                />
                <span className="hidden md:block text-[10px] md:text-[12px] text-center text-black">
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

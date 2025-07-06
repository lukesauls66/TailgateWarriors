"use client";

import { useState } from "react";
import CalendarSection from "./calendarSection";
import GameInfo from "./gameInfo";
import { Game } from "@/types";

interface TailgateSchedulePageProps {
  games: Game[];
}

export default function TailgateSchedulePage({
  games,
}: TailgateSchedulePageProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const selectedGame = games.find(
    (game) =>
      new Date(game.date).toISOString().split("T")[0] ===
      selectedDate.toISOString().split("T")[0]
  );

  return (
    <main className="flex flex-col items-center justify-center pb-4 pt-4 md:pt-8">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
        Tailgate Schedule
      </h1>
      <CalendarSection
        games={games}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      {selectedGame ? (
        <GameInfo selectedGame={selectedGame} />
      ) : (
        <p className="text-gray-500">No game on this day.</p>
      )}
    </main>
  );
}

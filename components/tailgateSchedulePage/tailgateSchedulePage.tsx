"use client";

import { useState } from "react";
import CalendarSection from "./calendarSection";
import GameInfo from "./gameInfo";
import { Game } from "@/types";
import { useAuth } from "@/app/context/AuthContext";
import Button from "../utils/Button";

interface TailgateSchedulePageProps {
  games: Game[];
}

export default function TailgateSchedulePage({
  games,
}: TailgateSchedulePageProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
  const { user } = useAuth();
  console.log("User:", user);

  const selectedGame = games.find(
    (game) =>
      new Date(game.date).toISOString().split("T")[0] ===
      selectedDate.toISOString().split("T")[0]
  );
  console.log("Selected Game:", selectedGame);

  return (
    <main className="flex flex-col items-center justify-center pb-4 pt-4 md:pt-8 gap-2 lg:gap-6">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
        Tailgate Schedule
      </h1>
      {user && (
        <div className="flex gap-2 md:gap-4 text-sm md:text-base lg:text-lg">
          <Button
            onClick={() => setIsCreateOpen(true)}
            name="Create"
            width="w-[6rem] md:w-[8rem]"
          />
          {selectedGame && (
            <Button
              onClick={() => setIsUpdateOpen(true)}
              name="Update"
              width="w-[6rem] md:w-[8rem]"
            />
          )}
        </div>
      )}
      {/* {user && isCreateOpen ? (
        <p>Create a new game</p>
      ) : user && isUpdateOpen ? (
        <p>Update the game</p>
      ) : user && selectedGame ? (
        <div className="flex gap-2 md:gap-4 text-sm md:text-base lg:text-lg">
          <Button
            onClick={() => setIsCreateOpen(true)}
            name="Create"
            width="w-[6rem] md:w-[8rem]"
          />
          <Button
            onClick={() => setIsUpdateOpen(true)}
            name="Update"
            width="w-[6rem] md:w-[8rem]"
          />
        </div>
      ) : (
        user && (
          <div className="flex gap-2 md:gap-4 text-sm md:text-base lg:text-lg">
            <Button
              onClick={() => setIsCreateOpen(true)}
              name="Create"
              width="w-[6rem] md:w-[8rem]"
            />
          </div>
        )
      )} */}
      <CalendarSection
        games={games}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      {selectedGame ? (
        <GameInfo selectedGame={selectedGame} />
      ) : (
        <p className="text-gray-500 text-lg md:text-xl lg:text-2xl my-4 lg:my-8">
          No game on this day.
        </p>
      )}
    </main>
  );
}

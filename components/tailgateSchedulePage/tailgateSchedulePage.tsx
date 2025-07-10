"use client";

import { useState } from "react";
import CalendarSection from "./calendarSection";
import GameInfo from "./gameInfo";
import { Game } from "@/types";
import { useAuth } from "@/app/context/AuthContext";
import Button from "../utils/button";
import GameModal from "./gameModal";

interface TailgateSchedulePageProps {
  games: Game[];
}

export default function TailgateSchedulePage({
  games,
}: TailgateSchedulePageProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
  const [gamesState, setGamesState] = useState<Game[]>(games);
  const { user } = useAuth();
  console.log("TailgateSchedulePage games:", gamesState);

  const selectedGame = gamesState.find((g) => g.id === selectedGameId) ?? null;

  const handleSaveGame = (savedGame: Game) => {
    setGamesState((prevGames) => {
      const existing = prevGames.find((g) => g.id === savedGame.id);
      if (existing) {
        return prevGames.map((g) => (g.id === savedGame.id ? savedGame : g));
      } else {
        return [...prevGames, savedGame];
      }
    });

    setSelectedDate(new Date(savedGame.date));
    setSelectedGameId(savedGame.id);
  };

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
      <CalendarSection
        games={gamesState}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setSelectedGameId={setSelectedGameId}
      />
      {selectedGame ? (
        <GameInfo
          game={selectedGame}
          onDelete={(deletedId) => {
            setGamesState((prevGames) =>
              prevGames.filter((g) => g.id !== deletedId)
            );
          }}
        />
      ) : (
        <p className="text-gray-500 text-lg md:text-xl lg:text-2xl my-4 lg:my-8">
          No game on this day.
        </p>
      )}
      <GameModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSave={handleSaveGame}
      />
      <GameModal
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        game={selectedGame}
        onSave={handleSaveGame}
      />
    </main>
  );
}

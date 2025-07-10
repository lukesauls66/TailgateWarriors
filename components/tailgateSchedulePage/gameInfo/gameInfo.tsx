"use client";

import Countdown from "./countdown";
import { Game } from "@/types";
import Button from "@/components/utils/button";

interface GameInfoProps {
  game: Game;
  onDelete: (deletedGameId: string) => void;
}

export default function GameInfo({ game, onDelete }: GameInfoProps) {
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/game/${game.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete game");
      }

      onDelete(game.id);
    } catch (error) {
      console.error("Failed to delete game:", error);
    }
  };

  return (
    <section className="flex flex-col items-center gap-4">
      <h2 className="flex items-center text-lg md:text-xl lg:text-2xl font-semibold gap-4">
        <img
          src="/cardinals-logo.png"
          alt="Cardinals Logo"
          className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain"
        />
        {game.location === "Home" ? "vs" : "@"}{" "}
        {game?.opponent?.logo && (
          <img
            src={game.opponent.logo}
            alt={`${game.opponent.name} Logo`}
            className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain"
          />
        )}
      </h2>
      <p className="text-gray-600 md:text-lg lg:text-xl">
        {new Date(game.date).toLocaleString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })}
      </p>
      <Countdown date={game.date} />
      <Button name="Delete Game" onClick={handleDelete} />
    </section>
  );
}

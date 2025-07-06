import { Game } from "@/types";

interface GameInfoProps {
  selectedGame: Game;
}

export default function GameInfo({ selectedGame }: GameInfoProps) {
  return (
    <section className="text-center">
      <h2 className="text-lg md:text-xl font-semibold mb-2">
        Our Team {selectedGame.location === "Home" ? "vs" : "@"}{" "}
        {selectedGame.opponent.name}
      </h2>
      <p className="text-gray-600">
        {new Date(selectedGame.date).toLocaleString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })}
      </p>
    </section>
  );
}

import Countdown from "./countdown";
import { Game } from "@/types";

interface GameInfoProps {
  selectedGame: Game;
}

export default function GameInfo({ selectedGame }: GameInfoProps) {
  return (
    <section className="flex flex-col items-center gap-4 mt-6">
      <h2 className="flex items-center text-lg md:text-xl lg:text-2xl font-semibold gap-4">
        <img
          src="/cardinals-logo.png"
          alt="Cardinals Logo"
          className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain"
        />
        {selectedGame.location === "Home" ? "vs" : "@"}{" "}
        <img
          src={selectedGame.opponent.logo}
          alt={`${selectedGame.opponent.name} Logo`}
          className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain"
        />
      </h2>
      <p className="text-gray-600 md:text-lg lg:text-xl">
        {new Date(selectedGame.date).toLocaleString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })}
      </p>
      <Countdown date={selectedGame.date} />
    </section>
  );
}

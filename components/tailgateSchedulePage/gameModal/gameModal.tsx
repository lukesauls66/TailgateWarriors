"use client";

import { useState, useEffect } from "react";
import Modal from "@/components/utils/modal";
import GameForm from "./gameForm/gameForm";
import { Game, Team } from "@/types";

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  game?: Game | null;
  onSave: (savedGame: Game) => void;
}

export default function GameModal({
  isOpen,
  onClose,
  game,
  onSave,
}: GameModalProps) {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch("/api/team");
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };
    fetchTeams();
  }, []);

  const handleSubmit = async (gameData: {
    date: Date;
    location: "Home" | "Away";
    opponentId: string;
  }) => {
    try {
      let response;
      if (game) {
        response = await fetch(`/api/game/${game.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(gameData),
        });
      } else {
        response = await fetch("/api/game", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(gameData),
        });
      }

      const resJson = await response.json();
      const savedGame = resJson.newGame || resJson;
      onSave(savedGame);
      onClose();
    } catch (error) {
      console.error("Failed to submit game:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-semibold pb-4">
        {game ? "Update Game" : "Create a New Game"}
      </h2>
      <GameForm teams={teams} game={game} onSubmit={handleSubmit} />
    </Modal>
  );
}

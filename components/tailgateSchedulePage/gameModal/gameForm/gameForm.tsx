"use client";

import { useState, useEffect } from "react";
import { Game, Team } from "@/types";
import Button from "../../../utils/button";
import { Listbox } from "@headlessui/react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./gameForm.css";

interface GameFormProps {
  teams: Team[];
  game?: Game;
  onSubmit: (game: {
    date: Date;
    location: "Home" | "Away";
    opponentId: string;
  }) => void;
}

export default function GameForm({ teams, game, onSubmit }: GameFormProps) {
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState("");
  const [location, setLocation] = useState<"Home" | "Away">("Home");
  const [opponentId, setOpponentId] = useState("");

  useEffect(() => {
    if (game) {
      const gameDate = new Date(game.date);
      setDate(new Date(game.date));
      setTime(gameDate.toTimeString().slice(0, 5));
      setLocation(game.location);
      setOpponentId(game.opponentId);
    }
  }, [game]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !time || !opponentId) return;

    const [hours, minutes] = time.split(":").map(Number);
    const datetime = new Date(date);
    datetime.setHours(hours, minutes, 0, 0);

    onSubmit({
      date: datetime,
      location,
      opponentId,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="date" className="font-semibold">
          Date
        </label>
        <ReactDatePicker
          selected={date}
          onChange={(date) => {
            if (date) setDate(date);
          }}
          dateFormat="MM-dd-yyyy"
          className="w-full border p-2 rounded"
          required
          placeholderText="Select Date"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="time" className="font-semibold">
          Time
        </label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border p-2 rounded"
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-semibold">Location</span>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="location"
            value="Home"
            checked={location === "Home"}
            onChange={() => setLocation("Home")}
            className="accent-tw-red"
          />
          Home
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="location"
            value="Away"
            checked={location === "Away"}
            onChange={() => setLocation("Away")}
            className="accent-tw-red"
          />
          Away
        </label>
      </div>
      <div className="flex flex-col max-h-[10rem] overflow-y-auto">
        <Listbox value={opponentId} onChange={setOpponentId}>
          <Listbox.Button className="flex gap-4 items-center border p-2 rounded">
            {opponentId ? (
              <>
                <img
                  src={
                    teams.find((team) => team.id === opponentId)?.logo ||
                    "/placeholder.png"
                  }
                  alt={
                    teams.find((team) => team.id === opponentId)?.name ||
                    "Team logo"
                  }
                  className="w-8 h-8 object-contain"
                />
                <span>
                  {teams.find((team) => team.id === opponentId)?.name}
                </span>
              </>
            ) : (
              "Select opponent"
            )}
          </Listbox.Button>
          <Listbox.Options className="border rounded shadow">
            {teams.map((team) => (
              <Listbox.Option
                key={team.id}
                value={team.id}
                className="flex items-center gap-4 p-2 hover:bg-gray-100"
              >
                <img src={team.logo} alt={team.name} className="w-8 h-8" />
                {team.name}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>

      <Button type="submit" name={game ? "Update Game" : "Create Game"} />
    </form>
  );
}

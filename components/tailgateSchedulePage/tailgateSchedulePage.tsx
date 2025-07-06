import CalendarSection from "./calendarSection";
import { Game } from "@/types";

interface TailgateSchedulePageProps {
  games: Game[];
}

export default function TailgateSchedulePage({
  games,
}: TailgateSchedulePageProps) {
  return (
    <main className="flex flex-col items-center justify-center pb-4 pt-4 md:pt-8 lg:pt-12">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
        Tailgate Schedule
      </h1>
      <CalendarSection games={games} />
    </main>
  );
}

"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";

type CalendarValue = Date | [Date | null, Date | null] | null;

export default function CalendarSection() {
  const [date, setDate] = useState<CalendarValue>(new Date());

  return (
    <div className="flex justify-center items-center p-6 w-full">
      <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-[768px]">
        <Calendar
          onChange={(value) => setDate(value)}
          value={date}
          calendarType="gregory"
          tileClassName={({ date: d }) => {
            const isToday = new Date().toDateString() === d.toDateString();
            return isToday ? "today" : undefined;
          }}
        />
      </div>
    </div>
  );
}

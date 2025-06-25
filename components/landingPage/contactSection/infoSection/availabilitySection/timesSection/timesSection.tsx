export default function TimesSection() {
  const days = [
    { label: "Mon", hours: "09:00 AM – 05:00 PM" },
    { label: "Tues", hours: "09:00 AM – 05:00 PM" },
    { label: "Wed", hours: "09:00 AM – 05:00 PM" },
    { label: "Thu", hours: "09:00 AM – 05:00 PM" },
    { label: "Fri", hours: "09:00 AM – 05:00 PM" },
    { label: "Sat", hours: "Closed" },
    { label: "Sun", hours: "Closed" },
  ];

  const todayIndex = (new Date().getDay() + 6) % 7;

  return (
    <div className="w-full text-center lg:text-left lg:text-lg text-tw-grey">
      <table className="w-full border-separate border-spacing-y-2">
        <tbody>
          {days.map((day, index) => (
            <tr key={day.label}>
              <th
                scope="row"
                className={`pr-4 text-left ${
                  index === todayIndex ? "font-bold" : "font-medium"
                }`}
              >
                {day.label}
              </th>
              <td
                className={`text-right ${
                  index === todayIndex ? "font-bold" : "font-medium"
                }`}
              >
                {day.hours}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

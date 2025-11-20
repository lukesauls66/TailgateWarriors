"use client";

import type { User } from "../aboutUsPage";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="bg-tw-red/90 dark:bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition">
      {user.imgUrl ? (
        <img
          src={user.imgUrl}
          alt={user.name}
          className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-gray-200"
        />
      ) : (
        <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 text-xl font-bold mb-4">
          {user.name?.charAt(0).toUpperCase()}
        </div>
      )}
      <div className="flex flex-col gap-2 md:gap-4">
        <h3 className="text-lg lg:text-xl font-semibold text-black">
          {user.name}
        </h3>

        {user.duties && (
          <p className="text-sm md:text-md lg:text-lg text-black">
            <span className="font-medium">Duties:</span> {user.duties}
          </p>
        )}
        {user.yearsOnCrew && (
          <p className="text-sm md:text-md lg:text-lg text-black">
            <span className="font-medium">Years:</span> {user.yearsOnCrew}
          </p>
        )}
        {user.favoriteMemory && (
          <p className="hidden lg:block text-sm md:text-md lg:text-lg italic text-black">
            <span className="font-medium">Favorite Memory: </span>"
            {user.favoriteMemory}"
          </p>
        )}
        {user.birthday && (
          <p className="text-sm md:text-md lg:text-lg text-black">
            🎂{" "}
            {(() => {
              try {
                if (!user.birthday) return "No Date";

                console.log(
                  "Raw birthday value:",
                  user.birthday,
                  "Type:",
                  typeof user.birthday
                );

                // Convert to string if it's not already
                const birthdayStr = String(user.birthday).trim();

                // Handle existing MM/DD or MM/D format from database
                const parts = birthdayStr.split("/");
                console.log("Split parts:", parts);
                console.log(
                  "Month part:",
                  `"${parts[0]}"`,
                  "Length:",
                  parts[0].length,
                  "Char codes:",
                  [...parts[0]].map((c) => c.charCodeAt(0))
                );
                console.log(
                  "Day part:",
                  `"${parts[1]}"`,
                  "Length:",
                  parts[1].length,
                  "Char codes:",
                  [...parts[1]].map((c) => c.charCodeAt(0))
                );

                if (parts.length !== 2) {
                  console.error("Invalid birthday format:", birthdayStr);
                  return "Invalid Format";
                }

                // Clean the parts more aggressively - remove any non-digit characters
                const monthStr = parts[0].replace(/\D/g, "");
                const dayStr = parts[1].replace(/\D/g, "");

                console.log(
                  "Cleaned - Month:",
                  `"${monthStr}"`,
                  "Day:",
                  `"${dayStr}"`
                );

                const monthNum = parseInt(monthStr, 10);
                const dayNum = parseInt(dayStr, 10);

                console.log(
                  "Parsed numbers - Month:",
                  monthNum,
                  "Day:",
                  dayNum
                );

                // Validate month and day are valid numbers
                if (
                  isNaN(monthNum) ||
                  isNaN(dayNum) ||
                  monthNum < 1 ||
                  monthNum > 12 ||
                  dayNum < 1 ||
                  dayNum > 31
                ) {
                  console.error(
                    "Invalid birthday values:",
                    birthdayStr,
                    "Month:",
                    monthNum,
                    "Day:",
                    dayNum
                  );
                  return "Invalid Date";
                }

                const month = monthNum.toString().padStart(2, "0");
                const day = dayNum.toString().padStart(2, "0");

                return `${month}/${day}`;
              } catch (error) {
                console.error("Error parsing birthday:", user.birthday, error);
                return "Date Error";
              }
            })()}
          </p>
        )}
      </div>
    </div>
  );
}

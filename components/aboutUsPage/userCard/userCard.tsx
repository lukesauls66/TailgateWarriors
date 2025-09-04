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
            🎂 {new Date(user.birthday).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
}

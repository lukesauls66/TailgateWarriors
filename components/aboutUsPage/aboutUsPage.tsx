"use client";

import UserCard from "./userCard";

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  duties?: string;
  yearsOnCrew?: string;
  favoriteMemory?: string;
  birthday?: string;
  imgUrl?: string;
};

interface AboutUsPageProps {
  users: User[];
}

export default function AboutUsPage({ users }: AboutUsPageProps) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 lg:p-12 gap-4 md:gap-8 lg:gap-12">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center">
        About Us
      </h1>
      <div className="w-full max-w-6xl gap-4 md:gap-8 flex flex-col items-center">
        <h2 className="font-bold text-lg md:text-xl xl:text-2xl">
          Mission Statement
        </h2>
        <p className="md:text-lg xl:text-xl">
          At Tailgate Warriors, we believe game day is more than just the score
          — it&apos;s about community, camaraderie, and giving back. We&apos;re
          a passionate crew of sports lovers, grill masters, and parking lot
          MVPs who turn every tailgate into a celebration of fun, friendship,
          and fair play.
        </p>
        <p className="md:text-lg xl:text-xl">
          Our mission is to unite fans through epic tailgates, promote great
          sportsmanship on and off the field, and rally support for worthy
          causes in our communities. Whether we&apos;re flipping burgers,
          serving tasty adult beverages or fundraising for local charities, we
          bring the same energy and heart to everything we do.
        </p>
        <p className="md:text-lg xl:text-xl">
          Because being a Tailgate Warrior means cheering loud, playing fair,
          and leaving the world a little better after every game.
        </p>
      </div>
      <div className="w-full max-w-6xl gap-4 md:gap-8 lg:gap-12 flex flex-col items-center">
        <h2 className="font-bold text-lg md:text-xl xl:text-2xl">
          Meet the team!
        </h2>
        <div className="flex justify-center">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

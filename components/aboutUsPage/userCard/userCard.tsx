"use client";

import type { User } from "../aboutUsPage";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return <h1>User Card</h1>;
}

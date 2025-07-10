"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import SubmitButton from "../utils/button";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { user, login } = useAuth();

  const hasAlerted = useRef(false);

  useEffect(() => {
    if (user && !hasAlerted.current) {
      hasAlerted.current = true;
      alert("You're already signed in.");
      router.push("/");
    }
  }, [user, router]);

  if (user) return null;

  const handleLogin = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      login(data.user);
      router.push("/");
    } else {
      const errorData = await res.json();
      setError(errorData.message || "Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 px-4 py-8 sm:py-12 md:py-16">
      <h1 className="text-center text-xl md:text-2xl lg:text-3xl font-bold">
        Admin Login
      </h1>
      <div className="w-full max-w-[768px] flex flex-col gap-6 py-8 sm:py-12 md:py-16 items-center justify-center">
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-tw-grey p-3 focus:outline-none focus:ring-1 focus:ring-tw-grey focus:shadow-lg"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-tw-grey p-3 focus:outline-none focus:ring-1 focus:ring-tw-grey focus:shadow-lg"
        />
        <SubmitButton type="submit" onClick={handleLogin} name="Login" />
        {error && (
          <p className="text-tw-dark-red sm:text-lg lg:text-xl">{error}</p>
        )}
      </div>
    </div>
  );
}

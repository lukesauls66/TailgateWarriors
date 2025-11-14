"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import SubmitButton from "../utils/Button";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { user, login } = useAuth();

  useEffect(() => {
    if (user) {
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
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-tw-grey p-3 pr-12 focus:outline-none focus:ring-1 focus:ring-tw-grey focus:shadow-lg"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-tw-grey hover:text-tw-dark-grey transition-colors duration-200 hover:cursor-pointer"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible className="w-5 h-5" />
            ) : (
              <AiOutlineEye className="w-5 h-5" />
            )}
          </button>
        </div>
        <SubmitButton type="submit" onClick={handleLogin} name="Login" />
        {error && (
          <p className="text-tw-dark-red sm:text-lg lg:text-xl">{error}</p>
        )}
      </div>
    </div>
  );
}

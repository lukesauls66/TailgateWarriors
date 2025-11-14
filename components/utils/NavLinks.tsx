"use client";

import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";

interface NavLinksProps {
  toggleSidebar?: () => void;
}

export default function NavLinks({ toggleSidebar }: NavLinksProps) {
  const { user, logout } = useAuth();
  return (
    <>
      <Link
        href="/photos"
        onClick={toggleSidebar}
        className="text-white hover:text-red transition-colors duration-200"
      >
        Photos
      </Link>
      <Link
        href="/tailgate-schedule"
        onClick={toggleSidebar}
        className="text-white hover:text-red transition-colors duration-200"
      >
        Schedule
      </Link>
      <Link
        href="/locate-us"
        onClick={toggleSidebar}
        className="text-white hover:text-red transition-colors duration-200"
      >
        Locate Us
      </Link>
      <Link
        href="/about-us"
        onClick={toggleSidebar}
        className="text-white hover:text-red transition-colors duration-200"
      >
        About Us
      </Link>
      <Link
        href="/charities"
        onClick={toggleSidebar}
        className="text-white hover:text-red transition-colors duration-200"
      >
        Charities
      </Link>
      <Link
        href="/FAQ"
        onClick={toggleSidebar}
        className="text-white hover:text-red transition-colors duration-200"
      >
        FAQ
      </Link>
      {!user ? (
        <Link
          href="/admin-login"
          onClick={toggleSidebar}
          className="text-white hover:text-red transition-colors duration-200"
        >
          Admin
        </Link>
      ) : (
        <button
          onClick={() => {
            logout();
            if (toggleSidebar) toggleSidebar();
            alert("Logged out successfully");
          }}
          className="text-white hover:text-red hover:cursor-pointer transition-colors duration-200"
        >
          Logout
        </button>
      )}
    </>
  );
}

"use client";

import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import Sidebar from "../sidebar";

export default function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="block lg:hidden relative text-white">
      <button
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
        className="flex flex-col justify-center items-center w-8 h-8 lg:w-[2.5rem] lg:h-[2.5rem] xl:w-[3rem] xl:h-[3rem] space-y-1 z-50"
      >
        <RxHamburgerMenu className="w-8 h-8 lg:w-[2.5rem] lg:h-[2.5rem] xl:w-[3rem] xl:h-[3rem] " />
      </button>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
}

import Link from "next/link";
import Hamburger from "./hamburger";
import NavLinks from "@/components/utils/NavLinks";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-4 px-4 sm:px-6 md:px-8 xl:px-16 bg-tw-red">
      <Link
        href="/"
        className="text-2xl font-bold text-tw-red hover:text-red transition-colors duration-200"
      >
        <img
          src="/tw-logo-no-bg.PNG"
          alt="Tailgate Warriors Logo"
          className="h-[3.5rem] w-[4.5rem] sm:h-[4.5rem] sm:w-[6rem] md:h-[5.5rem] md:w-[8rem] lg:h-[7rem] lg:w-[10rem]"
        />
      </Link>
      <Hamburger />
      <div className="hidden lg:flex gap-12 text-lg 2xl:text-xl">
        <NavLinks />
      </div>
    </nav>
  );
}

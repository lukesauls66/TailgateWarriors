import Link from "next/link";

interface NavLinksProps {
  toggleSidebar?: () => void;
}

export default function NavLinks({ toggleSidebar }: NavLinksProps) {
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
      <Link
        href="/admin-login"
        onClick={toggleSidebar}
        className="text-white hover:text-red transition-colors duration-200"
      >
        Admin
      </Link>
    </>
  );
}

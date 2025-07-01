import Link from "next/link";

export default function NavLinks() {
  return (
    <>
      <Link
        href="/photos"
        className="text-white hover:text-red transition-colors duration-200"
      >
        Photos
      </Link>
      <Link
        href="/tailgate-schedule"
        className="text-white hover:text-red transition-colors duration-200"
      >
        Schedule
      </Link>
      <Link
        href="/locate-us"
        className="text-white hover:text-red transition-colors duration-200"
      >
        Locate Us
      </Link>
      <Link
        href="/about-us"
        className="text-white hover:text-red transition-colors duration-200"
      >
        About Us
      </Link>
      <Link
        href="/charities"
        className="text-white hover:text-red transition-colors duration-200"
      >
        Charities
      </Link>
      <Link
        href="/FAQ"
        className="text-white hover:text-red transition-colors duration-200"
      >
        FAQ
      </Link>
      <Link
        href="/admin-login"
        className="text-white hover:text-red transition-colors duration-200"
      >
        Admin
      </Link>
    </>
  );
}

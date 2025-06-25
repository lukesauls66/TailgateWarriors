import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-tw-red flex flex-col items-center justify-center text-white p-8 sm:p-10 md:p-12 lg:p-14 text-sm sm:text-base xl:text-lg gap-8">
      <p className="text-center">
        Copyright © 2025 Tailgate Warriors - All Rights Reserved.
      </p>
      <Link href="/privacy-policy">PRIVACY POLICY</Link>
      <p>TikTok</p>
    </footer>
  );
}

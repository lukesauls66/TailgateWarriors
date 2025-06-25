import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  return (
    <aside>
      <div
        className={`fixed top-0 right-0 h-full bg-tw-red text-lg md:text-xl xl:text-3xl font-bold transition-transform duration-300 ${
          isOpen ? "transform translate-x-0" : "transform translate-x-full"
        } w-[11rem] sm:w-[15rem] md:w-[18rem] xl:w-[24rem] py-4 px-2 md:py-[3rem] md:px-4 z-40`}
      >
        <div className="flex flex-col items-center justify-between h-full">
          {/* <div className="flex flex-col items-center justify-between py-8 h-full"> */}
          <div className="flex flex-col items-center justify-between py-8 gap-14">
            <Link
              href="/"
              onClick={toggleSidebar}
              className="text-white hover:text-red hover:scale-110 transition-transform duration-200"
            >
              Home
            </Link>
            <Link
              href="/photos"
              onClick={toggleSidebar}
              className="text-white hover:text-red hover:scale-110 transition-transform duration-200"
            >
              Photos
            </Link>
            <Link
              href="/game-day-countdown"
              onClick={toggleSidebar}
              className="text-white hover:text-red hover:scale-110 transition-transform duration-200"
            >
              Countdown
            </Link>
            <Link
              href="/tailgate-schedule"
              onClick={toggleSidebar}
              className="text-white hover:text-red hover:scale-110 transition-transform duration-200"
            >
              Schedule
            </Link>
            <Link
              href="/locate-us"
              onClick={toggleSidebar}
              className="text-white hover:text-red hover:scale-110 transition-transform duration-200"
            >
              Locate Us
            </Link>
            <Link
              href="/FAQ"
              onClick={toggleSidebar}
              className="text-white hover:text-red hover:scale-110 transition-transform duration-200"
            >
              FAQ
            </Link>
          </div>
          <p className="pb-8">TikTok</p>
        </div>
      </div>
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 z-30"
        />
      )}
    </aside>
  );
}

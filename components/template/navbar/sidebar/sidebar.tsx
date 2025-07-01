import NavLinks from "@/components/utils/NavLinks";
import { AiFillTikTok } from "react-icons/ai";

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
        } w-[11rem] sm:w-[15rem] md:w-[18rem] xl:w-[24rem] py-4 px-2 md:px-4 z-40`}
      >
        <div className="flex flex-col items-center justify-between h-full">
          <div className="flex flex-col items-center justify-between py-4 gap-14">
            <NavLinks toggleSidebar={toggleSidebar} />
          </div>
          <AiFillTikTok className="text-[35px] md:text-[40px]" />
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

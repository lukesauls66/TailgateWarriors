import { FaChevronDown } from "react-icons/fa";
import { FAQ } from "@/types";

interface CollapsibleFAQProps {
  faq: FAQ;
  isOpen: boolean;
  toggleFAQ: (id: string) => void;
}

export default function CollapsibleFAQ({
  faq,
  isOpen,
  toggleFAQ,
}: CollapsibleFAQProps) {
  return (
    <div className="bg-white rounded shadow overflow-hidden">
      <button
        onClick={() => toggleFAQ(faq.id)}
        className="w-full flex justify-between items-center p-4 font-medium text-left text-lg sm:text-xl lg:text-2xl hover:bg-gray-50"
      >
        <span className="flex-grow text-left">{faq.question}</span>
        <div className="w-5 h-5 flex items-center justify-center shrink-0">
          <FaChevronDown
            className={`size-4 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>
      {isOpen && (
        <div className="p-4 text-tw-grey sm:text-lg lg:text-xl">
          {faq.answer}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import ContactSection from "../utils/contactSection";
import CollapsibleFAQ from "./collapsibleFAQ";
import { FAQ } from "@/types";

interface FAQPageProps {
  FAQs: FAQ[];
}

export default function FAQPage({ FAQs }: FAQPageProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen pb-4 pt-4 md:pt-8 lg:pt-12">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">FAQs</h1>
      <div className="w-full max-w-4xl space-y-4 p-4 sm:px-8 md:px-12">
        {FAQs.map((faq) => {
          const isOpen = faq.id === openId;

          return (
            <CollapsibleFAQ
              key={faq.id}
              faq={faq}
              isOpen={isOpen}
              toggleFAQ={toggleFAQ}
            />
          );
        })}
      </div>
      <ContactSection />
    </main>
  );
}

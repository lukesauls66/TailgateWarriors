import FAQPage from "@/components/FAQPage";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/FAQ`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch FAQs");
  }

  const faqs = await res.json();

  return <FAQPage FAQs={faqs} />;
}

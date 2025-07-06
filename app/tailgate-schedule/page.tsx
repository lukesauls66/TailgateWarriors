import TailgateSchedulePage from "@/components/tailgateSchedulePage";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/game`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch game data");
  }

  const games = await res.json();
  return <TailgateSchedulePage games={games} />;
}

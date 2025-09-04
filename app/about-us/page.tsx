import AboutUsPage from "@/components/aboutUsPage";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }

  const users = await res.json();

  return <AboutUsPage users={users} />;
}

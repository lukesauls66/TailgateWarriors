import PhotosPage from "@/components/photosPage";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pictures`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch photos");
  }

  const photos = await res.json();

  return <PhotosPage photos={photos} />;
}

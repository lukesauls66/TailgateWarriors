"use client";

export type Photo = {
  id: string;
  url: string;
  category: string;
};

interface PhotosPageProps {
  photos: Photo[];
}

export default function PhotosPage({ photos }: PhotosPageProps) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 lg:p-12 gap-4 md:gap-8 lg:gap-12">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center">
        Photos
      </h1>
    </main>
  );
}

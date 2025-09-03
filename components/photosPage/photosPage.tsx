"use client";

import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import Button from "../utils/Button";
import PhotoModal from "./photoModal";

export type Photo = {
  id: string;
  url: string;
  category: string;
  season: string;
};

interface PhotosPageProps {
  photos: Photo[];
}

export default function PhotosPage({ photos }: PhotosPageProps) {
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [photoState, setPhotoState] = useState<Photo[]>(photos);
  const [categoryFilter, setCategoryFilter] = useState<string | "All">("All");
  const [seasonFilter, setSeasonFilter] = useState<string | "All">("All");
  const { user } = useAuth();

  const handleAddPhoto = (newPhoto: Photo) => {
    setPhotoState((prev) => [newPhoto, ...prev]);
  };

  const arePhotos = photoState && photoState.length > 0;

  const filteredPhotos = photoState.filter((photo) => {
    return (
      (categoryFilter === "All" || photo.category === categoryFilter) &&
      (seasonFilter === "All" || photo.season === seasonFilter)
    );
  });

  const seasons = [
    "Season2025",
    "Season2024",
    "Season2023",
    "Season2022",
    "Season2021",
    "Season2020",
    "Season2019",
    "Season2018",
    "Season2017",
    "Season2016",
    "Season2015",
  ];

  return (
    <main className="flex flex-col items-center min-h-screen p-4 md:p-8 lg:p-12 gap-4 md:gap-8 lg:gap-12">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center">
        Photos
      </h1>
      {user && (
        <div>
          <Button
            onClick={() => setIsCreateOpen(true)}
            name="Add Photo"
            width="w-[6rem] md:w-[8rem]"
          />
        </div>
      )}

      {arePhotos && (
        <div className="flex gap-4">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border p-2 rounded w-[8rem] md:w-[10rem]"
          >
            <option value="All">Categories</option>
            <option value="Home">Home</option>
            <option value="Away">Away</option>
          </select>

          <select
            value={seasonFilter}
            onChange={(e) => setSeasonFilter(e.target.value)}
            className="border p-2 rounded w-[8rem] md:w-[10rem]"
          >
            <option value="All">Seasons</option>
            {seasons.map((season) => (
              <option key={season} value={season}>
                {season}
              </option>
            ))}
          </select>
        </div>
      )}

      {!filteredPhotos.length ? (
        <p className="md:text-lg xl:text-xl">No photos available</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {photoState.map((photo) => (
            <div key={photo.id} className="relative group">
              <img
                src={photo.url}
                alt={photo.category}
                className="w-full h-[20rem] md:[30rem] rounded-lg"
              />
              {user && (
                <button
                  onClick={async () => {
                    try {
                      const res = await fetch(`/api/pictures/${photo.id}`, {
                        method: "DELETE",
                      });
                      if (!res.ok) throw new Error("Failed to delete");
                      setPhotoState((prev) =>
                        prev.filter((p) => p.id !== photo.id)
                      );
                    } catch (err) {
                      console.error(err);
                      alert("Failed to delete photo");
                    }
                  }}
                  className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      <PhotoModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onAddPhoto={handleAddPhoto}
        user={user}
      />
    </main>
  );
}

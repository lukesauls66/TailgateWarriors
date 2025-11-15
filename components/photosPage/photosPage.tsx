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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { user } = useAuth();

  const PHOTOS_PER_PAGE = 20;

  const handleAddPhotos = (newPhotos: Photo[]) => {
    setPhotoState((prev) => [...newPhotos, ...prev]);
  };

  const arePhotos = photoState && photoState.length > 0;

  const filteredPhotos = photoState.filter((photo) => {
    return (
      (categoryFilter === "All" || photo.category === categoryFilter) &&
      (seasonFilter === "All" || photo.season === seasonFilter)
    );
  });

  const totalPages = Math.ceil(filteredPhotos.length / PHOTOS_PER_PAGE);
  const startIndex = (currentPage - 1) * PHOTOS_PER_PAGE;
  const endIndex = startIndex + PHOTOS_PER_PAGE;
  const currentPhotos = filteredPhotos.slice(startIndex, endIndex);

  const handleFilterChange = (
    filterType: "category" | "season",
    value: string
  ) => {
    if (filterType === "category") {
      setCategoryFilter(value);
    } else {
      setSeasonFilter(value);
    }
    setCurrentPage(1);
  };

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

  const formatSeasonDisplay = (season: string) => {
    return season.replace("Season", "") + " Season";
  };

  return (
    <main className="flex flex-col items-center min-h-screen p-4 md:p-8 lg:p-12 gap-4 md:gap-8 lg:gap-12">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center">
        Photos
      </h1>
      {user && (
        <div>
          <Button
            onClick={() => setIsCreateOpen(true)}
            name="Add Photos"
            width="w-[7rem] md:w-[9rem]"
          />
        </div>
      )}

      {arePhotos && (
        <div className="flex gap-4">
          <select
            value={categoryFilter}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 rounded-lg w-[8rem] md:w-[10rem] focus:outline-none focus:ring-2 focus:ring-tw-red focus:border-tw-red transition-colors"
          >
            <option value="All">All Categories</option>
            <option value="Home">Home</option>
            <option value="Away">Away</option>
          </select>

          <select
            value={seasonFilter}
            onChange={(e) => handleFilterChange("season", e.target.value)}
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 rounded-lg w-[8rem] md:w-[10rem] focus:outline-none focus:ring-2 focus:ring-tw-red focus:border-tw-red transition-colors"
          >
            <option value="All">All Seasons</option>
            {seasons.map((season) => (
              <option key={season} value={season}>
                {formatSeasonDisplay(season)}
              </option>
            ))}
          </select>
        </div>
      )}

      {!filteredPhotos.length ? (
        <p className="md:text-lg xl:text-xl">No photos available</p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {currentPhotos.map((photo) => (
              <div key={photo.id} className="relative group">
                <img
                  src={photo.url}
                  alt={photo.category}
                  className="w-full h-[15rem] md:h-[25rem] rounded-lg"
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

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
              >
                Previous
              </button>

              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => {
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-2 border rounded-lg transition-colors ${
                            currentPage === page
                              ? "bg-tw-red text-white border-tw-red"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <span key={page} className="px-2 py-2">
                          ...
                        </span>
                      );
                    }
                    return null;
                  }
                )}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
              >
                Next
              </button>
            </div>
          )}

          <div className="text-center text-gray-600 mt-4">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredPhotos.length)}{" "}
            of {filteredPhotos.length} photos
          </div>
        </>
      )}
      <PhotoModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onAddPhoto={handleAddPhotos}
        user={user}
      />
    </main>
  );
}

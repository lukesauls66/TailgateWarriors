"use client";

import { useState } from "react";
import Modal from "@/components/utils/Modal";
import type { Photo } from "../photosPage";
import type { User } from "@/app/context/AuthContext";

interface PhotoModalsProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPhoto: (photos: Photo[]) => void;
  user: User | null;
}

interface PhotoUpload {
  file: File;
  category: (typeof categories)[number];
  season: (typeof seasons)[number];
}

const categories = ["Home", "Away"] as const;
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
] as const;

const formatSeasonDisplay = (season: string) => {
  return season.replace("Season", "") + " Season";
};

export default function PhotoModal({
  isOpen,
  onClose,
  onAddPhoto,
  user,
}: PhotoModalsProps) {
  const [photoUploads, setPhotoUploads] = useState<PhotoUpload[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    setPhotoUploads((prev) => {
      const remainingSlots = 10 - prev.length;
      const newFiles = files.slice(0, remainingSlots);

      const newUploads: PhotoUpload[] = newFiles.map((file) => ({
        file,
        category: categories[0],
        season: seasons[0],
      }));

      return [...prev, ...newUploads];
    });

    // Clear the input so the same files can be selected again if needed
    e.target.value = "";
  };

  const clearAllPhotos = () => {
    setPhotoUploads([]);
  };

  const updatePhotoUpload = (
    index: number,
    field: "category" | "season",
    value: string
  ) => {
    setPhotoUploads((prev) =>
      prev.map((upload, i) =>
        i === index ? { ...upload, [field]: value } : upload
      )
    );
  };

  const removePhotoUpload = (index: number) => {
    setPhotoUploads((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (photoUploads.length === 0) return;

    setLoading(true);
    try {
      const uploadPromises = photoUploads.map(async (upload) => {
        const formData = new FormData();
        formData.append("image", upload.file);
        formData.append("category", upload.category);
        formData.append("season", upload.season);
        formData.append("userId", user?.id || "");

        const res = await fetch("/api/pictures", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error(`Upload failed for ${upload.file.name}`);
        return await res.json();
      });

      const newPhotos: Photo[] = await Promise.all(uploadPromises);
      onAddPhoto(newPhotos);
      onClose();
      setPhotoUploads([]);
    } catch (err) {
      console.error(err);
      alert("Failed to upload one or more photos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <h2 className="font-bold text-lg md:text-xl xl:text-2xl mb-4">
          Add Photos (Max 10)
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium">
                Select Photos ({photoUploads.length}/10):
              </label>
              {photoUploads.length > 0 && (
                <button
                  type="button"
                  onClick={clearAllPhotos}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Clear All
                </button>
              )}
            </div>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                id="photo-upload"
                disabled={photoUploads.length >= 10}
              />
              <label
                htmlFor="photo-upload"
                className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg transition-colors ${
                  photoUploads.length >= 10
                    ? "border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
                    : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                }`}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className={`w-8 h-8 mb-4 ${
                      photoUploads.length >= 10
                        ? "text-gray-300 dark:text-gray-600"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p
                    className={`mb-2 text-sm ${
                      photoUploads.length >= 10
                        ? "text-gray-400 dark:text-gray-500"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {photoUploads.length >= 10 ? (
                      <span>Maximum 10 photos selected</span>
                    ) : (
                      <>
                        <span className="font-semibold">
                          Click to add more photos
                        </span>{" "}
                        or drag and drop
                      </>
                    )}
                  </p>
                  <p
                    className={`text-xs ${
                      photoUploads.length >= 10
                        ? "text-gray-400 dark:text-gray-500"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {photoUploads.length >= 10
                      ? "Remove photos to add more"
                      : `${
                          10 - photoUploads.length
                        } slots remaining • PNG, JPG, JPEG`}
                  </p>
                </div>
              </label>
            </div>
          </div>

          {photoUploads.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Configure each photo:</h3>
              <div className="grid gap-4 max-h-60 overflow-y-auto">
                {photoUploads.map((upload, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 dark:border-gray-600 rounded-lg p-3 bg-gray-50 dark:bg-gray-700"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium truncate">
                            {upload.file.name}
                          </span>
                          <button
                            type="button"
                            onClick={() => removePhotoUpload(index)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            ✕
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <select
                            value={upload.category}
                            onChange={(e) =>
                              updatePhotoUpload(
                                index,
                                "category",
                                e.target.value
                              )
                            }
                            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-1 rounded text-sm"
                          >
                            {categories.map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>

                          <select
                            value={upload.season}
                            onChange={(e) =>
                              updatePhotoUpload(index, "season", e.target.value)
                            }
                            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-1 rounded text-sm"
                          >
                            {seasons.map((s) => (
                              <option key={s} value={s}>
                                {formatSeasonDisplay(s)}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || photoUploads.length === 0}
            className="bg-tw-red hover:bg-tw-dark-red hover:cursor-pointer text-background font-semibold p-4 border-b-tw-dark-red border-b-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? `Uploading ${photoUploads.length} photos...`
              : `Upload ${photoUploads.length} Photos`}
          </button>
        </form>
      </div>
    </Modal>
  );
}

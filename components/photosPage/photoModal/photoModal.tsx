"use client";

import { useState } from "react";
import Modal from "@/components/utils/Modal";
import type { Photo } from "../photosPage";
import type { User } from "@/app/context/AuthContext";

interface PhotoModalsProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPhoto: (photo: Photo) => void;
  user: User | null;
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

export default function PhotoModal({
  isOpen,
  onClose,
  onAddPhoto,
  user,
}: PhotoModalsProps) {
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState<(typeof categories)[number]>(
    categories[0]
  );
  const [season, setSeason] = useState<(typeof seasons)[number]>(seasons[0]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("category", category);
      formData.append("season", season);
      formData.append("userId", user?.id || "");

      const res = await fetch("/api/pictures", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      const newPhoto: Photo = await res.json();

      onAddPhoto(newPhoto);
      onClose();
      setFile(null);
      setCategory(categories[0]);
      setSeason(seasons[0]);
    } catch (err) {
      console.error(err);
      alert("Failed to upload photo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="font-bold text-lg md:text-xl xl:text-2xl">Add Photo</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
          className="cursor-pointer"
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value as (typeof categories)[number])
          }
          className="border p-2 rounded"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={season}
          onChange={(e) =>
            setSeason(e.target.value as (typeof seasons)[number])
          }
          className="border p-2 rounded"
        >
          {seasons.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-tw-red hover:bg-tw-dark-red hover:cursor-pointer text-background font-semibold p-4 border-b-tw-dark-red border-b-4"
        >
          {loading ? "Uploading..." : "Add"}
        </button>
      </form>
    </Modal>
  );
}

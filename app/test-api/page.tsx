"use client";

import { useState } from "react";

export default function UploadForm() {
  const [image, setImage] = useState<File | null>(null);
  const [category, setCategory] = useState("Home");
  const userId = "6862ec5e5d61f8ec387dc286";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("category", category);
    formData.append("userId", userId);

    const res = await fetch("/api/pictures", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("Upload result:", data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Home">Home</option>
        <option value="Away">Away</option>
      </select>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Upload
      </button>
    </form>
  );
}

"use client";

import { useState } from "react";
import SubmitButton from "@/components/utils/Button";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface AttachmentInfo {
  url: string;
  fileName: string;
  fileSize: number;
  contentType: string;
}

export default function MessageForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadedAttachments, setUploadedAttachments] = useState<
    AttachmentInfo[]
  >([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const uploadFiles = async (): Promise<AttachmentInfo[]> => {
    if (selectedFiles.length === 0) return [];

    setIsUploading(true);
    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to upload files");
      }

      return result.files;
    } catch (error) {
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // Upload files first if any are selected
      let attachments: AttachmentInfo[] = [];
      if (selectedFiles.length > 0) {
        attachments = await uploadFiles();
      }

      // Send the contact form with attachments
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          attachments,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: `Message sent successfully! ${
            attachments.length > 0
              ? `${attachments.length} file${
                  attachments.length > 1 ? "s" : ""
                } attached. `
              : ""
          }We'll get back to you soon.`,
        });
        setFormData({ name: "", email: "", message: "" });
        setSelectedFiles([]);
        setUploadedAttachments([]);
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error: any) {
      setSubmitStatus({
        type: "error",
        message:
          error.message ||
          "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center bg-background text-foreground w-full lg:w-1/2 max-w-[1024px] gap-4">
      <h4 className="font-bold lg:text-xl">Send Message</h4>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
        <div className="w-full">
          <label htmlFor="name" className="sr-only">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="w-full border border-tw-grey p-3 focus:outline-none focus:ring-1 focus:ring-tw-grey focus:shadow-lg"
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="w-full">
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full border border-tw-grey p-3 focus:outline-none focus:ring-1 focus:ring-tw-grey focus:shadow-lg"
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="w-full">
          <label htmlFor="message" className="sr-only">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Message"
            className="w-full border border-tw-grey p-3 focus:outline-none focus:ring-1 focus:ring-tw-grey focus:shadow-lg"
            rows={8}
            required
            disabled={isSubmitting}
          ></textarea>
        </div>

        <div className="w-full">
          <label
            htmlFor="attachments"
            className="block text-sm font-medium mb-2"
          >
            Attachments (Optional)
          </label>
          <input
            type="file"
            id="attachments"
            multiple
            onChange={handleFileChange}
            className="w-full border border-tw-grey p-3 focus:outline-none focus:ring-1 focus:ring-tw-grey focus:shadow-lg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-tw-red file:text-white hover:file:bg-tw-dark-red"
            accept="image/*,.pdf,.doc,.docx,.txt,.xls,.xlsx"
            disabled={isSubmitting || isUploading}
          />
          <p className="text-xs text-gray-600 mt-1">
            Accepted files: Images, PDF, Word docs, Excel files, text files (Max
            10MB each)
          </p>

          {selectedFiles.length > 0 && (
            <div className="mt-3 space-y-2">
              <p className="text-sm font-medium">Selected Files:</p>
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-background border border-tw-grey p-2 rounded"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium truncate text-foreground">
                      {file.name}
                    </p>
                    <p className="text-xs text-foreground/70">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="ml-2 text-red-500 hover:text-red-700 font-bold"
                    disabled={isSubmitting || isUploading}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {submitStatus.message && (
          <div
            className={`p-3 rounded-md text-center ${
              submitStatus.type === "success"
                ? "bg-green-100 text-green-800 border border-green-300"
                : "bg-red-100 text-red-800 border border-red-300"
            }`}
          >
            {submitStatus.message}
          </div>
        )}
        <SubmitButton
          type="submit"
          name={
            isUploading
              ? "UPLOADING FILES..."
              : isSubmitting
              ? "SENDING..."
              : "SEND"
          }
          disabled={isSubmitting || isUploading}
        />
      </form>
    </section>
  );
}

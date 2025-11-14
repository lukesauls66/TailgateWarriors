"use client";

import { useState } from "react";
import SubmitButton from "@/components/utils/Button";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function MessageForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Message sent successfully! We'll get back to you soon.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
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

        <p className="text-center text-tw-dark-red text-lg">
          Attachments Coming Soon
        </p>
        <SubmitButton
          type="submit"
          name={isSubmitting ? "SENDING..." : "SEND"}
          disabled={isSubmitting}
        />
      </form>
    </section>
  );
}

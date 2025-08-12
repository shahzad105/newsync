"use client";

import { useActionState, useRef, useState } from "react";
import { useFormState } from "react-dom";
import SubmitButton from "./SubmitButton";

export default function EditArticleForm({ action, article }) {
  const [state, formAction] = useActionState(action, {
    success: null,
    message: "",
  });
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(article.image?.url || "");
  const [imageBase64, setImageBase64] = useState("");
  const handleFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setImageBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };
  const handleDragOver = (e) => e.preventDefault();
  const categories = [
    "Tech",
    "Startups",
    "Youth",
    "Innovation",
    "Business",
    "Finance",
    "Sports",
    "Entertainment",
    "Education",
    "Politics",
    "Economy",
    "Health",
    "Lifestyle",
    "Science",
    "AI & Machine Learning",
    "Cybersecurity",
    "Freelancing",
    "Jobs & Careers",
    "Women in Tech",
    "Opinion",
    "Interviews",
    "Events",
    "Web3 & Blockchain",
    "Apps & Gadgets",
    "Fashion",
    "National",
    "International",
    "Environment",
    "Social Impact",
    "Productivity",
    "Culture",
    "Travel",
    "Food",
    "Gaming",
    "Auto",
    "Real Estate",
    "Art & Design",
    "HealthTech",
    "EdTech",
    "FinTech",
    "E-commerce",
    "Digital Marketing",
    "Content Creation",
    "Startups & Entrepreneurship",
    "Nonprofits",
    "Defence",
    "Space",
    "Astronomy",
  ];
  return (
    <form
      action={(formData) => {
        if (imageBase64) {
          formData.delete("image");
          formData.set("image", imageBase64);
        } else {
          formData.set("image", article.image?.url || "");
        }
        formAction(formData);
      }}
      className="max-w-4xl mx-auto p-4 space-y-8"
    >
      {/* Image upload */}
      <div>
        <label className="block mb-1 font-medium">Feature Image (PNG)</label>
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="h-56 border-dashed border bg-gray-50 flex items-center justify-center cursor-pointer hover:bg-gray-100"
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400">Click or drop PNG image here</span>
          )}
        </div>
        <input
          type="file"
          accept="image/png"
          name="image"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />
      </div>

      {/* Title */}
      <div>
        <label className="block mb-1 font-medium">Title</label>
        <input
          name="title"
          type="text"
          defaultValue={article.title}
          placeholder="Enter article title"
          className="w-full border-b py-1 focus:outline-none"
          required
        />
      </div>

      {/* Category */}
      <div>
        <label className="block mb-1 font-medium">Category</label>
        <select
          name="category"
          defaultValue={article.category}
          className="w-full py-2 border rounded focus:ring-1 focus:ring-blue-500"
          required
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Body */}
      <div>
        <label className="block mb-1 font-medium">Article Body</label>
        <textarea
          name="description"
          rows={8}
          defaultValue={article.description}
          placeholder="Write your article..."
          className="w-full border p-2 rounded resize-none focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>

      {/* Submit */}
      <SubmitButton loading="Updating..." title="Update Article" />
      {/* Feedback message */}
      {state.message && (
        <div
          className={`pt-2S rounded text-sm ${
            state.success
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {state.message}
        </div>
      )}
    </form>
  );
}

"use client";

import { useActionState, useRef, useState } from "react";
import dynamic from "next/dynamic";
import SubmitButton from "./SubmitButton";

// Dynamically import ReactQuill to prevent SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

export default function EditArticleForm({ action, article }) {
  const [state, formAction] = useActionState(action, {
    success: null,
    message: "",
  });

  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(article.image?.url || "");
  const [imageBase64, setImageBase64] = useState("");
  const [body, setBody] = useState(article.description || "");

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
    "ai",
    "machine learning",
    "blockchain",
    "startups",
    "entrepreneurship",
    "freelancing",
    "jobs",
    "careers",
    "technology",
    "apps",
    "youth",
    "productivity",
    "lifestyle",
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
        formData.set("description", body); // send rich text body
        formAction(formData);
      }}
      className="max-w-4xl mx-auto p-6 space-y-8  rounded-xl shadow-md"
    >
      {/* Image upload */}
      <div>
        <label className="block mb-2 font-semibold text-gray-800">
          Feature Image (PNG)
        </label>
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="h-56 border-2 border-dashed rounded-xl bg-gray-50 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition"
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <span className="text-gray-400">
              Click or drag & drop PNG image here
            </span>
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
        <label className="block mb-2 font-semibold text-gray-800">Title</label>
        <input
          name="title"
          type="text"
          defaultValue={article.title}
          placeholder="Enter article title"
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>

      {/* Category */}
      <div>
        <label className="block mb-2 font-semibold text-gray-800">
          Category
        </label>
        <select
          name="category"
          defaultValue={article.category}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Body (Quill Editor) */}
      <div>
        <label className="block mb-2 font-semibold text-gray-800">
          Article Body
        </label>
        <ReactQuill
          theme="snow"
          value={body}
          onChange={setBody}
          className="custom-editor rounded-lg border min-h-[250px]"
        />
      </div>

      {/* Submit */}
      <SubmitButton loading="Updating..." title="Update Article" />

      {/* Feedback */}
      {state.message && (
        <div
          className={`p-3 mt-4 rounded-lg text-sm ${
            state.success
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {state.message}
        </div>
      )}
    </form>
  );
}

"use client";

import { useActionState, useRef, useState } from "react";
import dynamic from "next/dynamic";
import SubmitButton from "./SubmitButton";
import "react-quill-new/dist/quill.snow.css";

// Dynamically import ReactQuill (fixes Next.js SSR issues)
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

// Quill toolbar
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    ["link", "image", "video"],
    [{ align: [] }, { color: [] }, { background: [] }],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "blockquote",
  "code-block",
  "link",
  "image",
  "video",
  "align",
  "color",
  "background",
];

export default function AddArticleForm({ action }) {
  const [state, formAction] = useActionState(action, {
    success: null,
    message: "",
  });

  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [body, setBody] = useState("");

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
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      {/* SUCCESS / ERROR MESSAGE */}
      <form
        action={(formData) => {
          formData.set("image", imageBase64);
          formData.set("description", body); // ✅ send quill content instead of textarea
          formAction(formData);
        }}
        className="space-y-8"
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
              <span className="text-gray-400">
                Click or drop PNG image here
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
          <label className="block mb-1 font-medium">Title</label>
          <input
            name="title"
            type="text"
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
            className="w-full py-2 border rounded focus:ring-1 focus:ring-blue-500"
            required
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category.charAt(0).toUpperCase() +
                  category.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Article Body</label>
          <ReactQuill
            theme="snow"
            value={body}
            onChange={setBody}
            modules={modules}
            formats={formats}
            className="w-full  rounded bg-white custom-editor"
            placeholder="Write your article..."
          />
        </div>

        {/* Submit */}
        <SubmitButton loading={"Publishing.."} title={"Publish Article"} />
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
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import { useAddArticle } from "@/hooks/useAddArticle";
import toast from "react-hot-toast";

export default function AddArticleForm() {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Tech");
  const [body, setBody] = useState("");

  const { mutateAsync, isPending } = useAddArticle();

  const handleFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
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

  const handleSubmit = async () => {
    if (!title || !category || !body || !preview) {
      toast.error("All fields plus an image are required.");
      return;
    }

    try {
      await mutateAsync({
        title,
        category,
        description: body,
        image: preview,
      });
      toast.success("Article published!");

      setTitle("");
      setCategory("Tech");
      setBody("");
      setPreview("");
    } catch (error) {
      toast.error(error.message || "Failed to publish");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">Publish New Article</h1>

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
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter article title"
          className="w-full border-b py-1 focus:outline-none"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full py-2 border rounded focus:ring-1 focus:ring-blue-500"
        >
          {[
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
            "Policy",
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
          ].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Article Body</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={8}
          placeholder="Write your article..."
          className="w-full border p-2 rounded resize-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={isPending}
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
      >
        {isPending ? "Publishing..." : "Publish Article"}
      </button>
    </div>
  );
}

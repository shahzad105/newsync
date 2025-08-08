"use client";
import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import { updateArticleAction } from "@/lib/actions/updateArticle";
import Loader from "@/components/Loader";
import { getArticle } from "@/lib/actions/getArticle";

export default function EditArticlePage() {
  const params = useParams();
  const slug = params.slug;
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

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
  ];

  // Fetch article details
  useEffect(() => {
    async function fetchArticle() {
      try {
        setLoading(true);
        const res = await getArticle(slug);

        const data = res.article;
        if (data) {
          setTitle(data.title || "");
          setCategory(data.category || "");
          setDescription(data.description || "");
          setPreview(data.image?.url || "");
        }
      } catch (err) {
        toast.error("Failed to fetch article");
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [slug]);

  const handleImageClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      fileInputRef.current.value = "";
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !category || !description || !preview) {
      toast.error("Please fill all fields and upload an image.");
      return;
    }
    setUpdating(true);
    try {
      const result = await updateArticleAction({
        slug,
        updatedData: { title, category, description, image: preview },
      });
      if (result.success) {
        toast.success("Article updated successfully!");
        router.push(`/post/${slug}`);
      } else {
        toast.error(result.message || "Failed to update article");
      }
    } catch (err) {
      toast.error("Error updating article");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto md:px-4 p-1 py-12"
    >
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        Edit Article
      </h1>

      {/* Image Upload */}
      <div
        onClick={handleImageClick}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="mb-6 w-full h-72 border border-dashed border-gray-400 bg-gray-50 hover:bg-gray-100 transition cursor-pointer flex items-center justify-center overflow-hidden relative"
      >
        {preview ? (
          <Image src={preview} alt="Preview" fill className="object-cover" />
        ) : (
          <div className="text-center text-gray-400">
            <Image
              src="/upload.jpg"
              alt="Upload"
              width={56}
              height={56}
              className="mx-auto opacity-70 mb-2"
            />
            <p className="text-sm">
              Click or drag & drop to upload PNG/JPG image
            </p>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Title */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter article title"
          className="w-full border-b border-gray-300 focus:border-black text-lg px-1 py-2 outline-none transition"
        />
      </div>

      {/* Category */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-white border border-gray-300 px-4 py-2 text-sm rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div className="mb-10">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Article Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write your article here..."
          className="w-full border border-gray-300 px-4 py-3 rounded-lg text-sm min-h-[200px] resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={updating}
          className={`px-6 py-2 text-sm font-medium rounded transition ${
            updating
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          {updating ? "Updating..." : "Update Article"}
        </button>
      </div>
    </form>
  );
}

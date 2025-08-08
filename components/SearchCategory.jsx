"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const allCategories = [
  "Tech",
  "Business",
  "Auto",
  "Health",
  "Politics",
  "Sports",
];

export default function SearchCategory({ filters = [] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState(filters[0] || "All");

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);

    // Preserve existing search query
    const search = searchParams.get("search") || "";
    router.push(
      `/posts?search=${encodeURIComponent(
        search
      )}&category=${encodeURIComponent(value)}`
    );
  };

  // ✅ Agar search hai aur category nahi hai, to default "All" auto-set karo
  useEffect(() => {
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category");

    if (search && !category) {
      setSelectedCategory("All");
      router.push(`/posts?search=${encodeURIComponent(search)}&category=All`);
    }
  }, [searchParams, router]);

  return (
    <div className="flex gap-3 items-center">
      <select
        name="category"
        value={selectedCategory}
        onChange={handleChange}
        className="border px-2 md:px-3 py-2 rounded"
      >
        <option value="All">All Categories</option>
        {allCategories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}

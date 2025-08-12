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

    // Preserve existing params
    const params = new URLSearchParams(searchParams);
    params.set("category", value);
    params.set("page", "1"); // reset page when category changes
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    const category = searchParams.get("category");
    if (!category) {
      setSelectedCategory("All");
      const params = new URLSearchParams(searchParams);
      params.set("category", "All");
      router.replace(`?${params.toString()}`);
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

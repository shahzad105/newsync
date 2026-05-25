"use client";

import { useRouter, useSearchParams } from "next/navigation";

const allCategories = [
  { value: "All", label: "All Categories" },
  { value: "ai", label: "AI" },
  { value: "machine-learning", label: "Machine Learning" },
  { value: "blockchain", label: "Blockchain" },
  { value: "startups", label: "Startups" },
  { value: "entrepreneurship", label: "Entrepreneurship" },
  { value: "freelancing", label: "Freelancing" },
  { value: "jobs", label: "Jobs" },
  { value: "careers", label: "Careers" },
  { value: "technology", label: "Technology" },
  { value: "apps", label: "Apps" },
  { value: "youth", label: "Youth" },
  { value: "productivity", label: "Productivity" },
  { value: "lifestyle", label: "Lifestyle" },
];

export default function SearchCategory({ filters = [] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") || filters[0] || "All";

  const handleChange = (e) => {
    const value = e.target.value;

    const params = new URLSearchParams(searchParams);
    params.set("category", value);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex gap-3 items-center">
      <select
        name="category"
        value={selectedCategory}
        onChange={handleChange}
        className="border px-2 md:px-3 py-2 rounded"
      >
        {allCategories.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>
    </div>
  );
}

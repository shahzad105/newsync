"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

export default function Form({ searchParams }) {
  const router = useRouter();

  const [search, setSearch] = useState(searchParams?.search || "");
  const [limit, setLimit] = useState(Number(searchParams?.limit) || 10);

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (limit) params.set("limit", limit.toString());

    // reset to page 1 on new search
    params.set("page", "1");

    router.push(`/dashboard/articles?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md"
    >
      <div className="relative w-full sm:w-1/3">
        <FaSearch className="absolute top-3 left-3 text-gray-400" />
        <input
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search articles..."
          className="w-full pr-3 pl-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <select
        name="limit"
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
        className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
      >
        {[10, 50, 100].map((opt) => (
          <option key={opt} value={opt}>
            Show {opt}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Apply
      </button>
    </form>
  );
}

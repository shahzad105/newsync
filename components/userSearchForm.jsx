// components/UserSearchForm.jsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function UserSearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const search = form.get("search") ?? "";
    const limit = form.get("limit") ?? "10";

    router.push(
      `/dashboard/users?search=${encodeURIComponent(
        search
      )}&limit=${limit}&page=1`
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md"
    >
      <div className="relative w-full sm:w-1/3">
        <input
          name="search"
          defaultValue={searchParams.get("search") || ""}
          placeholder="Search by username..."
          className="w-full pl-10 pr-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500"
        />
        <div className="absolute top-3 left-3 text-gray-400">
          <span className="sr-only">Search</span>
          🔍
        </div>
      </div>

      <select
        name="limit"
        defaultValue={searchParams.get("limit") || "10"}
        className="border rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500"
      >
        {[10, 50, 100].map((n) => (
          <option key={n} value={n}>
            Show {n}
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

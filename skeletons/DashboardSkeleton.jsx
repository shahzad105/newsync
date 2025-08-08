import React from "react";

export default function DashboardLoadingSkeleton() {
  const cardCount = 6;
  const categoryCount = 4;

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto animate-pulse">
      <h1 className="text-4xl font-bold text-gray-900 mb-10">Dashboard</h1>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: cardCount }).map((_, idx) => (
          <div
            key={idx}
            className="flex items-center gap-5 bg-white p-6 rounded-2xl shadow"
          >
            <div className="w-14 h-14 rounded-xl bg-gray-200" />
            <div className="flex flex-col gap-2">
              <div className="w-24 h-4 bg-gray-200 rounded" />
              <div className="w-32 h-6 bg-gray-300 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Posts by Category Skeleton */}
      <div className="bg-white mt-12 rounded-2xl shadow p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Posts by Category (Last Month)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: categoryCount }).map((_, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-5 rounded-xl flex justify-between items-center border"
            >
              <div className="w-28 h-4 bg-gray-200 rounded" />
              <div className="w-6 h-6 bg-gray-300 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

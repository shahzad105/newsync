import React from "react";

const AutoSectionSkeleton = () => {
  return (
    <div className="py-15 space-y-4 animate-pulse">
      {/* Section Header */}
      <div className="w-32 h-6 bg-blue-200 rounded mb-6" />

      {/* Skeleton Cards */}
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="rounded-xl overflow-hidden p-3 bg-white shadow-sm border border-gray-100"
        >
          {/* Image Skeleton */}
          <div className="w-full h-48 bg-gray-200 rounded-lg mb-3" />

          {/* Title Skeleton */}
          <div className="h-4 bg-gray-200 rounded w-11/12 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-9/12 mb-1" />

          {/* Meta Skeleton */}
          <div className="h-3 bg-gray-200 rounded w-6/12" />
        </div>
      ))}

      {/* Pagination Skeleton Buttons */}
      <div className="flex gap-4 mt-6">
        <div className="w-10 h-10 bg-gray-300 rounded-full" />
        <div className="w-10 h-10 bg-gray-300 rounded-full" />
      </div>
    </div>
  );
};

export default AutoSectionSkeleton;

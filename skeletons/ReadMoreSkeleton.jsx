"use client";

import React from "react";

const ReadMoreSkeleton = () => {
  return (
    <div className="gap-6 mb-10">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="p-4 animate-pulse">
          {/* Category Placeholder */}
          <div className="w-24 h-4 bg-pink-300 rounded mb-2" />

          {/* Title Placeholder */}
          <div className="space-y-2">
            <div className="w-full h-4 bg-gray-300 rounded" />
            <div className="w-5/6 h-4 bg-gray-300 rounded" />
            <div className="w-4/6 h-4 bg-gray-300 rounded" />
          </div>

          {/* Meta Info */}
          <div className="w-32 h-3 mt-3 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  );
};

export default ReadMoreSkeleton;

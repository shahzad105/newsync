import React from "react";

const BusinessSkeleton = () => {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex flex-row items-center gap-4 p-1 animate-pulse"
        >
          {/* Image Skeleton */}
          <div className="w-28 h-20 md:w-48 md:h-28 bg-gray-300 rounded-md" />

          {/* Text Skeleton */}
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-3 bg-gray-200 rounded w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BusinessSkeleton;

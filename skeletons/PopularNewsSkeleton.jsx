import React from "react";

const PopularNewsSkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 border-b border-gray-200 py-3"
        >
          <div className="w-18 h-18 bg-gray-300 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="w-20 h-3 bg-gray-300 rounded" />
            <div className="w-3/4 h-4 bg-gray-300 rounded" />
            <div className="w-1/2 h-3 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PopularNewsSkeleton;

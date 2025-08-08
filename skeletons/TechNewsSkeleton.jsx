import React from "react";

const TechNewsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="rounded-bl-2xl rounded-tr-2xl overflow-hidden shadow-md bg-white"
        >
          <div className="h-52 bg-gray-200 relative" />
          <div className="p-4 space-y-2">
            <div className="h-3 w-1/4 bg-gray-300 rounded" />
            <div className="h-4 w-3/4 bg-gray-300 rounded" />
            <div className="h-3 w-1/2 bg-gray-300 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TechNewsSkeleton;

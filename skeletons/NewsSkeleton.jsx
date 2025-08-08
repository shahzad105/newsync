import React from "react";

const NewsSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-xl overflow-hidden animate-pulse bg-white"
        >
          <div className="w-full h-56 bg-gray-200" />

          <div className="p-2 md:p-4 space-y-2">
            <div className="w-24 h-4 bg-gray-300 rounded" />
            <div className="w-full h-5 bg-gray-300 rounded" />
            <div className="w-3/4 h-4 bg-gray-300 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsSkeleton;

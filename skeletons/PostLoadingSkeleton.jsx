import React from "react";

const Skeleton = ({ className }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

const PostPageSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Skeleton className="w-40 h-4 mb-6" />

      {/* Title */}
      <Skeleton className="w-3/4 h-8 mb-4" />
      <Skeleton className="w-1/2 h-4 mb-6" />

      {/* Image */}
      <Skeleton className="w-full h-64 md:h-80 mb-6" />

      {/* Description (multiple lines) */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-10/12" />
        <Skeleton className="h-4 w-9/12" />
        <Skeleton className="h-4 w-8/12" />
      </div>
    </div>
  );
};

export default PostPageSkeleton;

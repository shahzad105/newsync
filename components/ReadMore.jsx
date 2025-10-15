"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import ReadMoreSkeleton from "@/skeletons/ReadMoreSkeleton";
import useGetArticles from "@/hooks/useGetArticlse";
import Loader from "./Loader";

const ReadMore = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isFetching } = useGetArticles({
    limit: 5,
    page,
    category:
      "Politics,Economy,Health,Lifestyle,Science,AI & Machine Learning,Cybersecurity,Freelancing",
  });

  const articles = data?.articles || [];
  const totalPages = data?.totalPages || 1;

  const handlePrev = () => {
    if (!isLoading && page > 1) {
      setPage((prev) => Math.max(prev - 1, 1));
    }
  };

  const handleNext = () => {
    if (!isLoading && page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="py-6 mx-auto relative">
      {/* Title */}
      <h2 className="text-2xl p-1 font-bold tracking-tight text-green-800 whitespace-nowrap underline underline-offset-10 decoration-red-600 decoration-4 mb-6">
        Must Read
      </h2>

      {/* Full Page Skeleton */}
      {isLoading && <ReadMoreSkeleton />}

      {/* Overlay Loader During Pagination */}
      {isFetching && !isLoading && (
        <div className="absolute inset-0 z-20 bg-[#F9FAFB]/2 flex items-center justify-center">
          <Loader />
        </div>
      )}

      {/* Articles */}
      {!isLoading && articles.length > 0 && (
        <div className="gap-6 mb-10 relative z-10">
          {articles.map((post) => (
            <div key={post._id} className="p-4">
              <p className="text-sm font-medium text-pink-600 uppercase">
                {post.category}
              </p>
              <Link href={`/post/${post.slug}`}>
                <h3 className="text-base font-medium mt-1 line-clamp-4 cursor-pointer hover:underline">
                  {post.title}
                </h3>
              </Link>
              <p className="text-xs text-gray-500 mt-1">
                {post.postedBy?.username || "Admin"} •{" "}
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && articles.length > 0 && (
        <div className="flex justify-start gap-4 mt-6 p-1">
          <button
            onClick={handlePrev}
            disabled={page === 1 || isLoading}
            className="w-10 h-10 flex items-center justify-center bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 transition disabled:opacity-50"
          >
            <FiChevronLeft size={24} />
          </button>

          <button
            onClick={handleNext}
            disabled={isLoading || page === totalPages}
            className="w-10 h-10 flex items-center justify-center bg-red-600 text-white rounded-full hover:bg-red-700 transition disabled:opacity-50"
          >
            <FiChevronRight size={24} />
          </button>
        </div>
      )}

      {/* Error Message */}
      {isError && (
        <p className="text-center text-red-500 mt-4">
          Failed to load articles. Please try again later.
        </p>
      )}
    </div>
  );
};

export default ReadMore;

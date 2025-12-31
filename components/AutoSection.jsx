"use client";

import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import useGetArticles from "@/hooks/useGetArticlse";
import Loader from "./Loader";
import AutoSectionSkeleton from "@/skeletons/AutoSectionSkeleton";

const AutoCarsSection = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, isError } = useGetArticles({
    category: "Auto,Cars",
    page,
    limit: 3,
    latest: true,
  });

  const articles = data?.articles || [];
  const totalPages = data?.totalPages || 1;

  const handleNext = () => {
    if (!isLoading && page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isLoading && page > 1) {
      setPage((prev) => Math.max(prev - 1, 1));
    }
  };

  return (
    <div className="py-15 relative">
      <h2 className="text-2xl underline underline-offset-10 decoration-red-600 decoration-4 mb-6 text-blue-600 font-semibold tracking-tighter">
        Auto & Cars
      </h2>

      {/* Loading Skeleton on First Load */}
      {isLoading ? (
        <AutoSectionSkeleton />
      ) : (
        <>
          {/* Error Message */}
          {isError && (
            <p className="text-center text-red-500 mt-4">
              Failed to load auto news.
            </p>
          )}

          {/* Loader Overlay while Fetching */}
          {isFetching && (
            <div className="absolute inset-0 w-full h-full bg-black/5 z-20 flex items-center justify-center">
              <Loader />
            </div>
          )}

          {/* Article List */}
          <div className="space-y-4 relative z-10">
            {articles.length > 0 ? (
              articles.map((post) => (
                <Link
                  href={`/${post.slug}`}
                  key={post._id}
                  className="rounded-xl block transition overflow-hidden cursor-pointer p-3"
                >
                  <div className="relative w-full h-48 md:h-56">
                    <Image
                      src={post.image?.url || "/default.jpg"}
                      alt={post.title}
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="flex-1 mt-2">
                    <h3 className="text-md font-semibold line-clamp-3 hover:underline">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      {post.category} •{" "}
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-500">No auto news found.</p>
            )}
          </div>

          {/* Pagination */}
          {articles.length > 0 && (
            <div className="flex justify-start gap-4 mt-6">
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
        </>
      )}
    </div>
  );
};

export default AutoCarsSection;

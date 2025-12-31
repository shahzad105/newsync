"use client";

import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";

import useGetArticles from "@/hooks/useGetArticlse";
import Loader from "./Loader";
import TechNewsSkeleton from "@/skeletons/TechNewsSkeleton";
import Image from "next/image";

const TechNewsSection = () => {
  const [page, setPage] = useState(1);

  const { data, isError, isLoading, isFetching } = useGetArticles({
    category: "Tech",
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
    <div className="relative">
      <div className="flex items-center mb-4 p-1 mt-2">
        <div className="flex gap-2 mr-4">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-black transition disabled:opacity-50"
            disabled={page === 1 || isLoading}
          >
            <FaChevronLeft size={16} />
          </button>
          <button
            onClick={handleNext}
            className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition disabled:opacity-50"
            disabled={isLoading || page >= totalPages}
          >
            <FaChevronRight size={16} />
          </button>
        </div>

        <h2 className="text-2xl font-semibold mr-4 tracking-tighter whitespace-nowrap">
          Technology
        </h2>
      </div>

      {/* Loader overlay or Skeleton */}
      <div className="relative">
        {isLoading ? (
          <TechNewsSkeleton />
        ) : (
          <>
            {isFetching && (
              <div className="absolute inset-0 w-full h-full bg-black/10 z-20 flex items-center justify-center">
                <Loader />
              </div>
            )}

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 z-10 relative">
              {articles.map((post) => (
                <Link
                  href={`/${post.slug}`}
                  key={post._id}
                  className="rounded-bl-2xl rounded-tr-2xl overflow-hidden shadow-md transform hover:scale-[1.01] transition"
                >
                  <div className="h-52 relative group">
                    <Image
                      fill
                      loading="lazy"
                      src={post.image?.url || "/default.jpg"}
                      alt="Post thumbnail"
                      className="object-cover w-full h-full group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/10 to-transparent z-10" />
                    <div className="absolute bottom-0 left-0 w-full p-4 z-20 text-white">
                      <p className="text-sm font-medium text-pink-600 uppercase truncate">
                        {post.category}
                      </p>
                      <h2 className="text-lg font-bold mt-1 line-clamp-3 hover:underline leading-5 p-1">
                        {post.title}
                      </h2>
                      <p className="text-xs mt-1 text-gray-100">
                        {post.postedBy?.username || "Admin"} •{" "}
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* No articles found */}
            {!isLoading && articles.length === 0 && (
              <p className="text-center text-gray-500 mt-4">
                No articles found on this page.
              </p>
            )}
          </>
        )}
      </div>

      {/* Error Message */}
      {isError && (
        <p className="text-center text-red-500 mt-4">
          Failed to load tech articles. Please try again later.
        </p>
      )}
    </div>
  );
};

export default TechNewsSection;

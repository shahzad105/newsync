"use client";

import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Link from "next/link";

import useGetArticles from "@/hooks/useGetArticlse";
import Loader from "./Loader";
import PopularNewsSkeleton from "@/skeletons/PopularNewsSkeleton";
import Image from "next/image";

const PopularNews = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, isError } = useGetArticles({
    category: "Entertainment,Lifestyle,Travel,Politics,Economy,Food",
    limit: 5,
    page,
    latest: true,
  });

  const articles = data?.articles || [];
  const totalPages = data?.totalPages || 1;

  const handlePrev = () => {
    if (!isLoading && page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (!isLoading && page < totalPages) setPage((prev) => prev + 1);
  };

  return (
    <div className="relative">
      {/* First Load Skeleton */}
      {isLoading ? (
        <>
          <div className="flex items-center py-5 flex-nowrap">
            <h2 className="text-2xl font-semibold mr-3 tracking-tighter whitespace-nowrap underline underline-offset-10 decoration-red-600 decoration-4">
              Most Popular
            </h2>
          </div>
          <PopularNewsSkeleton />
        </>
      ) : (
        <>
          {/* Fetching Overlay for next pages */}
          {isFetching && (
            <div className="absolute inset-0 w-full h-full  z-20 flex items-center justify-center">
              <Loader />
            </div>
          )}

          {/* Header */}
          <div className="flex items-center py-5 flex-nowrap">
            <h2 className="text-2xl font-semibold mr-3 tracking-tighter whitespace-nowrap underline underline-offset-10 decoration-red-600 decoration-4">
              Most Popular
            </h2>
          </div>

          {/* Articles */}
          {articles.length > 0 ? (
            articles.map((post) => (
              <div
                key={post._id}
                className="flex items-center gap-3 border-b border-gray-200 py-3"
              >
                <Image
                  src={post.image?.url || "/default.jpg"}
                  alt="Post thumbnail"
                  width={72}
                  height={72}
                  className="!w-18 !h-18 object-cover rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-pink-400 uppercase">
                    {post.category}
                  </p>
                  <Link href={`/post/${post.slug}`}>
                    <h2 className="text-sm md:text-base font-bold mt-1 line-clamp-2 cursor-pointer hover:underline">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-xs mt-1 text-gray-500">
                    {post.postedBy?.username || "Admin"} •{" "}
                    {new Date(post.createdAt).toDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm text-center">
              No articles found.
            </p>
          )}

          {/* Pagination */}
          {articles.length > 0 && (
            <div className="flex justify-start gap-4 mt-6">
              <button
                onClick={handlePrev}
                disabled={page === 1 || isFetching}
                className="w-10 h-10 flex items-center justify-center bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 transition disabled:opacity-50"
              >
                <FiChevronLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                disabled={page === totalPages || isFetching}
                className="w-10 h-10 flex items-center justify-center bg-red-600 text-white rounded-full hover:bg-red-700 transition disabled:opacity-50"
              >
                <FiChevronRight size={24} />
              </button>
            </div>
          )}

          {/* Error */}
          {isError && (
            <p className="text-center text-red-500 mt-4">
              Failed to load popular news.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default PopularNews;

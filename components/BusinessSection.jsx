"use client";

import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

import useGetArticles from "@/hooks/useGetArticlse";
import BusinessSkeleton from "@/skeletons/BusinessSkeleton";
import Loader from "./Loader";

const BusinessSection = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isFetching } = useGetArticles({
    category: "International",
    limit: 5,
    page,
    latest: true,
  });

  const articles = data?.articles || [];
  const totalPages = data?.totalPages || 1;

  const handlePrev = () => {
    if (page > 1 && !isLoading) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages && !isLoading) setPage((prev) => prev + 1);
  };

  return (
    <div className="py-8 relative">
      <h2 className="text-2xl mb-6 p-1 font-semibold text-green-700 whitespace-nowrap underline underline-offset-10 decoration-red-600 decoration-4">
        International
      </h2>

      {/* Article List */}
      <div className="relative">
        {isLoading ? (
          <BusinessSkeleton />
        ) : (
          <>
            {isFetching && (
              <div className="absolute inset-0 w-full h-full bg-black/1 z-20 flex items-center justify-center">
                <Loader />
              </div>
            )}

            {isError ? (
              <p className="text-red-500 text-center py-4">
                Failed to load business news.
              </p>
            ) : !articles.length ? (
              <p className="text-gray-500 text-sm px-2">
                No business articles found.
              </p>
            ) : (
              <div className="space-y-6 relative z-10">
                {articles.map((post) => (
                  <Link
                    href={`/post/${post.slug}`}
                    key={post._id}
                    className="flex flex-row items-start  gap-4 transition p-1"
                  >
                    <div className="relative md:w-48 h-27 w-27 md:h-30 min-w-[7rem]">
                      <Image
                        src={post.image?.url || "/default.jpg"}
                        alt={post.title}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base  md:text-xl font-medium md:font-semibold line-clamp-3 hover:underline md:w-[60%]">
                        {post.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        {post.category} •{" "}
                        {new Date(post.createdAt).toDateString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-start gap-4 mt-6 p-2 md:p-0">
        <button
          onClick={handlePrev}
          disabled={page === 1 || isLoading}
          className="w-10 h-10 flex items-center justify-center bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 transition disabled:opacity-50"
        >
          <FiChevronLeft size={24} />
        </button>

        <button
          onClick={handleNext}
          disabled={page === totalPages || isLoading}
          className="w-10 h-10 flex items-center justify-center bg-red-600 text-white rounded-full hover:bg-red-700 transition disabled:opacity-50"
        >
          <FiChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default BusinessSection;

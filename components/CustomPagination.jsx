"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

const generatePages = (currentPage, totalPages) => {
  const pages = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  pages.push(1);
  if (currentPage > 4) pages.push("left-ellipsis");

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - 3) pages.push("right-ellipsis");

  pages.push(totalPages);

  return pages;
};

const CustomPagination = ({ currentPage, pageCount }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const current = currentPage + 1;
  const pagesToDisplay = generatePages(current, pageCount);

  const handlePageChange = (page) => {
    if (typeof page === "number" && page !== current) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page);
      router.push(`?${params.toString()}`);
    }
  };

  return (
    <div className="flex items-center gap-1 text-sm mt-10 flex-wrap justify-center">
      {/* Prev Button */}
      <button
        className="px-3 py-1.5 border rounded-md disabled:opacity-50 text-blue-600 border-blue-300"
        onClick={() => handlePageChange(current - 1)}
        disabled={current === 1}
      >
        {"<"}
      </button>

      {/* Page Buttons */}
      {pagesToDisplay.map((page, idx) =>
        typeof page === "number" ? (
          <button
            key={idx}
            onClick={() => handlePageChange(page)}
            className={`min-w-[32px] px-3 py-1.5 border rounded-md text-center ${
              current === page
                ? "bg-blue-900 text-white border-blue-900"
                : "hover:bg-blue-100 text-blue-600 border-blue-300"
            }`}
          >
            {page}
          </button>
        ) : (
          <span
            key={idx}
            className="px-2 text-gray-400 select-none font-semibold"
          >
            ...
          </span>
        )
      )}

      {/* Next Button */}
      <button
        className="px-3 py-1.5 border rounded-md disabled:opacity-50 text-blue-600 border-blue-300"
        onClick={() => handlePageChange(current + 1)}
        disabled={current >= pageCount}
      >
        {">"}
      </button>
    </div>
  );
};

export default CustomPagination;

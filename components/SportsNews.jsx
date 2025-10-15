import Link from "next/link";
import Image from "next/image";
import React from "react";

const SportsNews = async ({ articles }) => {
  return (
    <div className="py-8">
      <h2 className="mb-6 p-1 text-2xl font-bold tracking-tight text-sky-800 whitespace-nowrap underline underline-offset-10 decoration-red-600 decoration-4">
        Sports News
      </h2>

      <div className="grid grid-cols-1 gap-6">
        {/* Top 2 Featured Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.slice(0, 2).map((post) => (
            <Link
              href={`/post/${post.slug}`}
              key={post._id}
              className="rounded-xl overflow-hidden transition hover:shadow-md"
            >
              <div className="relative w-full h-56">
                <Image
                  src={post.image?.url || "/default.jpg"}
                  alt="Post thumbnail"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="p-4">
                <p className="text-sm font-medium text-blue-600 uppercase">
                  {post.category}
                </p>
                <h3 className="text-lg font-semibold mt-1 line-clamp-2 hover:underline">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {post.postedBy?.username || "Admin"} •{" "}
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Next 4 Smaller Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {articles.slice(2, 6).map((post) => (
            <Link
              href={`/post/${post.slug}`}
              key={post._id}
              className="flex flex-row items-center gap-4 p-2 rounded-xl transition hover:bg-gray-50 cursor-pointer"
            >
              {/* Fixing small image with proper wrapper */}
              <div className="relative w-28 h-20 md:w-32 md:h-20 flex-shrink-0">
                <Image
                  src={post.image?.url || "/default.jpg"}
                  alt="Post thumbnail"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-md font-semibold mt-1 line-clamp-3">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {post.postedBy?.username || "Admin"} •{" "}
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SportsNews;

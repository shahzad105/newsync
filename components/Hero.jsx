import Link from "next/link";
import Image from "next/image";
i;

// ✅ Dynamic Metadata for Hero Section

export default async function Hero({ articles }) {
  if (!articles) {
    return (
      <div className="py-12 text-center text-red-600">
        Failed to load articles.
      </div>
    );
  }

  const [firstPost, ...smallPosts] = articles;

  return (
    <>
      <div className="md:py-9 py-3">
        <div className="flex flex-col md:flex-row gap-5">
          {/* Left - Main Featured Post */}
          {firstPost && (
            <Link
              href={`/post/${firstPost.slug}`}
              className=" relative group overflow-hidden rounded-xl shadow-lg md:w-1/2 h-[290px] md:h-[429px] bg-gray-100"
            >
              <Image
                src={firstPost.image?.url || "/newsync.png"}
                alt={firstPost.title}
                fill
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                priority
              />
              <div className="absolute p-4 bottom-0 left-0 w-full px-4 bg-gradient-to-tr from-black/50 to-black/0 text-white">
                <p className="text-sm font-medium text-pink-600 uppercase">
                  {firstPost.category}
                </p>
                <h2 className="text-xl leading-7 md:text-2xl font-bold mt-1 line-clamp-3 md:line-clamp-none hover:underline">
                  {firstPost.title}
                </h2>
                <p className="text-xs mt-1 text-gray-100">
                  {firstPost.postedBy?.username || "Unknown Author"} •{" "}
                  {new Date(firstPost.createdAt).toDateString()}
                </p>
              </div>
            </Link>
          )}

          {/* Right - 4 Small Thumbnails */}
          <div className="md:w-1/2 w-full grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4">
            {smallPosts.map((post) => (
              <Link
                href={`/post/${post.slug}`}
                key={post._id}
                className="relative rounded-lg overflow-hidden shadow-md group"
              >
                <Image
                  src={post.image?.url || "/default.jpg"}
                  alt={post.title}
                  width={300}
                  height={200}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute bottom-0 left-0 w-full px-3 py-2 bg-gradient-to-tr from-black/50 to-black/0 text-white">
                  <p className="text-xs font-semibold text-pink-600 uppercase tracking-wide">
                    {post.category}
                  </p>
                  <p className="text-sm font-medium line-clamp-2 hover:underline">
                    {post.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

import Link from "next/link";
import Image from "next/image";

const News = ({ post }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      {post.map((item) => (
        <Link
          href={`/post/${item.slug}`}
          key={item._id}
          className="rounded-xl overflow-hidden"
        >
          <div className="relative w-full h-56">
            <Image
              src={item?.image?.url || "/newsync.png"}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>

          <div className="p-2 md:p-4">
            <p className="text-sm font-medium text-pink-600 uppercase">
              {item.category}
            </p>
            <h3 className="text-lg font-semibold mt-1 line-clamp-3 leading-5 hover:underline">
              {item.title}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {item.postedBy?.username} •{" "}
              {new Date(item.createdAt).toDateString()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default News;

export const revalidate = 3600; // 1 hour revalidation

import Link from "next/link";
import getSingleArticle from "@/lib/actions/getSingleArticle";

// Fetch helper

function getPlainText(html = "", maxLen = 160) {
  const text = html.replace(/<[^>]+>/g, "");
  return text.length > maxLen
    ? text.slice(0, maxLen).trim() + "…"
    : text.trim();
}

// Metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const res = await getSingleArticle(slug);
  const post = res?.data;

  if (!post)
    return {
      title: "404 - Post Not Found | NewSync",
      description: `No blog post found for ${slug}`,
      robots: { index: false, follow: false },
    };

  const title = `${post.title} | NewSync`;
  const description = getPlainText(post.description);
  const url = `${process.env.SITE_URL}/post/${slug}`;
  const images = post.image?.url
    ? [
        post.image.url,
        `${post.image.url}?w=800`, // example alt sizes
        `${post.image.url}?w=1200`,
      ]
    : [`${process.env.SITE_URL}/newsync.png`];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "NewSync",
      type: "article",
      images: images.map((url) => ({
        url,
        width: 1200,
        height: 630,
        alt: post.title,
      })),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [images[0]],
      creator: "@NewSync",
    },
    alternates: { canonical: url },
    robots: { index: true, follow: true },
  };
}

// Page Component
export default async function PostPage({ params }) {
  const { slug } = await params;
  const res = await getSingleArticle(slug);
  const post = res?.data;

  return (
    <>
      <div className="md:px-4 md:py-8">
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:underline text-blue-600">
            Home
          </Link>{" "}
          &gt;{" "}
          <Link href="/blog" className="hover:underline text-blue-600">
            Article
          </Link>{" "}
          &gt;{" "}
          <span className="text-gray-800 font-medium text-xs md:text-sm capitalize">
            {slug.replaceAll("-", " ")}
          </span>
        </nav>

        {post ? (
          <>
            <div className="mb-6">
              <h1 className="text-xl md:text-3xl font-bold mb-2">
                {post.title}
              </h1>
              <p className="text-sm text-gray-600">
                By{" "}
                <span className="font-medium">
                  {post.postedBy?.username || "Admin"}
                </span>{" "}
                • {new Date(post.createdAt).toDateString()}
              </p>
            </div>
            {post.image && (
              <div className="mb-6">
                <img
                  src={post.image.url}
                  alt={post.title}
                  className="w-full md:h-80 h-60 object-cover rounded-md shadow"
                />
              </div>
            )}
            <div
              className="text-gray-800 leading-7 whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: post.description }}
            />
          </>
        ) : (
          <p className="text-red-500 text-center mt-6">Post not found</p>
        )}
      </div>
    </>
  );
}

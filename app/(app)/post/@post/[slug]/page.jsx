import { Suspense } from "react";
import Link from "next/link";
import Script from "next/script";
import PostPageSkeleton from "@/skeletons/PostLoadingSkeleton";
import NativeBannerAd from "@/components/ads/NativeBanner";

async function getArticle(slug) {
  const res = await fetch(`${process.env.SITE_URL}/api/article/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

// ✅ Dynamic Metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getArticle(slug);
  const post = data?.article;

  if (!post) {
    return {
      title: "404 - Post Not Found | NewSync",
      description: `No blog post found for ${slug}`,
      robots: { index: false, follow: false },
    };
  }

  const title = `${post.title} | NewSync`;
  const description =
    post.description?.slice(0, 150) || "Read the latest article on NewSync.";
  const url = `${process.env.SITE_URL}/post/${slug}`;
  const image = post.image?.url || `${process.env.SITE_URL}/newsync.png`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "NewSync",
      type: "article",
      images: [{ url: image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    alternates: { canonical: url },
    robots: { index: true, follow: true },
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const data = await getArticle(slug);
  const post = data?.article;

  // ✅ JSON-LD for Article Schema
  const jsonLd = post
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description:
          post.description?.slice(0, 150) ||
          "Read the latest article on NewSync.",
        image: [post.image?.url || `${process.env.SITE_URL}/newsync.png`],
        author: {
          "@type": "Person",
          name: post.postedBy?.username || "Admin",
        },
        publisher: {
          "@type": "Organization",
          name: "NewSync",
          logo: {
            "@type": "ImageObject",
            url: `${process.env.SITE_URL}/logo.png`,
          },
        },
        datePublished: post.createdAt,
        dateModified: post.updatedAt || post.createdAt,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${process.env.SITE_URL}/post/${slug}`,
        },
      }
    : null;

  return (
    <>
      {jsonLd && (
        <Script
          id="article-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <div className="md:px-4 md:py-8">
        {/* Breadcrumb */}
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

        {/* Suspense Wrapper */}
        <Suspense fallback={<PostPageSkeleton />}>
          {post ? (
            <>
              {/* Post Header */}
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

              {/* Image */}
              <div className="mb-6">
                <img
                  src={post.image?.url || "/newsync.png"}
                  alt={post.title}
                  className="w-full md:h-80 h-60 object-cover rounded-md shadow"
                />
              </div>

              {/* Content */}
              <div className="text-gray-800 leading-7 whitespace-pre-line font-serif">
                {post.description}
              </div>
            </>
          ) : (
            <p className="text-red-500 text-center mt-6">Post not found</p>
          )}
        </Suspense>
      </div>
      <NativeBannerAd />
    </>
  );
}

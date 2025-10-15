import Link from "next/link";
import Script from "next/script";
import getSingleArticle from "@/lib/actions/getSingleArticle";

// ✅ Helper: strip tags and limit length
function getPlainText(html = "", maxLen = 160) {
  const text = html.replace(/<[^>]+>/g, "");
  return text.length > maxLen
    ? text.slice(0, maxLen).trim() + "…"
    : text.trim();
}

// ✅ Metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const res = await getSingleArticle(slug);
  const post = res?.data;

  if (!post) {
    return {
      title: "404 - Post Not Found | NewSync",
      description: `No article found for slug: ${slug}`,
      robots: { index: false, follow: false },
    };
  }

  const title = `${post.title} | NewSync`;
  const description = getPlainText(post.description);
  const url = `${process.env.SITE_URL}/post/${slug}`;
  const image = post.image?.url || `${process.env.SITE_URL}/newsync.png`;

  return {
    title,
    description,
    alternates: { canonical: url },
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
      creator: "@NewSync",
    },
    robots: { index: true, follow: true },
  };
}

// ✅ Page component
export default async function PostPage({ params }) {
  const { slug } = params;
  const res = await getSingleArticle(slug);
  const post = res?.data;

  if (!post) {
    return (
      <div className="px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-2">404 - Post Not Found</h1>
        <p className="text-gray-600">
          The article you’re looking for doesn’t exist or has been removed.
        </p>
        <Link
          href="/"
          className="inline-block mt-4 text-blue-600 hover:underline"
        >
          Go back home
        </Link>
      </div>
    );
  }

  // ✅ JSON-LD Schema (valid placement)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: getPlainText(post.description),
    image: [post.image?.url || `${process.env.SITE_URL}/newsync.png`],
    datePublished: post.createdAt,
    dateModified: post.updatedAt || post.createdAt,
    author: {
      "@type": "Person",
      name: post.postedBy?.username || "Admin",
    },
    publisher: {
      "@type": "Organization",
      name: "NewSync",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.SITE_URL}/newsync.png`,
      },
    },
  };

  return (
    <>
      {/* ✅ Inject clean JSON-LD in <head> */}
      <Script
        id="news-article-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="md:px-4 md:py-8 px-3 py-6">
        {/* ✅ Breadcrumb */}
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

        {/* ✅ Post Content */}
        <article>
          <header className="mb-6">
            <h1 className="text-xl md:text-3xl font-bold mb-2">{post.title}</h1>
            <p className="text-sm text-gray-600">
              By{" "}
              <span className="font-medium">
                {post.postedBy?.username || "Admin"}
              </span>{" "}
              •{" "}
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </header>

          {/* ✅ Article Image */}
          <div className="mb-6">
            <img
              src={post.image?.url || "/fallback.jpg"}
              alt={post.title}
              className="w-full md:h-80 h-60 object-cover rounded-md shadow"
            />
          </div>

          {/* ✅ Article Body */}
          <div
            className="text-gray-800 leading-7 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.description }}
          />
        </article>
      </div>
    </>
  );
}

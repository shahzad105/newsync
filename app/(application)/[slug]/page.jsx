import Link from "next/link";
import Image from "next/image";
import getSingleArticle from "@/lib/actions/getSingleArticle";
import { getPostSlugs } from "@/lib/actions/getSlugs";

export const dynamic = "force-static";
export const revalidate = 3600;

const SITE_URL = process.env.SITE_URL || "https://www.newsync.site";

// ✅ Strips HTML tags AND decodes common HTML entities
function getPlainText(html = "", maxLen = 160) {
  const text = html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
  return text.length > maxLen ? text.slice(0, maxLen).trim() + "…" : text;
}

// ✅ Pre-render all blog posts at build time (required for force-static)
export async function generateStaticParams() {
  try {
    const posts = await getPostSlugs();
    return posts.map((post) => ({ slug: post.slug }));
  } catch (error) {
    console.error("generateStaticParams failed:", error);
    return [];
  }
}

// ✅ SEO Metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const res = await getSingleArticle(slug);
  const post = res?.data;

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The article you are looking for does not exist.",
      robots: { index: false, follow: false },
    };
  }

  const title = post.title;
  const description = getPlainText(post.description);
  const url = `${SITE_URL}/${slug}`;
  const image = post.image?.url || `${SITE_URL}/logo.png`;

  return {
    title, // layout.js template will append "| NewSync"
    description,
    keywords: post.tags || [], // ✅ Add tags as keywords if your post has them
    authors: [{ name: post.postedBy?.username || "NewSync Media" }],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "NewSync",
      type: "article",
      publishedTime: post.createdAt, // ✅ Important for article type
      modifiedTime: post.updatedAt, // ✅ Important for article type
      authors: [post.postedBy?.username || "NewSync Media"],
      images: [{ url: image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@newsync", // ✅ Fixed: was @NewSync (case sensitive)
    },
    robots: { index: true, follow: true },
  };
}

// ✅ Main Page Component
export default async function PostPage({ params }) {
  const { slug } = await params;
  const res = await getSingleArticle(slug);
  const post = res?.data;

  if (!post) {
    return (
      <section className="px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-2">404 - Post Not Found</h1>
        <p className="text-gray-600">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/"
          className="inline-block mt-4 text-blue-600 hover:underline"
        >
          Go back home
        </Link>
      </section>
    );
  }

  const url = `${SITE_URL}/${slug}`;
  const image = post.image?.url || `${SITE_URL}/og-image.jpg`;
  const description = getPlainText(post.description);

  // ✅ JSON-LD BlogPosting Schema — most important thing for blog post indexing
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": url,
    headline: post.title,
    description: description,
    url: url,
    datePublished: post.createdAt,
    dateModified: post.updatedAt || post.createdAt,
    image: {
      "@type": "ImageObject",
      url: image,
      width: 1200,
      height: 630,
    },
    author: {
      "@type": "Person",
      name: post.postedBy?.username || "NewSync Media",
    },
    publisher: {
      "@type": "Organization",
      name: "NewSync",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og-image.jpg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    // ✅ Add if your posts have tags/categories
    ...(post.tags?.length && { keywords: post.tags.join(", ") }),
  };

  // ✅ Breadcrumb Schema — enables breadcrumb rich results in Google
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Articles",
        item: `${SITE_URL}/`, // ✅ Fixed: points to home since you have no /blog route
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="max-w-4xl mx-auto md:px-4 md:py-10 px-3 py-6">
        {/* ✅ Breadcrumb Nav — Fixed: removed /blog link since that route doesn't exist */}
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:underline text-blue-600">
            Home
          </Link>
          {" › "}
          <span className="text-gray-800 font-medium capitalize">
            {slug.replaceAll("-", " ")}
          </span>
        </nav>

        {/* ✅ Header */}
        <header className="mb-6">
          <h1 className="text-2xl md:text-4xl font-bold mb-3">{post.title}</h1>
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

        {post.image?.url && (
          <div className="relative h-[200px] md:h-[400px] mb-6 w-full overflow-hidden rounded-md shadow-md">
            <Image
              src={post.image.url}
              alt={post.title}
              fill
              priority // ✅ Above the fold — improves LCP score
              className="object-cover"
            />
          </div>
        )}

        {/* ✅ Article Body */}
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.description }}
        />
      </article>
    </>
  );
}

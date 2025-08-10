import NativeBannerAd from "@/components/ads/NativeBanner";
import CustomPagination from "@/components/CustomPagination";
import News from "@/components/News";
import NewsSkeleton from "@/skeletons/NewsSkeleton";
import Link from "next/link";
import Script from "next/script";
import React, { Suspense } from "react";

// ✅ Metadata generation for SEO
export async function generateMetadata({ params, searchParams }) {
  const categoryParam = params.category || "";
  const formattedCategory =
    categoryParam.charAt(0).toUpperCase() +
    categoryParam.slice(1).toLowerCase();

  const pageNum = parseInt(searchParams.page) || 1;

  const res = await fetch(
    `${process.env.SITE_URL}/api/articles?category=${formattedCategory}&limit=1&page=${pageNum}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  const firstImage =
    data?.articles?.[0]?.image?.url || `${process.env.SITE_URL}/newsync.png`;

  const title = `${formattedCategory} News - Page ${pageNum} | NewsSync`;
  const description = `Read the latest ${formattedCategory.toLowerCase()} news, stories, and updates. Page ${pageNum} of curated articles.`;
  const pageUrl = `${process.env.SITE_URL}/category/${categoryParam}?page=${pageNum}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "NewsSync",
      type: "website",
      images: [
        {
          url: firstImage,
          width: 1200,
          height: 630,
          alt: `${formattedCategory} News`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [firstImage],
    },
    alternates: {
      canonical: pageUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// ✅ Main Category Page
export default async function CategoryPage({ params, searchParams }) {
  const categoryParam = params.category || "";
  const formattedCategory =
    categoryParam.charAt(0).toUpperCase() +
    categoryParam.slice(1).toLowerCase();

  const pageNum = parseInt(searchParams.page) || 1;

  // Fetch articles for this category
  const res = await fetch(
    `${process.env.SITE_URL}/api/articles?category=${formattedCategory}&limit=5&page=${pageNum}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  const articles = data?.articles ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <>
      {/* ✅ Structured Data for Google */}
      <Script
        id="category-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${formattedCategory} News - NewsSync`,
          description: `Latest ${formattedCategory} news and updates from NewsSync.`,
          url: `https://newsync.site/category/${categoryParam}`,
          isPartOf: {
            "@type": "WebSite",
            name: "NewsSync",
            url: "https://newsync.site",
          },
        })}
      </Script>

      <div className="relative md:py-10 space-y-5">
        {/* Breadcrumb */}
        <nav className="text-sm pl-2 md:pl-0">
          <Link href="/" className="text-blue-600 hover:underline font-medium">
            Home
          </Link>
          <span className="mx-2 text-gray-400">›</span>
          <span className="capitalize font-semibold text-gray-700">
            {formattedCategory}
          </span>
        </nav>

        {/* Page Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 capitalize pl-2 md:pl-0">
          {formattedCategory} News
        </h1>

        {/* Categories Filter */}
        <div className="flex flex-wrap gap-3 pl-2 md:pl-0">
          {["Business", "Entertainment", "Sports", "Technology", "Travel"].map(
            (tag) => (
              <Link
                key={tag}
                href={`/category/${tag.toLowerCase()}?page=1`}
                className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full cursor-pointer hover:bg-blue-600 transition"
              >
                {tag}
              </Link>
            )
          )}
        </div>

        {/* News Section */}
        <section>
          <Suspense fallback={<NewsSkeleton />}>
            {articles.length > 0 ? (
              <News post={articles} />
            ) : (
              <p>No articles found for this category.</p>
            )}
          </Suspense>
        </section>

        {/* Pagination */}
        {articles.length > 0 && (
          <div className="pt-6">
            <CustomPagination
              currentPage={pageNum - 1}
              pageCount={totalPages}
            />
          </div>
        )}
      </div>

      <NativeBannerAd />
    </>
  );
}

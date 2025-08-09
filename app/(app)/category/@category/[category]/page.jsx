import AdsterraSmallBanner from "@/components/ads/AdsterraSmallBanner";
import NativeBannerAd from "@/components/ads/NativeBanner";
import CustomPagination from "@/components/CustomPagination";
import News from "@/components/News";
import NewsSkeleton from "@/skeletons/NewsSkeleton";
import Link from "next/link";
import Script from "next/script";
import React, { Suspense } from "react";

// ✅ SEO Metadata
export async function generateMetadata(props) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const categoryParam = params.category || "";
  const formattedCategory =
    categoryParam.charAt(0).toUpperCase() +
    categoryParam.slice(1).toLowerCase();

  const pageNum = parseInt(searchParams.page) || 1;

  // ✅ Fetch first article for OG image
  const res = await fetch(
    `${process.env.SITE_URL}/api/articles?category=${formattedCategory}&limit=1&page=${pageNum}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  const firstImage =
    data?.articles?.[0]?.image?.url || `${process.env.SITE_URL}/newsync.png`;

  const title = `${formattedCategory} News - Page ${pageNum} | NewsSync`;
  const description = `Read the latest ${formattedCategory.toLowerCase()} news, stories, and updates. Page ${pageNum} of curated articles.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${process.env.SITE_URL}/category/${categoryParam}?page=${pageNum}`,
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
      canonical: `${process.env.SITE_URL}/category/${categoryParam}?page=${pageNum}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// ✅ Main Category Page Component
export default async function CategoryPage(props) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const categoryParam = params.category || "";
  const formattedCategory =
    categoryParam.charAt(0).toUpperCase() +
    categoryParam.slice(1).toLowerCase();
  const pageNum = parseInt(searchParams.page) || 1;

  // ✅ Fetch Articles for this Category
  const res = await fetch(
    `${process.env.SITE_URL}/api/articles?category=${formattedCategory}&limit=5&page=${pageNum}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  const articles = data?.articles ?? [];
  const totalPages = data?.totalPages ?? 1;

  // ✅ JSON-LD Schema for ItemList (SEO)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: articles.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${process.env.SITE_URL}/post/${post.slug}`,
      name: post.title,
    })),
  };

  return (
    <>
      {/* ✅ Structured Data */}
      <Script
        id="category-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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

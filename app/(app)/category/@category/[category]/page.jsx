import CustomPagination from "@/components/CustomPagination";
import News from "@/components/News";
import NewsSkeleton from "@/skeletons/NewsSkeleton";
import Link from "next/link";
import Script from "next/script";
import React, { Suspense } from "react";

//  generateMetadata with awaited params + searchParams
export async function generateMetadata({ params, searchParams }) {
  const { category: categoryParam = "" } = await params;
  const { page: pageQuery } = await searchParams;
  const pageNum = parseInt(pageQuery) || 1;

  const formattedCategory = categoryParam
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");

  const res = await fetch(
    `${process.env.SITE_URL}/api/articles?category=${formattedCategory}&limit=1&page=${pageNum}&latest=true`,
    { cache: "no-store" }
  );
  const data = await res.json();
  const firstImage =
    data?.articles?.[0]?.image?.url || `${process.env.SITE_URL}/newsync.png`;

  const title = `${formattedCategory} News - Page ${pageNum} | NewSync`;
  const description = `Read the latest ${formattedCategory.toLowerCase()} news, stories, and updates. Page ${pageNum}.`;
  const pageUrl = `${process.env.SITE_URL}/category/${categoryParam}?page=${pageNum}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "NewSync",
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
      prev:
        pageNum > 1 &&
        `${process.env.SITE_URL}/category/${categoryParam}?page=${pageNum - 1}`,
      next:
        data?.totalPages > pageNum &&
        `${process.env.SITE_URL}/category/${categoryParam}?page=${pageNum + 1}`,
    },
    robots: { index: true, follow: true },
  };
}

//  CategoryPage component with awaited params + searchParams
export default async function CategoryPage({ params, searchParams }) {
  const { category: categoryParam = "" } = await params;
  const { page: pageQuery } = await searchParams;
  const pageNum = parseInt(pageQuery) || 1;

  const formattedCategory = categoryParam
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");

  const res = await fetch(
    `${process.env.SITE_URL}/api/articles?category=${formattedCategory}&limit=6&page=${pageNum}&latest=true`,
    { cache: "no-store" }
  );
  const data = await res.json();
  const articles = data?.articles ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <>
      <Script
        id="category-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${formattedCategory} News - NewSync`,
          description: `Latest ${formattedCategory} news and updates from NewSync.`,
          url: `${process.env.SITE_URL}/category/${categoryParam}`,
          isPartOf: {
            "@type": "WebSite",
            name: "NewSync",
            url: process.env.SITE_URL,
          },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: process.env.SITE_URL,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: formattedCategory,
                item: `${process.env.SITE_URL}/category/${categoryParam}`,
              },
            ],
          },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: articles.map((article, idx) => ({
              "@type": "ListItem",
              position: idx + 1,
              url: `${process.env.SITE_URL}/post/${article.slug}`,
            })),
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

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 pl-2 md:pl-0">
          {formattedCategory} News
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 pl-2 md:pl-0">
          {["Business", "Entertainment", "Sports", "Tech", "Travel"].map(
            (tag) => (
              <Link
                key={tag}
                href={`/category/${tag.toLowerCase()}?page=1`}
                className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full hover:bg-blue-600 transition"
              >
                {tag}
              </Link>
            )
          )}
        </div>

        {/* News */}
        <section>
          <Suspense fallback={<NewsSkeleton />}>
            {articles.length ? (
              <News post={articles} />
            ) : (
              <p>No articles found.</p>
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
    </>
  );
}

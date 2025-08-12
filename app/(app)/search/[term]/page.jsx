import Head from "next/head";
import SearchCategory from "@/components/SearchCategory";
import News from "@/components/News";
import CustomPagination from "@/components/CustomPagination";
import NewsSkeleton from "@/skeletons/NewsSkeleton";
import { Suspense } from "react";
import NativeBannerAd from "@/components/ads/NativeBanner";
import AdsterraSmallBanner from "@/components/ads/AdsterraSmallBanner";
import { searchArticles } from "@/lib/actions/searchArticles";

// 1. Fix generateMetadata: await params and searchParams
export async function generateMetadata({ params, searchParams }) {
  const { term } = await params;
  const sp = await searchParams;

  const filters = sp.category?.split(",").filter(Boolean) || [];
  const pageNum = parseInt(sp.page || "1", 10);
  const categoryLabel = filters.length ? filters.join(", ") : "All";
  const url = `${process.env.SITE_URL}/search/${encodeURIComponent(
    term
  )}?category=${encodeURIComponent(filters.join(","))}&page=${pageNum}`;

  return {
    title: `Search "${term}" | Category: ${categoryLabel} | Page ${pageNum}`,
    description: `Results for "${term}" in categories: ${categoryLabel}. Page ${pageNum}.`,
    openGraph: {
      title: `Search "${term}" | Category: ${categoryLabel} | Page ${pageNum}`,
      description: `Results for "${term}" in categories: ${categoryLabel}. Page ${pageNum}.`,
      url,
      siteName: "NewSync",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Search "${term}"`,
      description: `Results for "${term}"`,
    },
    alternates: { canonical: url },
    robots: { index: true, follow: true },
  };
}

export default async function SearchPage({ params, searchParams }) {
  const { term } = await params;
  const sp = await searchParams;

  const page = parseInt(sp.page || "1", 10);
  const filters = sp.category?.split(",").filter(Boolean) || [];

  const data = await searchArticles({
    search: term,
    category: filters.join(","),
    page,
    limit: 10,
    latest: true,
  });

  const articles = data?.articles || [];
  const totalPages = data?.totalPages || 1;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Search results for "${term}"`,
    description: `Explore results for "${term}" in categories: ${
      filters.join(", ") || "All"
    }. Page ${page}.`,
    url: `${process.env.SITE_URL}/search/${encodeURIComponent(
      term
    )}?category=${encodeURIComponent(filters.join(","))}&page=${page}`,
    mainEntity: articles.map((post) => ({
      "@type": "Article",
      headline: post.title,
      url: `${process.env.SITE_URL}/posts/${post.slug}`,
    })),
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className="flex flex-col pt-3 gap-6">
        <div className="flex md:flex-row flex-col items-start justify-between gap-4 rounded">
          <h1 className="text-lg font-semibold text-blue-900">
            Search Results for: "{term}"
          </h1>
          <SearchCategory filters={filters} />
        </div>

        <main className="relative min-h-[300px]">
          <Suspense fallback={<NewsSkeleton />}>
            {articles.length ? (
              <>
                <News post={articles} />
                <div className="mt-6">
                  <CustomPagination
                    currentPage={page - 1}
                    pageCount={totalPages}
                  />
                </div>
              </>
            ) : (
              <p className="text-center text-gray-600 mt-10">
                No results found for "{term}".
              </p>
            )}
          </Suspense>
        </main>
      </div>

      <NativeBannerAd />
      <AdsterraSmallBanner id="small-banner-2" />
    </>
  );
}

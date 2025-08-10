import SearchCategory from "@/components/SearchCategory";
import News from "@/components/News";
import CustomPagination from "@/components/CustomPagination";
import NewsSkeleton from "@/skeletons/NewsSkeleton";
import { Suspense } from "react";
import NativeBannerAd from "@/components/ads/NativeBanner";
import AdsterraSmallBanner from "@/components/ads/AdsterraSmallBanner";

// ✅ SEO Metadata
export async function generateMetadata({ searchParams }) {
  const query = searchParams?.search ?? "";
  const filters = searchParams?.category?.split(",").filter(Boolean) ?? [];
  const pageNum = parseInt(searchParams?.page ?? "1", 10);

  const title = query
    ? `Search results for "${query}" | NewsSync`
    : "Search | NewsSync";

  const description = `Browse news articles on NewsSync${
    query ? ` matching "${query}"` : ""
  }${
    filters.length > 0 ? ` in categories: ${filters.join(", ")}` : ""
  }. Page ${pageNum}.`;

  const fullUrl = `${process.env.SITE_URL}/posts?search=${encodeURIComponent(
    query
  )}&category=${filters.join(",")}&page=${pageNum}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: "NewsSync",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: fullUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// ✅ API fetch helper
async function fetchArticles({ search, category, page }) {
  const res = await fetch(
    `${process.env.SITE_URL}/api/articles?search=${encodeURIComponent(
      search
    )}&category=${encodeURIComponent(
      category
    )}&page=${page}&limit=6&latest=true`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to fetch articles");
  return res.json();
}

// ✅ Main Search Page
export default async function SearchPage({ searchParams }) {
  const query = searchParams?.search ?? "";
  const page = parseInt(searchParams?.page ?? "1", 10);
  const filters = searchParams?.category?.split(",").filter(Boolean) ?? [];

  const data = await fetchArticles({
    search: query,
    category: filters.join(","),
    page,
  });

  const articles = data?.articles || [];
  const totalPages = data?.totalPages || 1;

  return (
    <>
      <div className="flex flex-col pt-3 gap-6">
        <div className="flex md:flex-row flex-col items-start justify-between gap-4 rounded">
          <h1 className="text-lg font-semibold text-blue-900">
            Search Results for: "{query || "All"}"
          </h1>
          <SearchCategory filters={filters} />
        </div>

        {/* Results */}
        <main className="relative min-h-[300px]">
          <Suspense fallback={<NewsSkeleton />}>
            {articles.length > 0 ? (
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
                No results found for "{query}".
              </p>
            )}
          </Suspense>
        </main>
      </div>

      {/* Ads */}
      <NativeBannerAd />
      <AdsterraSmallBanner id="small-banner-2" />
    </>
  );
}

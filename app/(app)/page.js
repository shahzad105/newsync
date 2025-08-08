import Hero from "@/components/Hero";
import BusinessAutoLayout from "@/layouts/BusinessAuto";
import LatestReadmore from "@/layouts/LatestReadMore";
import NewsSectionLayout from "@/layouts/TechPopular";
import { fetchArticles } from "@/lib/fetchArticles";
import HeroSkeleton from "@/skeletons/HeroSkeleton";
import Script from "next/script";
import { Suspense } from "react";

// ✅ SEO Metadata for HomePage
export async function generateMetadata() {
  const siteUrl = process.env.SITE_URL || "https://newsync.com";
  const title = "NewsSync - Latest Business, Sports, Health & Tech News";
  const description =
    "Stay updated with the latest news from Business, Sports, Health, Technology, and more on NewsSync. Real-time stories curated just for you.";
  const ogImage = `${siteUrl}/newsync.png`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: "NewsSync",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "NewsSync - Latest News",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: siteUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function HomePage() {
  const heroCategories = "Business,Entertainment,Health,Innovation";
  const sportCategories = "Sports";

  // ✅ Fetch all articles in parallel
  const [heroArticles, sportsArticles, latestArticles] = await Promise.all([
    fetchArticles(heroCategories, 5),
    fetchArticles(sportCategories, 6),
    fetchArticles("All", 6),
  ]);

  const articles = heroArticles?.articles || [];

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
      <Script
        id="homepage-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Suspense fallback={<HeroSkeleton />}>
        <Hero articles={heroArticles?.articles} />
      </Suspense>

      <NewsSectionLayout sportsArticles={sportsArticles?.articles} />
      <BusinessAutoLayout />
      <LatestReadmore latestArtocles={latestArticles?.articles} />
    </>
  );
}

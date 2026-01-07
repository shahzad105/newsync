import Hero from "@/components/Hero";

import LatestReadmore from "@/layouts/LatestReadMore";
import NewsSectionLayout from "@/layouts/TechPopular";
import { fetchArticles } from "@/lib/fetchArticles";
import HeroSkeleton from "@/skeletons/HeroSkeleton";

import { Suspense } from "react";

export default async function HomePage() {
  const heroCategories = "Business,International,Health,Innovation";
  const sportCategories = "Sports";

  // ✅ Fetch all articles in parallel
  const [heroArticles, sportsArticles, latestArticles] = await Promise.all([
    fetchArticles(heroCategories, 5),
    fetchArticles(sportCategories, 6),
    fetchArticles("All", 6),
  ]);

  const articles = heroArticles?.articles || [];

  return (
    <>
      <Suspense fallback={<HeroSkeleton />}>
        <Hero articles={heroArticles?.articles} />
      </Suspense>
      <NewsSectionLayout sportsArticles={sportsArticles?.articles} />
      <LatestReadmore latestArtocles={latestArticles?.articles} />
    </>
  );
}

import Hero from "@/components/Hero";

import LatestReadmore from "@/layouts/LatestReadMore";
import TechLifestyleLayout from "@/layouts/TechPopular";

import { fetchArticles } from "@/lib/fetchArticles";
import HeroSkeleton from "@/skeletons/HeroSkeleton";

import { Suspense } from "react";

export default async function HomePage() {
  const heroCategories = "careers,startups,apps,youth";
  const lifestyleCategories = "lifestyle";

  const [heroArticles, lifestyleArticles, latestArticles] = await Promise.all([
    fetchArticles(heroCategories, 5),
    fetchArticles(lifestyleCategories, 6),
    fetchArticles("All", 6),
  ]);

  return (
    <>
      <Suspense fallback={<HeroSkeleton />}>
        <Hero articles={heroArticles?.articles} />
      </Suspense>
      <TechLifestyleLayout lifeStyleArticles={lifestyleArticles?.articles} />
      <LatestReadmore latestArtocles={latestArticles?.articles} />
    </>
  );
}

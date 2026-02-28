import Hero from "@/components/Hero";
import LatestReadmore from "@/layouts/LatestReadMore";
import TechLifestyleLayout from "@/layouts/TechPopular";
import { fetchArticles } from "@/lib/fetchArticles";
import HeroSkeleton from "@/skeletons/HeroSkeleton";
import { Suspense } from "react";

export const metadata = {
  title: "NewSync — Tech, AI, Freelancing & Career Blogs",
  description:
    "Explore trending blog posts on technology, lifestyle, startups, careers, and global stories from Pakistan, the USA, and around the world.",
  keywords: [
    "trending blogs ",
    "latest tech articles",
    "ai news 2026",
    "freelancing tips ",
    "it careers ",
    "software jobs ",
    "tech blogs for youth",
    "startup news ",
    "lifestyle articles",
    "productivity blogs",
  ],
  alternates: {
    canonical: "https://www.newsync.site/",
  },
  openGraph: {
    title: "NewSync — Tech, AI, Freelancing & Career Blogs",
    description:
      "Explore trending blog posts on technology, lifestyle, startups, careers, and global stories from Pakistan, the USA, and around the world.",
    url: "https://www.newsync.site/",
    type: "website",
    images: [
      {
        url: "https://www.newsync.site/logo.png",
        width: 1200,
        height: 630,
        alt: "NewSync - Trending Blogs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NewSync — Tech, AI, Freelancing & Career Blogs",
    description:
      "Explore trending blog posts on tech, lifestyle, startups and more on NewSync.",
    images: ["https://www.newsync.site/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.newsync.site/#website",
      url: "https://www.newsync.site/",
      name: "NewSync",
      description:
        "Trending blog posts from Pakistan, USA and around the world.",
      publisher: {
        "@type": "Organization",
        name: "NewSync",
        url: "https://www.newsync.site/",
        logo: {
          "@type": "ImageObject",
          url: "https://www.newsync.site/og-image.jpg",
        },
      },

      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://www.newsync.site/search?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Blog",
      "@id": "https://www.newsync.site/#blog",
      url: "https://www.newsync.site/",
      name: "NewSync Blog",
      description:
        "Explore trending blog posts on technology, lifestyle, startups, careers, and global stories.",
      inLanguage: "en-US",
    },
  ],
};

export default async function HomePage() {
  const heroCategories = "ai,machine-learning,blockchain";
  const lifestyleCategories = "lifestyle";
  const latestCategories = "startups,entrepreneurship,freelancing";

  const [heroArticles, lifestyleArticles, latestArticles] = await Promise.all([
    fetchArticles(heroCategories, 5).catch(() => ({ articles: [] })),
    fetchArticles(lifestyleCategories, 6).catch(() => ({ articles: [] })),
    fetchArticles(latestCategories, 6).catch(() => ({ articles: [] })),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main>
        <Suspense fallback={<HeroSkeleton />}>
          <Hero articles={heroArticles?.articles} />
        </Suspense>

        <Suspense fallback={null}>
          <TechLifestyleLayout
            lifeStyleArticles={lifestyleArticles?.articles}
          />
        </Suspense>

        <Suspense fallback={null}>
          <LatestReadmore latestArticles={latestArticles?.articles} />
        </Suspense>
      </main>
    </>
  );
}

import React, { Suspense } from "react";
import Script from "next/script"; // ✅ For JSON-LD

import NewsSkeleton from "@/skeletons/NewsSkeleton";
import News from "./News";

const Latest = ({ articles }) => {
  // ✅ JSON-LD Schema for Latest Articles
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: articles.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${process.env.SITE_URL}/post/${post.slug}`,
      name: post.title,
      image: post.image?.url || `${process.env.SITE_URL}/default.jpg`,
    })),
  };

  return (
    <>
      <div className="relative md:py-12 py-4 md:px-8">
        {articles.length > 0 && (
          <Script
            id="latest-articles-jsonld"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}

        <h2 className="text-2xl font-bold tracking-tight p-1 text-sky-800 whitespace-nowrap underline underline-offset-8 decoration-red-600 decoration-4 mb-6">
          Latest Articles
        </h2>

        {/* Articles */}
        {articles.length > 0 ? (
          <Suspense fallback={<NewsSkeleton />}>
            <News post={articles} />
          </Suspense>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Latest;

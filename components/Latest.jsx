import React, { Suspense } from "react";

import NewsSkeleton from "@/skeletons/NewsSkeleton";
import News from "./News";

const Latest = ({ articles }) => {
  return (
    <>
      {articles && articles.length > 0 && (
        <div className="relative md:py-12 py-4 md:px-8">
          <h2 className="text-2xl font-bold tracking-tight p-1 text-sky-800 whitespace-nowrap underline underline-offset-8 decoration-red-600 decoration-4 mb-6">
            Latest Blogs
          </h2>

          <Suspense fallback={<NewsSkeleton />}>
            <News post={articles} />
          </Suspense>
        </div>
      )}
    </>
  );
};

export default Latest;

import React, { Suspense } from "react";

import NewsSkeleton from "@/skeletons/NewsSkeleton";
import News from "./News";

const Latest = ({ articles }) => {
  return (
    <>
      {articles && articles.length > 0 && (
        <div className="relative md:py-12 py-4 md:px-8">
          <div
            className="flex items-center justify-between"
            style={{
              borderBottom: "2px solid var(--color-border)",
              paddingBottom: "0.75rem",
              marginBottom: "1.5rem",
            }}
          >
            <div className="flex items-center gap-3">
              <span
                style={{
                  display: "inline-block",
                  width: "4px",
                  height: "24px",
                  background: "var(--color-accent)",
                  borderRadius: "99px",
                  flexShrink: 0,
                }}
              />
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                  color: "var(--color-text)",
                  margin: 0,
                  lineHeight: 1,
                }}
              >
                Latest Articles
              </h2>
            </div>
          </div>

          <Suspense fallback={<NewsSkeleton />}>
            <News post={articles} />
          </Suspense>
        </div>
      )}
    </>
  );
};

export default Latest;

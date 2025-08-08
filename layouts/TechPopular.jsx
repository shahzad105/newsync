import PopularNews from "@/components/PopularNews";
import SportsNews from "@/components/SportsNews";
import TechNewsSection from "@/components/TechNewsSection";
import SportsNewsSkeleton from "@/skeletons/SportsNewsSkeleton";
import { Suspense } from "react";

const NewsSectionLayout = ({ sportsArticles }) => {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <main className="md:w-3/4 w-full space-y-6">
        <TechNewsSection />
        <Suspense fallback={<SportsNewsSkeleton />}>
          <SportsNews articles={sportsArticles} />
        </Suspense>
      </main>

      <aside className="w-full md:w-1/4 sticky top-10 self-start h-fit hidden md:block">
        <PopularNews />
      </aside>
    </div>
  );
};

export default NewsSectionLayout;

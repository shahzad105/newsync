import AdsterraBanner from "@/components/ads/AdsterraBanner";
import PopularNews from "@/components/PopularNews";
import ReadMore from "@/components/ReadMore";

export default function MostPopular() {
  return (
    <>
      <div className="hidden lg:block">
        <PopularNews></PopularNews>
      </div>
      <div className="lg:hidden block">
        <ReadMore></ReadMore>
      </div>
      <div className="mt-3">
        <AdsterraBanner id="ad-slot-1" />
      </div>
    </>
  );
}

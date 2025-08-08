import AutoCarsSection from "@/components/AutoSection";
import BusinessSection from "../components/BusinessSection";

const BusinessAutoLayout = () => {
  return (
    <div>
      <div className="flex gap-8">
        <main className="md:w-3/4 w-full space-y-6">
          <BusinessSection />
        </main>

        {/* Left: Sticky Popular or Latest */}
        <aside className="w-1/4 sticky top-10 self-start h-fit hidden md:block">
          <AutoCarsSection />
        </aside>
      </div>
    </div>
  );
};

export default BusinessAutoLayout;

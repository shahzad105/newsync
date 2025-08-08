export default function HeroSkeleton() {
  return (
    <div className="py-9 animate-pulse">
      <div className="flex flex-col md:flex-row gap-5">
        {/* Left Large Placeholder */}
        <div className="flex-1 h-[350px] bg-gray-300 rounded-xl shadow-lg" />

        {/* Right Small Thumbnails */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4">
          {Array(4)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className="h-[170px] bg-gray-300 rounded-lg shadow-md"
              />
            ))}
        </div>
      </div>
    </div>
  );
}

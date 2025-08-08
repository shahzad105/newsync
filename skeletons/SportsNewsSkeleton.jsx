import React from "react";

const SportsNewsSkeleton = () => {
  return (
    <div className="py-8 animate-pulse">
      <h2 className="mb-6 h-6 w-48 bg-slate-200 rounded"></h2>

      <div className="grid grid-cols-1 gap-6">
        {/* Top 2 large cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden border border-slate-100 shadow-sm"
            >
              <div className="w-full h-56 bg-slate-200" />
              <div className="p-4 space-y-2">
                <div className="h-4 w-24 bg-slate-300 rounded" />
                <div className="h-6 w-3/4 bg-slate-300 rounded" />
                <div className="h-3 w-1/2 bg-slate-300 rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* Next 4 small horizontal cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex flex-row items-center gap-4 p-2 rounded-xl border border-slate-100 shadow-sm"
            >
              <div className="w-28 h-20 bg-slate-200 rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="h-5 w-full bg-slate-300 rounded" />
                <div className="h-3 w-1/2 bg-slate-300 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SportsNewsSkeleton;

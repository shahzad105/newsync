import {
  FaRegNewspaper,
  FaUserAlt,
  FaThList,
  FaPlusCircle,
  FaStar,
} from "react-icons/fa";

import { getDashboardData } from "@/lib/actions/getDashboardData";
import DashboardLoadingSkeleton from "@/skeletons/DashboardSkeleton";
import { Suspense } from "react";

export async function generateMetadata() {
  const stats = await getDashboardData();
  return {
    title: "Dashboard | NewsSync",
    description: `Total ${stats?.totalArticles || 0} articles, ${
      stats?.totalUsers || 0
    } users, top category: ${stats?.topCategory?.category || "N/A"}`,
    openGraph: {
      title: "Dashboard | NewsSync",
      description: `Articles: ${stats?.totalArticles || 0}, Top category: ${
        stats?.topCategory?.category || "N/A"
      }`,
      siteName: "NewsSync",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: "Dashboard | NewsSync",
      description: `Articles: ${stats?.totalArticles || 0}, Users: ${
        stats?.totalUsers || 0
      }`,
    },
  };
}

export default async function DashboardOverview() {
  const stats = await getDashboardData();

  if (!stats || !stats.success) {
    return (
      <div className="p-6 text-red-600 font-semibold">Error loading stats.</div>
    );
  }

  const {
    totalArticles = 0,
    thisMonthArticles = 0,
    totalUsers = 0,
    thisMonthUsers = 0,
    totalCategories = 0,
    topCategory = { category: "N/A" },
    postsByCategoryLastMonth = [],
  } = stats;

  const cards = [
    {
      label: "Total Articles",
      value: totalArticles,
      icon: FaRegNewspaper,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      label: "New This Month",
      value: thisMonthArticles,
      icon: FaPlusCircle,
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      label: "Total Users",
      value: totalUsers,
      icon: FaUserAlt,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      label: "New Users",
      value: thisMonthUsers,
      icon: FaPlusCircle,
      iconColor: "text-pink-600",
      bgColor: "bg-pink-100",
    },
    {
      label: "Total Categories",
      value: totalCategories,
      icon: FaThList,
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      label: "Top Category",
      value: topCategory?.category || "N/A",
      icon: FaStar,
      iconColor: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <Suspense fallback={<DashboardLoadingSkeleton />}>
      <div className="px-6 py-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-10">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-5 bg-white p-6 rounded-2xl shadow group hover:shadow-lg transition"
              >
                <div
                  className={`p-4 rounded-xl ${card.bgColor} ${card.iconColor} text-3xl`}
                  aria-hidden="true"
                >
                  <Icon />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">{card.label}</p>
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {card.value}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Posts by Category */}
        <div className="bg-white mt-12 rounded-2xl shadow p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Posts by Category (Last Month)
          </h2>

          {postsByCategoryLastMonth?.length === 0 ? (
            <p className="text-gray-500">No posts found for last month.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
              {postsByCategoryLastMonth.map((cat, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 p-5 rounded-xl flex justify-between items-center hover:bg-gray-100 transition border"
                >
                  <p className="text-gray-700 font-medium">{cat.category}</p>
                  <span className="text-lg font-bold text-gray-800">
                    {cat.count}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
}

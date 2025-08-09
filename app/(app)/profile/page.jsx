import { FaCheckCircle, FaTimesCircle, FaUserShield } from "react-icons/fa";
import Image from "next/image";
import ProfileDropdown from "@/components/ProfileDropdown";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getActivities } from "@/lib/actions/getActivities";

export const metadata = {
  title: "Profile | NewsSync",
  description: "View and manage your profile details",
  openGraph: {
    title: "Profile - NewsSync",
    description: "View and manage your profile details",
    url: "https://newsync.site/profile",
    siteName: "NewsSync",
    images: [
      {
        url: "/user.png",
        width: 800,
        height: 600,
        alt: "Profile",
      },
    ],
    type: "website",
  },
};

const getIcon = (action) => {
  if (!action) return "📌";
  if (action.toLowerCase().includes("password")) return "🔒";
  if (action.toLowerCase().includes("profile")) return "📝";
  if (action.toLowerCase().includes("email")) return "✅";
  return "📌";
};

export default async function Profile() {
  const session = await auth();
  if (!session.user) {
    redirect("/auth/login");
  }

  const user = session?.user || {};
  const activities = await getActivities();

  return (
    <div className="py-10">
      {/* Profile Header */}
      <div className="relative max-w-5xl mx-auto border-b pb-6 mb-8">
        {/* Dropdown Menu */}
        <div className="absolute right-0 top-0">
          <ProfileDropdown />
        </div>

        {/* User Info */}
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <div className="relative w-24 h-24">
            <Image
              src={user?.avatar?.url || "/user.png"}
              alt="User Avatar"
              fill
              className="rounded-full object-cover border border-gray-300 shadow-sm"
            />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-semibold text-gray-800">
              {user?.username || "Guest"}
            </h1>
            <p className="text-sm text-gray-500">{user?.email || "No email"}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {/* Verified Badge */}
              <span
                className={`inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full ${
                  user?.isVerified
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {user?.isVerified ? (
                  <>
                    <FaCheckCircle className="text-green-600" /> Verified
                  </>
                ) : (
                  <>
                    <FaTimesCircle className="text-red-600" /> Not Verified
                  </>
                )}
              </span>

              {/* Role Badge */}
              <span
                className={`inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full ${
                  user?.isAdmin
                    ? "bg-purple-100 text-purple-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                <FaUserShield />
                {user?.isAdmin ? "Admin" : "User"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <section className="max-w-5xl mx-auto">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Activity
        </h2>

        {activities.length > 0 ? (
          <ul className="space-y-4">
            {activities.map((activity) => (
              <li
                key={activity._id}
                className="bg-white p-4 rounded-lg shadow-sm border flex items-start gap-4"
              >
                <div className="text-2xl">{getIcon(activity.action)}</div>
                <div>
                  <p className="text-gray-800">{activity.action}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(activity.createdAt).toDateString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">No recent activities found.</p>
        )}
      </section>
    </div>
  );
}

import DashboardAction from "@/components/DashboardAction";
import UserAction from "@/components/userAction";
import UserSearchForm from "@/components/userSearchForm";
import { getPaginatedUsers } from "@/lib/actions/getUser";
import ArticlesDashboardSkeleton from "@/skeletons/DashboardArticlesSkeleton";
import Link from "next/link";
import { Suspense } from "react";
import { FaEdit } from "react-icons/fa";

// SEO metadata
export async function generateMetadata(props) {
  const searchParams = await props.searchParams;
  const search = searchParams?.search ?? "";
  const page = parseInt(searchParams?.page ?? "1", 10);
  const limit = parseInt(searchParams?.limit ?? "10", 10);
  const { total } = await getPaginatedUsers({ search, page, limit });

  return {
    title: `Users Dashboard – Page ${page}`,
    description: `Displaying ${limit} of ${total} users${
      search ? ` matching '${search}'` : ""
    }`,
  };
}

// Main server component
export default async function UsersPage(props) {
  const searchParams = await props.searchParams;
  const search = searchParams?.search ?? "";
  const page = parseInt(searchParams?.page ?? "1", 10);
  const limit = parseInt(searchParams?.limit ?? "10", 10);

  const { users, totalPages } = await getPaginatedUsers({
    search,
    page,
    limit,
  });

  return (
    <Suspense fallback={<ArticlesDashboardSkeleton />}>
      <div className="md:p-6 p-1 space-y-6 bg-gray-50 min-h-screen overflow-auto">
        <div className="flex items-center justify-between">
          <h1 className="md:text-4xl text-2xl font-extrabold tracking-tight text-gray-900">
            Users Dashboard
          </h1>
        </div>

        <UserSearchForm />

        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">IsVerified</th>

                <th className="px-4 py-3">Role</th>

                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users?.length ? (
                users.map((u) => (
                  <tr key={u._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-600">
                      {u._id.toString()}
                    </td>
                    <td className="px-4 py-3 text-gray-900">{u.username}</td>
                    <td className="px-4 py-3 text-gray-700">{u.email}</td>
                    <td
                      className={`px-4 py-3 text-gray-700 ${
                        u.isVerified ? "text-green-600" : ""
                      }`}
                    >
                      {u.isVerified ? "Verified" : "Not Verified"}
                    </td>
                    <td
                      className={`p-2 text-gray-700 ${
                        u.isAdmin ? "font-bold text-green-600 rounded-2xl" : ""
                      }`}
                    >
                      {u.isAdmin ? "Admin" : "User"}
                    </td>
                    <td className="px-4 py-3 flex gap-1 flex-nowrap space-x-3 justify-end">
                      <UserAction id={u._id.toString()} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="py-6 text-center italic text-gray-400"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          search={search}
          limit={limit}
        />
      </div>
    </Suspense>
  );
}

function Pagination({ currentPage, totalPages, search, limit }) {
  const prevPage = currentPage > 1 ? currentPage - 1 : 1;
  const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;

  const buildBaseURL = () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (limit) params.set("limit", limit.toString());

    return `/dashboard/users?${params.toString()}&page=`;
  };

  const base = buildBaseURL();

  return (
    <div className="flex justify-between items-center mt-6 bg-white p-4 rounded-lg shadow-md">
      <span className="text-gray-700 text-sm">
        Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
      </span>
      <div className="space-x-2">
        <Link
          href={`${base}${prevPage}`}
          className={`px-4 py-2 rounded-md border transition ${
            currentPage === 1
              ? "text-gray-400 border-gray-300 bg-gray-100 cursor-not-allowed pointer-events-none"
              : "hover:bg-blue-50 text-blue-600 border-blue-600"
          }`}
        >
          Previous
        </Link>
        <Link
          href={`${base}${nextPage}`}
          className={`px-4 py-2 rounded-md border transition ${
            currentPage === totalPages
              ? "text-gray-400 border-gray-300 bg-gray-100 cursor-not-allowed pointer-events-none"
              : "hover:bg-blue-50 text-blue-600 border-blue-600"
          }`}
        >
          Next
        </Link>
      </div>
    </div>
  );
}

import DashboardAction from "@/components/DashboardAction";
import Form from "@/components/Form";

import { getPaginatedArticles } from "@/lib/actions/getAdminArticles";
import ArticlesDashboardSkeleton from "@/skeletons/DashboardArticlesSkeleton";

import Link from "next/link";
import { Suspense } from "react";
import { FaEdit, FaSearch } from "react-icons/fa";

// SEO metadata
export async function generateMetadata(props) {
  const searchParams = await props.searchParams;
  const search = searchParams?.search ?? "";
  const page = parseInt(searchParams?.page ?? "1", 10);
  const limit = parseInt(searchParams?.limit ?? "10", 10);
  const { total } = await getPaginatedArticles({ search, page, limit });

  return {
    title: `Articles Dashboard – Page ${page}`,
    description: `Displaying ${limit} of ${total} articles${
      search ? ` matching '${search}'` : ""
    }`,
  };
}

// Main server component
export default async function ArticlesPage(props) {
  const searchParams = await props.searchParams;
  const search = searchParams?.search ?? "";
  const page = parseInt(searchParams?.page ?? "1", 10);
  const limit = parseInt(searchParams?.limit ?? "10", 10);

  const { data: articles, totalPages } = await getPaginatedArticles({
    search,
    page,
    limit,
  });

  return (
    <Suspense fallback={<ArticlesDashboardSkeleton />}>
      {" "}
      <div className="md:p-6 p-1 space-y-6 bg-gray-50 min-h-screen overflow-auto">
        <div className="flex items-center justify-between">
          <h1 className="md:text-4xl text-2xl font-extrabold tracking-tight text-gray-900">
            Articles Dashboard
          </h1>
          <Link
            href="/dashboard/articles/new"
            className="md:px-4 md:py-2 px-2 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Add Article
          </Link>
        </div>

        <Form></Form>

        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {articles?.length ? (
                articles.map((a) => (
                  <tr key={a._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-600">
                      {a._id.toString()}
                    </td>
                    <td className="px-4 py-3 text-gray-900">
                      <Link href={`/${a.slug}`} className="hover:underline">
                        {a.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{a.category}</td>
                    <td className="px-4 py-3 flex gap-1 flex-nowrap space-x-3">
                      <Link
                        href={`/dashboard/articles/edit/${a.slug}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit className="inline w-5 h-5" />
                      </Link>
                      <DashboardAction id={a._id.toString()} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="py-6 text-center italic text-gray-400"
                  >
                    No articles found.
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

    return `/dashboard/articles?${params.toString()}&page=`;
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

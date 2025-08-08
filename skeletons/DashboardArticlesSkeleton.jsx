// components/skeletons/ArticlesDashboardSkeleton.jsx
export default function ArticlesDashboardSkeleton() {
  const rows = Array.from({ length: 5 });

  return (
    <div className="md:p-6 p-1 space-y-6 bg-gray-50 min-h-screen overflow-auto animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-8 w-64 bg-gray-200 rounded"></div>
        <div className="h-8 w-24 bg-gray-300 rounded"></div>
      </div>

      <div className="h-10 w-full max-w-md bg-gray-200 rounded"></div>

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
            {rows.map((_, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-48 bg-gray-300 rounded"></div>
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </td>
                <td className="px-4 py-3 flex gap-1 flex-nowrap justify-end">
                  <div className="h-5 w-5 bg-gray-300 rounded"></div>
                  <div className="h-5 w-5 bg-gray-300 rounded"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6 bg-white p-4 rounded-lg shadow-md">
        <div className="h-4 w-32 bg-gray-200 rounded"></div>
        <div className="space-x-2 flex">
          <div className="h-8 w-20 bg-gray-200 rounded"></div>
          <div className="h-8 w-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}

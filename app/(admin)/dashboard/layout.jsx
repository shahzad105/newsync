import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Layout({ dashboard, sidebar, children }) {
  const session = await auth();

  if (!session?.user?.isAdmin) {
    return redirect("/");
  }

  return (
    <div className="flex justify-between flex-col md:flex-row w-full bg-gray-100">
      <aside className="w-full md:w-64 bg-gray-50 shadow-md flex flex-col items-center md:items-start md:p-4 transition-all duration-300 sticky top-1 md:sticky md:top-0 md:h-screen z-30">
        {sidebar}
      </aside>

      <main className="flex-1">{dashboard ?? children}</main>
    </div>
  );
}

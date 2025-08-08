"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import deleteArticle from "@/lib/actions/deleteArticle";

export default function DashboardAction({ id }) {
  const router = useRouter();

  const { mutate: handleDelete, isPending } = useMutation({
    mutationFn: async () => {

      const res = await deleteArticle(id);

      if (!res.success)
        throw new Error(res.message || "Failed to delete article");
      return res;
    },
    onSuccess: () => {
      toast.success("Article deleted!");
      router.refresh();
    },
    onError: (err) => {
      toast.error(err.message || "Error deleting article");
    },
  });

  return (
    <button
      onClick={() => handleDelete()}
      className="text-red-600 hover:text-red-800 disabled:opacity-50"
      disabled={isPending}
    >
      {isPending ? (
        <div className="w-5 h-5 animate-spin border-2 border-current border-t-transparent rounded-full"></div>
      ) : (
        <FaTrash className="w-5 h-5" />
      )}
    </button>
  );
}

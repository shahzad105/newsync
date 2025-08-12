import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
const useGetArticles = ({
  category,
  page = 1,
  limit = 5,
  search,
  latest = true,
}) => {
  return useQuery({
    queryKey: ["articles", category, page, limit, search, latest],
    queryFn: async () => {
      const { data } = await axios.get("/api/articles", {
        params: { category, page, limit, search, latest },
      });
      return data;
    },

    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    placeholderData: keepPreviousData,
  });
};
export default useGetArticles;
export const useAddArticles = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await axios.post("/api/articles", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Article added successfully!");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || err?.message || "Something went wrong!"
      );
    },
  });
};

export const useUpdateArticle = () => {
  return useMutation({
    mutationFn: async ({ slug, updatedData }) => {
      const res = await axios.put(`/api/articles/${slug}`, updatedData);

      return res.data;
    },
    retry: false,
    onSuccess: () => {
      navigate("/dashboard/articles");
      toast.success("Article updated successfully!");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || err?.message || "Something went wrong!"
      );
    },
  });
};

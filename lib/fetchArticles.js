"use server";
import axios from "axios";

export async function fetchArticles(
  category = "All",
  limit = 10,
  latest = true
) {
  try {
    const res = await axios.get(`${process.env.SITE_URL}/api/articles`, {
      params: { category, limit, latest },
    });

    return res.data || [];
  } catch (error) {
    console.log("Error", error);
    throw new Error(
      error?.response?.data?.message ||
        error.message ||
        "Failed to fetch articles"
    );
  }
}

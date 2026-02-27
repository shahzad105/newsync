"use server";

import dbConnect from "@/lib/DB";
import Article from "@/models/article";

/**
 * fetchArticles — direct MongoDB query, no API hop
 *
 * @param {string}  category  - "All" or comma-separated slugs e.g. "ai,lifestyle"
 * @param {number}  limit     - max articles to return (default 10)
 * @param {boolean} latest    - true = newest first, false = oldest first
 * @param {number}  page      - pagination page (default 1)
 * @param {string}  search    - optional search string against title/description
 */
export async function fetchArticles(
  category = "All",
  limit = 10,
  latest = true,
  page = 1,
  search = "",
) {
  try {
    await dbConnect();

    const skip = (page - 1) * limit;

    const query = {};

    // Search filter
    if (search?.trim()) {
      query.$or = [
        { title: { $regex: search.trim(), $options: "i" } },
        { description: { $regex: search.trim(), $options: "i" } },
      ];
    }

    // Category filter
    if (category && category !== "All") {
      const categoryArray = category
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean);

      if (categoryArray.length > 0) {
        query.category = { $in: categoryArray };
      }
    }

    const sortOption = { createdAt: latest ? -1 : 1 };

    // ── Queries (run in parallel for speed) ──────
    const [articles, totalArticles] = await Promise.all([
      Article.find(query)
        .sort(sortOption)
        .limit(limit)
        .skip(skip)
        .populate("postedBy", "username avatar")
        .lean(),
      Article.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalArticles / limit);

    const now = new Date();
    const lastMonthCount = await Article.countDocuments({
      createdAt: {
        $gte: new Date(now.getFullYear(), now.getMonth() - 1, 1),
        $lt: new Date(now.getFullYear(), now.getMonth(), 1),
      },
    });

    const serialized = articles.map((article) => ({
      ...article,
      _id: article._id.toString(),
      createdAt: article.createdAt?.toISOString() ?? null,
      updatedAt: article.updatedAt?.toISOString() ?? null,
      postedBy: article.postedBy
        ? {
            ...article.postedBy,
            _id: article.postedBy._id?.toString(),
          }
        : null,
    }));

    return {
      success: true,
      articles: serialized,
      totalArticles,
      totalPages,
      currentPage: page,
      lastMonthArticleCount: lastMonthCount,
    };
  } catch (error) {
    console.error("[fetchArticles] Error:", error);
    return {
      success: false,
      articles: [],
      totalArticles: 0,
      totalPages: 1,
      currentPage: page,
      message: error.message || "Failed to fetch articles",
    };
  }
}

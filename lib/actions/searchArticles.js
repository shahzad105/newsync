"use server";

import Article from "@/models/article";
import dbConnect from "../DB";

export async function searchArticles({
  search,
  category,
  page = 1,
  limit = 10,
  latest = true,
}) {
  try {
    await dbConnect();

    const skip = (page - 1) * limit;
    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (category && category !== "All") {
      const categoryArray = category.split(",").filter(Boolean);
      query.category = { $in: categoryArray };
    }

    // Sort order
    const sortOption = latest ? { createdAt: -1 } : { createdAt: 1 };

    const articles = await Article.find(query)
      .sort(sortOption)
      .limit(limit)
      .skip(skip)
      .populate("postedBy", "username");

    const totalArticles = await Article.countDocuments(query);
    const totalPages = Math.ceil(totalArticles / limit);

    // Count last month's articles
    const now = new Date();
    const lastMonthArticles = await Article.find({
      createdAt: {
        $gte: new Date(now.getFullYear(), now.getMonth() - 1, 1),
        $lt: new Date(now.getFullYear(), now.getMonth(), 1),
      },
    });

    return {
      success: true,
      articles: JSON.parse(JSON.stringify(articles)),
      totalArticles,
      totalPages,
      currentPage: Number(page),
      lastMonthArticleCount: lastMonthArticles.length,
    };
  } catch (error) {
    console.error("Error in searchArticles:", error);
    return { success: false, message: "Server Error" };
  }
}

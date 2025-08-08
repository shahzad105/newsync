// lib/actions/getPaginatedArticles.js
import Article from "@/models/article";
import dbConnect from "../DB";

export async function getPaginatedArticles({ limit, page, search }) {
  const limitInt = parseInt(limit || "10", 10);
  const pageInt = parseInt(page || "1", 10);
  const skip = (pageInt - 1) * limitInt;

  const query = {};

  if (search && search.trim()) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  try {
    await dbConnect();
    const [articles, total] = await Promise.all([
      Article.find(query).skip(skip).limit(limitInt).sort({ createdAt: -1 }),
      Article.countDocuments(query),
    ]);

    return {
      success: true,
      data: articles,
      total,
      currentPage: pageInt,
      totalPages: Math.ceil(total / limitInt),
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to fetch articles",
    };
  }
}

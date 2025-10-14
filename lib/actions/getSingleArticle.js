"use server";

import Article from "@/models/article";

export default async function getSingleArticle(slug) {
  try {
    const article = await Article.findOne({ slug }).populate(
      "postedBy",
      "username"
    );
    if (!article)
      return {
        success: false,
        message: "Article not found",
      };
    return { success: true, data: JSON.parse(JSON.stringify(article)) };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
}

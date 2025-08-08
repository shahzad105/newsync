"use server";

import Article from "@/models/article";
import dbConnect from "@/lib/DB";
import { auth } from "@/auth";

export async function getArticle(slug) {
  const session = await auth();
 

  if (!session?.user?.isAdmin) {
    return { success: false, message: "Unauthorized" };
  }

  await dbConnect();

  try {
    let article = await Article.findOne({ slug })
      .populate("postedBy", "username -_id") // also removes postedBy._id
      .lean();

    if (!article) {
      return { success: false, message: "Article not found" };
    }

    const { _id, __v, ...cleanArticle } = article;

    return {
      success: true,
      message: "Article fetched successfully",
      article: cleanArticle,
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

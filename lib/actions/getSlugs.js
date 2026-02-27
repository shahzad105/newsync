"use server";
import Article from "@/models/article";
import dbConnect from "@/lib/DB";

export async function getPostSlugs() {
  try {
    await dbConnect();
    const posts = await Article.find({}, "slug updatedAt")
      .sort({ updatedAt: -1 })
      .lean();
    return posts.map((post) => ({
      slug: post.slug,
      updatedAt: post.updatedAt,
    }));
  } catch (error) {
    console.error("Error fetching post slugs:", error);
    return [];
  }
}

export async function getTotalPostsCount() {
  try {
    await dbConnect();
    return await Article.countDocuments();
  } catch (error) {
    console.error("Error counting posts:", error);
    return 0;
  }
}

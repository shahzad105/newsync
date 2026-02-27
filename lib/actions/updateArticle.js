"use server";
import Article from "@/models/article";
import dbConnect from "../DB";
import { deleteFile, uploadImage } from "@/utils/cloudinary";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function updateArticleAction({ slug, updatedData }) {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return { success: false, message: "Unauthorized" };
  }
  await dbConnect();
  try {
    const article = await Article.findOne({ slug });
    if (!article) {
      return { success: false, message: "Article not found" };
    }
    if (updatedData.image && updatedData.image !== article.image.url) {
      if (article.image?.public_id) {
        await deleteFile(article.image.public_id);
      }
      const result = await uploadImage(updatedData.image, "shopit");
      article.image.public_id = result.public_id;
      article.image.url = result.url;
    }
    if (updatedData.title) article.title = updatedData.title;
    if (updatedData.category) article.category = updatedData.category;
    if (updatedData.description) article.description = updatedData.description;

    await article.save();

    revalidatePath("/");
    revalidatePath(`/${slug}`);

    return { success: true, message: "Article updated successfully" };
  } catch (error) {
    console.error("Update Article Error:", error);
    return { success: false, message: error.message };
  }
}

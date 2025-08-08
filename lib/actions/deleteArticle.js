"use server";
import Article from "@/models/article";
import dbConnect from "../DB";
import { auth } from "@/auth";
import { deleteFile } from "@/utils/cloudinary";

export default async function deleteArticle(id) {
  const sessoin = await auth();
  if (!sessoin?.user.isAdmin) {
    return { success: false, message: "Unauthorized" };
  }
  try {
    await dbConnect();

    const article = await Article.findById(id);
    if (!article) {
      return { success: false, message: "Article not found" };
    }
    if(article.image?.public_id){
        await deleteFile(article.image.public_id);
    }
    await article.deleteOne();

    return { success: true, message: "Article deleted successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

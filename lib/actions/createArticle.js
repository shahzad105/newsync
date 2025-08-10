"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/DB";
import Article from "@/models/article";
import { uploadImage } from "@/utils/cloudinary";

export async function createArticle({ title, description, category, image }) {
  await dbConnect();

  const session = await auth();
  if (!session || !session.user?.isAdmin) {
    return { success: false, message: "Unauthorized" };
  }

  if (!title || !description || !category || !image) {
    return { success: false, message: "All fields are required" };
  }

  try {
    const result = await uploadImage(image, "shopit");
    const article = await Article.create({
      title,
      description,
      category,
      image: {
        public_id: result.public_id,
        url: result.url,
      },
      postedBy: session.user.id,
    });

    return { success: true, message: "Article created successfully" };
  } catch (err) {
    return { success: false, message: err || "Failed to create article" };
  }
}

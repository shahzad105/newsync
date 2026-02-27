"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/DB";
import Article from "@/models/article";
import { uploadImage } from "@/utils/cloudinary";
import { revalidatePath } from "next/cache";

// ✅ Auto-generate SEO-friendly slug from title
// "How AI Tools Are Changing Work" → "how-ai-tools-are-changing-work"
function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove special characters
    .replace(/\s+/g, "-") // spaces to hyphens
    .replace(/-+/g, "-") // collapse multiple hyphens
    .slice(0, 80); // max 80 chars for clean URLs
}

export async function createArticle({ title, description, category, image }) {
  await dbConnect();

  // ✅ Auth check
  const session = await auth();
  if (!session || !session.user?.isAdmin) {
    return { success: false, message: "Unauthorized" };
  }

  // ✅ Required fields check
  if (!title || !description || !category || !image) {
    return { success: false, message: "All fields are required" };
  }

  // ✅ SEO validation
  if (title.length < 10) {
    return {
      success: false,
      message: "Title is too short. Minimum 10 characters for SEO.",
    };
  }

  if (title.length > 100) {
    return {
      success: false,
      message: "Title is too long. Maximum 100 characters.",
    };
  }

  const plainText = description.replace(/<[^>]+>/g, "").trim();
  if (plainText.length < 50) {
    return {
      success: false,
      message: "Description is too short. Write at least 50 characters.",
    };
  }

  try {
    // ✅ Fixed: folder changed from "shopit" → "newsync"
    const result = await uploadImage(image, "shopit");

    // ✅ Generate slug from title
    const baseSlug = generateSlug(title);

    // ✅ Check for duplicate slug — append timestamp if slug already exists
    const existing = await Article.findOne({ slug: baseSlug });
    const slug = existing ? `${baseSlug}-${Date.now()}` : baseSlug;

    await Article.create({
      title,
      slug, // ✅ Now every article has a proper slug
      description,
      category,
      image: {
        public_id: result.public_id,
        url: result.url,
      },
      postedBy: session.user.id,
    });

    // ✅ Revalidate pages so new post appears immediately
    revalidatePath("/");
    revalidatePath(`/${slug}`);
    revalidatePath("/sitemap.xml");

    return {
      success: true,
      message: "Article created successfully",
      slug,
    };
  } catch (err) {
    console.error("createArticle error:", err);

    return {
      success: false,
      message: err?.message || "Failed to create article",
    };
  }
}

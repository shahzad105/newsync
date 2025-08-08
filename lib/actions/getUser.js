import User from "@/models/user";
import dbConnect from "../DB";
import { auth } from "@/auth";

export async function getPaginatedUsers({ limit, page, search }) {
  const session = await auth();
  if (!session?.user.isAdmin) {
    return { success: false, message: "Unauthorized" };
  }
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
    const [users, total] = await Promise.all([
      User.find(query).skip(skip).limit(limitInt).sort({ createdAt: -1 }),
      User.countDocuments(query),
    ]);

    return {
      success: true,
      users,
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

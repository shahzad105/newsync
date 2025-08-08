import { auth } from "@/auth";
import dbConnect from "../DB";
import User from "@/models/user";
import Article from "@/models/article";

export async function getDashboardData() {
  const session = await auth();
  if (!session?.user.isAdmin) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    await dbConnect();

    const totalCategories = 48;
    const now = new Date();
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const totalArticles = await Article.countDocuments();
    const thisMonthArticles = await Article.countDocuments({
      createdAt: { $gte: startOfMonth, $lte: now },
    });

    const totalUsers = await User.countDocuments();
    const thisMonthUsers = await User.countDocuments({
      createdAt: { $gte: startOfMonth, $lte: now },
    });

    const topCategory = await Article.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 1 },
      {
        $project: {
          _id: 0,
          category: "$_id",
          count: 1,
        },
      },
    ]);

    const postsByCategoryLastMonth = await Article.aggregate([
      {
        $match: {
          createdAt: { $gte: oneMonthAgo },
        },
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      {
        $project: {
          _id: 0,
          category: "$_id",
          count: 1,
        },
      },
    ]);

    return {
      success: true,
      totalCategories,
      totalArticles,
      thisMonthArticles,
      totalUsers,
      thisMonthUsers,

      topCategory: topCategory[0] || null,
      postsByCategoryLastMonth,
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

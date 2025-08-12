import dbConnect from "@/lib/DB";
import Article from "@/models/article";
import User from "@/models/user";

export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit")) || 10;
    const page = parseInt(searchParams.get("page")) || 1;
    const latest = searchParams.get("latest") === "true";

    const skip = (page - 1) * limit;
    const query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    if (category && category !== "All") {
      const categoryArray = category.split(",");
      query.category = { $in: categoryArray };
    }

    const sortOption = latest ? { createdAt: -1 } : { createdAt: 1 };

    const articles = await Article.find(query)
      .sort(sortOption)
      .limit(limit)
      .skip(skip)
      .populate("postedBy", "username");
    const totalArticles = await Article.countDocuments(query);
    const totalPages = Math.ceil(totalArticles / limit);

    const now = new Date();
    const lastMonthArticles = await Article.find({
      createdAt: {
        $gte: new Date(now.getFullYear(), now.getMonth() - 1, 1),
        $lt: new Date(now.getFullYear(), now.getMonth(), 1),
      },
    });
    return Response.json({
      success: true,
      articles,
      totalArticles,
      totalPages,
      currentPage: Number(page),
      lastMonthArticleCount: lastMonthArticles.length,
    });
  } catch (error) {
    return Response.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}

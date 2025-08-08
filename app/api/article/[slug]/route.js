import { NextResponse } from "next/server";

import User from "@/models/user";
import Article from "@/models/article";
import dbConnect from "@/lib/DB";
export async function GET(req, { params }) {
  await dbConnect();

  try {
    const { slug } = await params;

    const article = await Article.findOne({ slug }).populate(
      "postedBy",
      "username"
    );

    if (!article) {
      return NextResponse.json(
        { success: false, message: "Article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Article fetched successfully",
      article,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

import mongoose from "mongoose";
import slugify from "slugify";

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      trim: true,
      maxLength: [100, "Title cannot be more than 100 characters"],
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      enum: [
        "ai",
        "machine learning",
        "blockchain",
        "startups",
        "entrepreneurship",
        "freelancing",
        "jobs",
        "careers",
        "technology",
        "apps",
        "youth",
        "productivity",
        "lifestyle",
      ],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    image: {
      public_id: String,
      url: String,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    slug: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

articleSchema.pre("save", async function (next) {
  if (!this.isModified("title")) return next();

  let baseSlug = slugify(this.title, { lower: true, strict: true });
  let slug = baseSlug;
  let count = 1;
  while (await mongoose.models.Article.findOne({ slug })) {
    slug = `${baseSlug}-${count++}`;
  }
  this.slug = slug;
  next();
});

const Article =
  mongoose.models?.Article || mongoose.model("Article", articleSchema);
export default Article;

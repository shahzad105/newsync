import mongoose from "mongoose";
import slugify from "slugify";

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      trim: true,
      minLength: [10, "Title must be at least 10 characters"],
      maxLength: [100, "Title cannot be more than 100 characters"],
    },

    slug: {
      type: String,

      required: [true, "Slug is required"],

      unique: true,
      trim: true,
      lowercase: true,

      index: true,
    },

    category: {
      type: String,
      required: [true, "Please add a category"],
      lowercase: true,
      trim: true,
      enum: {
        values: [
          "ai",
          "machine-learning",
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
        message: "{VALUE} is not a valid category",
      },

      index: true,
    },

    description: {
      type: String,
      required: [true, "Please add a description"],

      minLength: [50, "Description must be at least 50 characters"],
    },

    image: {
      public_id: { type: String },
      url: { type: String },
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please add an author"],
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

articleSchema.index({ category: 1, createdAt: -1 });

articleSchema.index({ createdAt: -1 });

articleSchema.pre("save", async function (next) {
  // Only regenerate slug if title was changed
  if (!this.isModified("title")) return next();

  try {
    let baseSlug = slugify(this.title, {
      lower: true,
      strict: true, // removes special chars
      trim: true,
    });

    let slug = baseSlug;
    let count = 1;

    // ✅ Keep checking until we find a unique slug
    // Exclude current document when checking (for title updates)
    while (
      await mongoose.models.Article.findOne({
        slug,
        _id: { $ne: this._id }, // ✅ Don't conflict with itself on update
      })
    ) {
      slug = `${baseSlug}-${count++}`;
    }

    this.slug = slug;
    next();
  } catch (err) {
    next(err); // ✅ Pass errors to Mongoose instead of silently failing
  }
});

articleSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  if (!update?.title && !update?.$set?.title) return next();

  try {
    const newTitle = update?.title || update?.$set?.title;
    let baseSlug = slugify(newTitle, { lower: true, strict: true, trim: true });
    let slug = baseSlug;
    let count = 1;

    const docId = this.getQuery()._id;

    while (
      await mongoose.models.Article.findOne({
        slug,
        _id: { $ne: docId },
      })
    ) {
      slug = `${baseSlug}-${count++}`;
    }

    // ✅ Inject new slug into the update operation
    if (update.$set) {
      update.$set.slug = slug;
    } else {
      update.slug = slug;
    }

    next();
  } catch (err) {
    next(err);
  }
});

const Article =
  mongoose.models?.Article || mongoose.model("Article", articleSchema);

export default Article;

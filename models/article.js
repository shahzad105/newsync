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
      // ✅ Required — no article should exist without a slug
      required: [true, "Slug is required"],
      // ✅ Unique enforced at DB level — prevents race conditions
      unique: true,
      trim: true,
      lowercase: true,
      // ✅ Indexed — every page lookup is by slug, needs to be fast
      index: true,
    },

    // ✅ Fixed: "machine learning" → "machine-learning" (matches URL slugs)
    category: {
      type: String,
      required: [true, "Please add a category"],
      lowercase: true,
      trim: true,
      enum: {
        values: [
          "ai",
          "machine-learning", // ✅ Fixed: hyphen not space
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
      // ✅ Indexed — filtered on every category page
      index: true,
    },

    description: {
      type: String,
      required: [true, "Please add a description"],
      // ✅ Minimum content for SEO value
      minLength: [50, "Description must be at least 50 characters"],
    },

    image: {
      public_id: { type: String },
      url: { type: String },
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please add an author"], // ✅ Required now
      index: true,
    },
  },
  {
    timestamps: true, // createdAt + updatedAt auto-managed
  },
);

// ✅ Compound index — speeds up "latest posts by category" queries
// This is the exact query your category page runs on every load
articleSchema.index({ category: 1, createdAt: -1 });

// ✅ Index for homepage "latest all posts" query
articleSchema.index({ createdAt: -1 });

// ✅ Pre-save hook — only runs on .save() and .create()
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

// ✅ Pre-save hook for findOneAndUpdate — runs when title updated via API
articleSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  // Only regenerate if title is being updated
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

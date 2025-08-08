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
        "Tech",
        "Startups",
        "Youth",
        "Innovation",
        "Business",
        "Finance",
        "Sports",
        "Entertainment",
        "Education",
        "Politics",
        "Policy",
        "Economy",
        "Health",
        "Lifestyle",
        "Science",
        "AI & Machine Learning",
        "Cybersecurity",
        "Freelancing",
        "Jobs & Careers",
        "Women in Tech",
        "Opinion",
        "Interviews",
        "Events",
        "Web3 & Blockchain",
        "Apps & Gadgets",
        "Fashion",
        "National",
        "International",
        "Environment",
        "Social Impact",
        "Productivity",
        "Culture",
        "Travel",
        "Food",
        "Gaming",
        "Auto",
        "Real Estate",
        "Art & Design",
        "HealthTech",
        "EdTech",
        "FinTech",
        "E-commerce",
        "Digital Marketing",
        "Content Creation",
        "Startups & Entrepreneurship",
        "Nonprofits",
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

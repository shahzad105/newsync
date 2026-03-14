import CustomPagination from "@/components/CustomPagination";
import News from "@/components/News";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export const revalidate = 60;

const ALL_CATEGORIES = [
  { slug: "ai", label: "AI" },
  { slug: "machine-learning", label: "Machine Learning" },
  { slug: "blockchain", label: "Blockchain" },
  { slug: "startups", label: "Startups" },
  { slug: "entrepreneurship", label: "Entrepreneurship" },
  { slug: "freelancing", label: "Freelancing" },
  { slug: "jobs", label: "Jobs" },
  { slug: "careers", label: "Careers" },
  { slug: "technology", label: "Technology" },
  { slug: "apps", label: "Apps" },
  { slug: "youth", label: "Youth" },
  { slug: "productivity", label: "Productivity" },
  { slug: "lifestyle", label: "Lifestyle" },
];

const SITE_URL = process.env.SITE_URL || "https://www.newsync.site";

function formatCategory(slug = "") {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

// ✅ generateMetadata — single fetch, no double call
export async function generateMetadata({ params, searchParams }) {
  const { category: categoryParam = "" } = await params;
  const { page: pageQuery } = await searchParams;
  const pageNum = parseInt(pageQuery) || 1;

  const formattedCategory = formatCategory(categoryParam);

  const title =
    pageNum === 1
      ? `${formattedCategory} Blogs `
      : `${formattedCategory} Blogs — Page ${pageNum} `;

  const description = `Read the latest ${formattedCategory.toLowerCase()} blog posts, stories, and insights on NewSync. Page ${pageNum}.`;

  const pageUrl =
    pageNum === 1
      ? `${SITE_URL}/category/${categoryParam}`
      : `${SITE_URL}/category/${categoryParam}?page=${pageNum}`;

  const ogImage = `${SITE_URL}/logo.png`;

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,

      ...(pageNum > 1 && {
        prev:
          pageNum - 1 === 1
            ? `${SITE_URL}/category/${categoryParam}`
            : `${SITE_URL}/category/${categoryParam}?page=${pageNum - 1}`,
      }),
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "NewSync",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${formattedCategory} Blogs`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@newsync",
    },
    robots: { index: true, follow: true },
  };
}

// ✅ Category Page Component
export default async function CategoryPage({ params, searchParams }) {
  const { category: categoryParam = "" } = await params;
  const { page: pageQuery } = await searchParams;
  const pageNum = parseInt(pageQuery) || 1;

  const formattedCategory = formatCategory(categoryParam);

  let articles = [];
  let totalPages = 1;

  try {
    const res = await fetch(
      `${SITE_URL}/api/articles?category=${formattedCategory}&limit=6&page=${pageNum}&latest=true`,
      { next: { revalidate: 60 } },
    );
    const data = await res.json();
    articles = data?.articles ?? [];
    totalPages = data?.totalPages ?? 1;
  } catch (err) {
    console.error("CategoryPage fetch failed:", err.message);
    // ✅ Fails gracefully — shows empty state instead of crashing
  }

  // ✅ JSON-LD — CollectionPage schema for category pages
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${formattedCategory} Blogs`,
    description: `The latest ${formattedCategory.toLowerCase()} blog posts on NewSync.`,
    url: `${SITE_URL}/category/${categoryParam}`,
    publisher: {
      "@type": "Organization",
      name: "NewSync",
      url: SITE_URL,
    },
    ...(articles.length > 0 && {
      hasPart: articles.map((article) => ({
        "@type": "BlogPosting",
        headline: article.title,
        url: `${SITE_URL}/${article.slug}`,
        datePublished: article.createdAt,
        image: article.image?.url,
      })),
    }),
  };

  // ✅ Filter out current category from the chips
  const otherCategories = ALL_CATEGORIES.filter(
    (c) => c.slug !== categoryParam,
  ).slice(0, 8); // show max 8 other categories

  return (
    <>
      {/* ✅ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="relative md:py-10 space-y-6">
        {/* ---- Breadcrumb ---- */}
        <nav aria-label="Breadcrumb" className="text-sm pl-2 md:pl-0">
          <Link href="/" className="text-blue-600 hover:underline font-medium">
            Home
          </Link>
          <span className="mx-2 text-gray-400">›</span>
          <span className="capitalize font-semibold text-gray-700">
            {formattedCategory}
          </span>
        </nav>

        {/* ---- Page Title ---- */}
        <div className="pl-2 md:pl-0">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {formattedCategory}{" "}
            <span style={{ color: "var(--color-accent)" }}>Blogs</span>
            {/* ✅ Fixed: says "Blogs" not "News" */}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {pageNum === 1
              ? `Everything about ${formattedCategory.toLowerCase()} in one place`
              : `Page ${pageNum} of ${totalPages}`}
          </p>
        </div>

        {/* ---- Category Filter Chips ---- */}
        {/* ✅ Fixed: now shows your ACTUAL 13 categories */}
        <div className="flex flex-wrap gap-2 pl-2 md:pl-0">
          {/* Current category — highlighted */}
          <span
            style={{
              display: "inline-block",
              background: "var(--color-accent)",
              color: "#fff",
              fontSize: "0.75rem",
              fontWeight: 700,
              padding: "0.3rem 0.85rem",
              borderRadius: "99px",
              fontFamily: "var(--font-ui)",
            }}
          >
            {formattedCategory}
          </span>

          {/* Other categories */}
          {otherCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="badge" // ✅ Uses your globals.css badge style
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {/* ---- Articles Grid ---- */}
        <section aria-label={`${formattedCategory} blog posts`}>
          {articles.length > 0 ? (
            <News post={articles} />
          ) : (
            // ✅ Proper empty state — not just a plain <p>
            <div
              style={{
                textAlign: "center",
                padding: "4rem 1rem",
                color: "var(--color-muted)",
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📭</div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  color: "var(--color-text)",
                  marginBottom: "0.5rem",
                }}
              >
                No posts yet in {formattedCategory}
              </h2>
              <p style={{ fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                We're working on it. Check back soon or explore another
                category.
              </p>
              <Link href="/" className="btn-primary">
                ← Back to Home
              </Link>
            </div>
          )}
        </section>

        {/* ---- Pagination ---- */}
        {totalPages > 1 && articles.length > 0 && (
          <div className="pt-4">
            <CustomPagination
              currentPage={pageNum - 1}
              pageCount={totalPages}
            />
          </div>
        )}
      </main>
    </>
  );
}

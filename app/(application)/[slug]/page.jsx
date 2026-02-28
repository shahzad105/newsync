import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import getSingleArticle from "@/lib/actions/getSingleArticle";
import { getPostSlugs } from "@/lib/actions/getSlugs";
import ShareButtons from "@/components/ShareButton";

export const dynamic = "force-static";
export const revalidate = 3600;

const SITE_URL = process.env.SITE_URL || "https://www.newsync.site";

// ---- Helpers ----
function getPlainText(html = "", maxLen = 160) {
  const text = html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
  return text.length > maxLen ? text.slice(0, maxLen).trim() + "…" : text;
}

function getReadingTime(html = "") {
  const text = html.replace(/<[^>]+>/g, "");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

// ---- Static Params ----
export async function generateStaticParams() {
  try {
    const posts = await getPostSlugs();
    return posts.map((post) => ({ slug: post.slug }));
  } catch (error) {
    console.error("generateStaticParams failed:", error);
    return [];
  }
}

// ---- SEO Metadata ----
export async function generateMetadata({ params }) {
  try {
    const { slug } = await params;
    const res = await getSingleArticle(slug);
    const post = res?.data;

    if (!post) return {};

    const url = `${SITE_URL}/${post.slug}`;
    const imageUrl = post.image?.url || `${SITE_URL}/og-image.jpg`;

    const keywords = [
      post.category,
      ...post.title
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .split(" ")
        .filter((w) => w.length > 3)
        .slice(0, 8),
      "newsync",
      "blog",
      "pakistan",
    ]
      .filter(Boolean)
      .join(", ");

    const seoTitle =
      post.title.length > 55 ? post.title.slice(0, 52) + "..." : post.title;

    return {
      title: seoTitle,
      description: getPlainText(post.description, 155),
      keywords,
      authors: [{ name: post.postedBy?.username || "NewSync" }],
      creator: "NewSync",
      publisher: "NewSync",
      openGraph: {
        title: post.title,
        description: getPlainText(post.description, 155),
        url,
        siteName: "NewSync",
        type: "article",
        publishedTime: post.createdAt,
        modifiedTime: post.updatedAt,
        authors: [post.postedBy?.username || "NewSync"],
        images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: getPlainText(post.description, 155),
        images: [imageUrl],
        creator: "@newsync",
      },
      alternates: {
        canonical: url,
      },
    };
  } catch (error) {
    console.error("generateMetadata failed:", error);
    return {};
  }
}

// ---- Main Page Component ----
export default async function PostPage({ params }) {
  const { slug } = await params;

  let post = null;
  try {
    const res = await getSingleArticle(slug);
    post = res?.data;
  } catch (error) {
    console.error("PostPage fetch error:", error);
  }

  if (!post) return notFound();

  const url = `${SITE_URL}/${slug}`;
  const image = post.image?.url || `${SITE_URL}/og-image.jpg`;
  const description = getPlainText(post.description);
  const readingTime = getReadingTime(post.description || "");
  const publishDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": url,
    headline: post.title,
    description,
    url,
    datePublished: post.createdAt,
    dateModified: post.updatedAt || post.createdAt,
    image: { "@type": "ImageObject", url: image, width: 1200, height: 630 },
    author: {
      "@type": "Person",
      name: post.postedBy?.username || "NewSync Media",
    },
    publisher: {
      "@type": "Organization",
      name: "NewSync",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/og-image.jpg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(post.tags?.length && { keywords: post.tags.join(", ") }),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: post.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div
        id="readingProgress"
        className="reading-progress"
        aria-hidden="true"
      />

      <main>
        <article className="pt-8">
          {/* Hero Image */}
          {post.image?.url && (
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "clamp(260px, 50vw, 520px)",
                overflow: "hidden",
              }}
            >
              <Image
                src={post.image.url}
                alt={post.title}
                fill
                priority
                className="object-cover"
                style={{ filter: "brightness(0.82)" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 55%, transparent 100%)",
                }}
              />
              {post.category && (
                <div
                  style={{
                    position: "absolute",
                    top: "1.5rem",
                    left: "1.5rem",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      fontFamily: "var(--font-ui)",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#fff",
                      background: "var(--color-accent)",
                      padding: "0.3rem 0.8rem",
                      borderRadius: "99px",
                    }}
                  >
                    {post.category}
                  </span>
                </div>
              )}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "2rem clamp(1rem, 5vw, 3rem)",
                  maxWidth: "860px",
                  margin: "0 auto",
                }}
              >
                <h1
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.6rem, 4vw, 2.75rem)",
                    fontWeight: 900,
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                    color: "#ffffff",
                    textShadow: "0 2px 12px rgba(0,0,0,0.4)",
                    margin: 0,
                  }}
                >
                  {post.title}
                </h1>
              </div>
            </div>
          )}

          {/* Article Container */}
          <div
            style={{
              maxWidth: "780px",
              margin: "0 auto",
              padding: "0 clamp(1rem, 4vw, 2rem)",
            }}
          >
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.8rem",
                color: "var(--color-muted)",
                padding: "1.25rem 0 0",
                fontFamily: "var(--font-ui)",
              }}
            >
              <Link
                href="/"
                style={{
                  color: "var(--color-accent)",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                Home
              </Link>
              <span style={{ color: "#d1d5db" }}>›</span>
              <span
                style={{
                  color: "var(--color-muted)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "280px",
                }}
              >
                {slug.replaceAll("-", " ")}
              </span>
            </nav>

            {/* Title — only when no hero image */}
            {!post.image?.url && (
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.8rem, 4vw, 2.75rem)",
                  fontWeight: 900,
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  color: "var(--color-text)",
                  margin: "1.5rem 0 1rem",
                }}
              >
                {post.title}
              </h1>
            )}

            {/* Meta Bar */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "0.75rem",
                padding: "1.25rem 0",
                borderBottom: "1px solid var(--color-border)",
                marginBottom: "2rem",
                fontFamily: "var(--font-ui)",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, var(--color-accent), var(--color-accent-2))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    flexShrink: 0,
                  }}
                >
                  {(post.postedBy?.username || "N")[0].toUpperCase()}
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      color: "var(--color-text)",
                    }}
                  >
                    {post.postedBy?.username || "NewSync Media"}
                  </div>
                  <div
                    style={{ fontSize: "0.75rem", color: "var(--color-muted)" }}
                  >
                    {publishDate}
                  </div>
                </div>
              </div>

              <span style={{ color: "#d1d5db", fontSize: "1.2rem" }}>·</span>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  fontSize: "0.8rem",
                  color: "var(--color-muted)",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {readingTime} min read
              </div>

              {post.tags?.slice(0, 2).map((tag) => (
                <span key={tag} className="badge">
                  {tag}
                </span>
              ))}
            </div>

            {/* Article Body */}
            <div
              className="prose"
              style={{ maxWidth: "none" }}
              dangerouslySetInnerHTML={{ __html: post.description }}
            />

            {/* Share Section */}
            <ShareButtons url={url} title={post.title} />
            {/* Back to Home */}
            <div
              style={{
                paddingBottom: "3rem",
                borderTop: "1px solid var(--color-border)",
                paddingTop: "2rem",
              }}
            >
              <Link
                href="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  fontFamily: "var(--font-ui)",
                  color: "var(--color-accent-2)",
                  textDecoration: "none",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back to all posts
              </Link>
            </div>
          </div>
        </article>
      </main>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var bar = document.getElementById('readingProgress');
              if (!bar) return;
              window.addEventListener('scroll', function() {
                var scrolled = window.scrollY;
                var total = document.body.scrollHeight - window.innerHeight;
                bar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + '%';
              }, { passive: true });
            })();
          `,
        }}
      />
    </>
  );
}

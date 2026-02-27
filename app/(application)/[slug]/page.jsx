import Link from "next/link";
import Image from "next/image";
import getSingleArticle from "@/lib/actions/getSingleArticle";
import { getPostSlugs } from "@/lib/actions/getSlugs";
import ShareButtons from "@/components/ShareButton";
export const dynamic = "force-static";
export const revalidate = 3600;
const SITE_URL = process.env.SITE_URL || "https://www.newsync.site";

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

// ✅ Reading time estimator
function getReadingTime(html = "") {
  const text = html.replace(/<[^>]+>/g, "");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export async function generateStaticParams() {
  try {
    const posts = await getPostSlugs();
    return posts.map((post) => ({ slug: post.slug }));
  } catch (error) {
    console.error("generateStaticParams failed:", error);
    return [];
  }
}

// ✅ SEO Metadata
export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};

  const url = `${process.env.SITE_URL}/${post.slug}`;
  const imageUrl = post.image?.url || `${process.env.SITE_URL}/og-image.jpg`;

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
  ].join(", ");

  const seoTitle =
    post.title.length > 55 ? post.title.slice(0, 52) + "..." : post.title;

  return {
    title: seoTitle, // ✅ under 60 chars
    description: post.description?.slice(0, 155) || post.title,
    keywords,

    authors: [{ name: post.postedBy?.username || "NewSync" }],
    creator: "NewSync",
    publisher: "NewSync",

    openGraph: {
      title: post.title, // OG can be longer
      description: post.description?.slice(0, 155),
      url, // ✅ full URL
      siteName: "NewSync",
      type: "article",
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      authors: [post.postedBy?.username || "NewSync"],
      images: [
        {
          url: imageUrl, // ✅ full Cloudinary URL
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description?.slice(0, 155),
      images: [imageUrl], // ✅ full URL
      creator: "@newsync",
    },

    alternates: {
      canonical: url, // ✅ full canonical URL
    },
  };
}
// ✅ Main Page Component
export default async function PostPage({ params }) {
  const { slug } = await params;
  const res = await getSingleArticle(slug);
  const post = res?.data;

  // ---- 404 State ----
  if (!post) {
    return (
      <section className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20 text-center">
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "6rem",
            fontWeight: 900,
            lineHeight: 1,
            background: "linear-gradient(135deg, #e85d26, #1d3557)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          404
        </span>
        <h1 className="text-2xl font-bold mt-4 mb-2">Post Not Found</h1>
        <p className="text-gray-500 mb-8 max-w-md">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/" className="btn-primary">
          ← Back to Home
        </Link>
      </section>
    );
  }

  const url = `${SITE_URL}/${slug}`;
  const image = post.image?.url || `${SITE_URL}/og-image.jpg`;
  const description = getPlainText(post.description);
  const readingTime = getReadingTime(post.description);
  const publishDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // ---- JSON-LD: BlogPosting ----
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
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og-image.jpg`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(post.tags?.length && { keywords: post.tags.join(", ") }),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: post.title,
        item: url,
      },
    ],
  };

  return (
    <>
      {/* ---- Structured Data ---- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ---- Reading Progress Bar ---- */}
      <div
        id="readingProgress"
        className="reading-progress"
        aria-hidden="true"
      />

      <main>
        <article className="pt-8">
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
              {/* Dark gradient overlay — makes title readable on any image */}
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

              {/* Title overlaid on image (bottom) */}
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

          {/* ================================================
              ARTICLE CONTAINER
          ================================================ */}
          <div
            style={{
              maxWidth: "780px",
              margin: "0 auto",
              padding: "0 clamp(1rem, 4vw, 2rem)",
            }}
          >
            {/* ---- Breadcrumb ---- */}
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

            {/* ---- Title (shown only when NO hero image) ---- */}
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

            {/* ---- Meta Bar ---- */}
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
              {/* Author avatar + name */}
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

              {/* Divider dot */}
              <span style={{ color: "#d1d5db", fontSize: "1.2rem" }}>·</span>

              {/* Reading time */}
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

              {/* Tags */}
              {post.tags?.slice(0, 2).map((tag) => (
                <span key={tag} className="badge">
                  {tag}
                </span>
              ))}
            </div>

            {/* ---- Article Body ---- */}
            <div
              className="prose"
              style={{ maxWidth: "none" }}
              dangerouslySetInnerHTML={{ __html: post.description }}
            />

            {/* ---- Share Section ---- */}
            <div
              style={{
                margin: "3rem 0",
                padding: "1.75rem",
                background:
                  "linear-gradient(135deg, rgba(232,93,38,0.05), rgba(29,53,87,0.04))",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-border)",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "var(--color-text)",
                  marginBottom: "0.4rem",
                }}
              >
                Found this helpful?
              </p>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--color-muted)",
                  marginBottom: "1.25rem",
                  fontFamily: "var(--font-ui)",
                }}
              >
                Share it with someone who needs to read this.
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "0.75rem",
                  flexWrap: "wrap",
                }}
              >
                {/* Twitter / X */}
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(url)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.55rem 1.1rem",
                    borderRadius: "99px",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    fontFamily: "var(--font-ui)",
                    background: "#000",
                    color: "#fff",
                    textDecoration: "none",
                    transition: "opacity 0.2s",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Share on X
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(post.title + " " + url)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.55rem 1.1rem",
                    borderRadius: "99px",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    fontFamily: "var(--font-ui)",
                    background: "#25D366",
                    color: "#fff",
                    textDecoration: "none",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>

                {/* Copy Link */}
                <ShareButtons url={url} title={post.title} />
              </div>
            </div>

            {/* ---- Back to Home ---- */}
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
                  transition: "color 0.2s",
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

      {/* ---- Reading Progress Script ---- */}
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

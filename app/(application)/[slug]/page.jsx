import Link from "next/link";
import Image from "next/image";
import getSingleArticle from "@/lib/actions/getSingleArticle";
export const dynamic = "force-static";
export const revalidate = 3600; // revalidate every hour

function getPlainText(html = "", maxLen = 160) {
  const text = html.replace(/<[^>]+>/g, "");
  return text.length > maxLen
    ? text.slice(0, maxLen).trim() + "…"
    : text.trim();
}

// ✅ SEO Metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const res = await getSingleArticle(slug);
  const post = res?.data;

  if (!post) {
    return {
      title: "404 - Post Not Found | NewSync",
      description: "No article found.",
      robots: { index: false, follow: false },
    };
  }

  const title = `${post.title} | NewSync`;
  const description = getPlainText(post.description);
  const url = `${process.env.SITE_URL}/post/${slug}`;
  const image = post.image?.url || `${process.env.SITE_URL}/newsync.png`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "NewSync",
      type: "article",
      images: [{ url: image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@NewSync",
    },
    robots: { index: true, follow: true },
  };
}

// ✅ Main Page Component
export default async function PostPage({ params }) {
  const { slug } = await params;
  const res = await getSingleArticle(slug);
  const post = res?.data;

  if (!post) {
    return (
      <section className="px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-2">404 - Post Not Found</h1>
        <p className="text-gray-600">
          The article you’re looking for doesn’t exist or has been removed.
        </p>
        <Link
          href="/"
          className="inline-block mt-4 text-blue-600 hover:underline"
        >
          Go back home
        </Link>
      </section>
    );
  }

  return (
    <article className="max-w-4xl mx-auto md:px-4 md:py-10 px-3 py-6">
      {/* ✅ Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:underline text-blue-600">
          Home
        </Link>{" "}
        ›{" "}
        <Link href="/blog" className="hover:underline text-blue-600">
          Articles
        </Link>{" "}
        ›{" "}
        <span className="text-gray-800 font-medium capitalize">
          {slug.replaceAll("-", " ")}
        </span>
      </nav>

      {/* ✅ Header */}
      <header className="mb-6">
        <h1 className="text-2xl md:text-4xl font-bold mb-3">{post.title}</h1>
        <p className="text-sm text-gray-600">
          By{" "}
          <span className="font-medium">
            {post.postedBy?.username || "Admin"}
          </span>{" "}
          •{" "}
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </header>

      {/* ✅ Featured Image */}
      {post.image?.url && (
        <div className="relative h-[200px] md:h-[400px] mb-6 w-full overflow-hidden rounded-md shadow-md">
          <Image
            src={post.image.url}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* ✅ Article Body */}
      <div
        className="prose prose-lg max-w-none text-gray-800 leading-7"
        dangerouslySetInnerHTML={{ __html: post.description }}
      />
    </article>
  );
}

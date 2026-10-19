import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { learningPosts } from "@/content/ml-posts";

export const metadata: Metadata = {
  title: "My ML Learning",
  description: "Posts and small projects from my machine-learning journey.",
};

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export default function MLLearningsPage() {
  const posts = [...learningPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
      <Link href="/" className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
        Back to home
      </Link>

      <header className="mb-8 mt-6 border-b border-border pb-6">
        <h1 className="font-serif text-3xl text-foreground sm:text-4xl">My ML learning</h1>
        <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
          Posts from what I’m learning and building. Newest first.
        </p>
      </header>

      <ol className="divide-y divide-border" aria-label="My machine-learning posts">
        {posts.map((post) => (
          <li key={post.id} className="py-8 first:pt-0">
            <article aria-labelledby={`${post.id}-title`}>
              <p className="mb-3 text-sm text-muted-foreground">
                <time dateTime={post.publishedAt}>{dateFormat.format(new Date(post.publishedAt))}</time>
                <span aria-hidden="true"> · </span>
                <span>{post.platform}</span>
              </p>
              <h2 id={`${post.id}-title`} className="font-serif text-2xl leading-snug text-foreground sm:text-3xl">
                {post.title}
              </h2>

              <div className="mt-4 space-y-3 text-[15px] leading-7 text-neutral-700 dark:text-neutral-300 sm:text-base sm:leading-8">
                {post.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>

              {post.video && (
                <figure className="mt-5">
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    poster={post.video.poster}
                    width={post.video.width}
                    height={post.video.height}
                    aria-label={post.video.description}
                    className="h-auto w-full border border-border bg-black"
                  >
                    <source src={post.video.src} type="video/mp4" />
                    Your browser cannot play this video. <a href={post.url}>Watch it on X.</a>
                  </video>
                  <figcaption className="mt-2 text-sm leading-6 text-muted-foreground">
                    {post.video.description}
                  </figcaption>
                </figure>
              )}

              {post.images && (
                <div className="mt-5 space-y-3">
                  {post.images.map((photo) => (
                    <a key={photo.src} href={photo.src} target="_blank" rel="noopener noreferrer" aria-label={`Open image: ${photo.alt}`} className="block">
                      <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 768px) 100vw, 704px" className="h-auto w-full border border-border" />
                    </a>
                  ))}
                </div>
              )}

              <a href={post.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block text-sm text-foreground underline underline-offset-4">
                Original post on {post.platform}
              </a>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}

import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Wrapper } from "@/components";
import BlogContent from "@/components/BlogContent"; // <-- import Client Component

export const dynamic = "force-dynamic";

export default async function BlogDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const blog = await db.blog.findUnique({
    where: { id: params.id },
    include: { author: { select: { name: true } } },
  });

  if (!blog) {
    notFound();
  }

  await db.$transaction(async (tx) => {
    await tx.blog.update({
      where: { id: params.id },
      data: { views: { increment: 1 } },
    });
  });

  return (
    <Wrapper className="py-12">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

        {blog.subtitle && (
          <h2 className="text-xl text-gray-600 mb-4">{blog.subtitle}</h2>
        )}

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
          <span>By {blog.author?.name || "Anonymous"}</span>
          <span>•</span>
          <span>
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span>•</span>
          <span>{blog.views} views</span>
          <span>•</span>
          <span>{blog.commentsCount} comments</span>
        </div>

        {blog.thumbnail && (
          <div className="mb-6">
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Render Tiptap content client-side */}
        <BlogContent content={blog.content as any} />

        <div className="mt-6 text-sm text-gray-500">
          Category: {blog.category || "Uncategorized"}
        </div>
      </article>
    </Wrapper>
  );
}

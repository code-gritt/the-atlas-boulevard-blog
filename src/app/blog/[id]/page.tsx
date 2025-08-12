import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";
import { Wrapper } from "@/components";
import ClientWrapper from "@/components/client-wrapper";

export const dynamic = "force-dynamic";

const BlogDetailPage = async ({ params }: { params: { id: string } }) => {
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
    <ClientWrapper>
      <Wrapper className="py-12">
        <article className="max-w-3xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-lg transition-colors duration-300">
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            {blog.title}
          </h1>
          {blog.subtitle && (
            <h2 className="text-xl mb-4 text-gray-600 dark:text-gray-400">
              {blog.subtitle}
            </h2>
          )}
          <div className="flex items-center gap-4 text-sm mb-6 text-gray-500 dark:text-gray-400">
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
          <div className="prose max-w-none whitespace-pre-line text-gray-800 dark:text-gray-200 transition-colors duration-300">
            {blog.contentText || "No content available"}
          </div>
          <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
            Category: {blog.category || "Uncategorized"}
          </div>
        </article>
      </Wrapper>
    </ClientWrapper>
  );
};

export default BlogDetailPage;

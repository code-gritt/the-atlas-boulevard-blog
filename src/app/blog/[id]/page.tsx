import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";
import { Wrapper } from "@/components";
import LikeButton from "@/components/LikeButton";
import BookmarkButton from "@/components/BookmarkButton";
import CommentsSection from "@/components/CommentsSection";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import ClientWrapper from "@/components/client-wrapper";

export const dynamic = "force-dynamic";

const BlogDetailPage = async ({ params }: { params: { id: string } }) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const blog = await db.blog.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      title: true,
      subtitle: true,
      contentText: true,
      category: true,
      thumbnail: true,
      createdAt: true,
      views: true,
      author: { select: { name: true } },
      _count: { select: { likes: true, comments: true } },
    },
  });

  if (!blog) {
    notFound();
  }

  await db.blog.update({
    where: { id: params.id },
    data: { views: { increment: 1 } },
  });

  const isLiked = user
    ? (await db.like.count({ where: { userId: user.id, blogId: params.id } })) >
      0
    : false;
  const isBookmarked = user
    ? (await db.bookmark.count({
        where: { userId: user.id, blogId: params.id },
      })) > 0
    : false;

  return (
    <ClientWrapper>
      <Wrapper className="py-12 bg-white dark:bg-gray-900 transition-colors">
        <article className="max-w-3xl mx-auto">
          {/* Title */}
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            {blog.title}
          </h1>

          {/* Subtitle */}
          {blog.subtitle && (
            <h2 className="text-xl text-gray-600 dark:text-gray-400 mb-4">
              {blog.subtitle}
            </h2>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
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
            <LikeButton
              blogId={blog.id}
              initialLiked={isLiked}
              initialLikes={blog._count.likes}
            />
            <span>•</span>
            <span>{blog._count.comments} comments</span>
            {user && (
              <BookmarkButton
                blogId={blog.id}
                initialBookmarked={isBookmarked}
              />
            )}
          </div>

          {/* Thumbnail */}
          {blog.thumbnail && (
            <div className="mb-6">
              <Image
                src={blog.thumbnail}
                alt={blog.title}
                width={800}
                height={400}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose dark:prose-invert max-w-none whitespace-pre-line">
            {blog.contentText || "No content available"}
          </div>

          {/* Category */}
          <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            Category: {blog.category || "Uncategorized"}
          </div>

          {/* Comments */}
          <CommentsSection blogId={blog.id} isAuthenticated={!!user} />
        </article>
      </Wrapper>
    </ClientWrapper>
  );
};

export default BlogDetailPage;

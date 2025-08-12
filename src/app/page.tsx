import { Wrapper } from "@/components";
import ClientWrapper from "@/components/client-wrapper";
import { db } from "@/lib/db";
import Link from "next/link";
import React from "react";
import LikeButton from "@/components/LikeButton";
import BookmarkButton from "@/components/BookmarkButton";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";

const HomePage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const blogs = await db.blog.findMany({
    include: {
      author: { select: { name: true } },
      _count: { select: { likes: true, comments: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  let userLikes: string[] = [];
  let userBookmarks: string[] = [];

  if (user?.id) {
    userLikes = (
      await db.like.findMany({
        where: { userId: user.id },
        select: { blogId: true },
      })
    ).map((l) => l.blogId);

    userBookmarks = (
      await db.bookmark.findMany({
        where: { userId: user.id },
        select: { blogId: true },
      })
    ).map((b) => b.blogId);
  }

  return (
    <ClientWrapper>
      <div className="bg-slate-50 dark:bg-gray-900 min-h-screen transition-colors">
        <section className="py-12">
          <Wrapper>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              Latest Stories
            </h2>
            <div className="space-y-8 max-w-3xl w-full">
              {blogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.id}`}
                  className="flex flex-col md:flex-row justify-between gap-4 group border-b border-gray-200 dark:border-gray-700 pb-4"
                >
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      In {blog.category || "Stories"} by{" "}
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        {blog.author?.name || "Anonymous"}
                      </span>
                    </p>
                    <h3 className="text-lg font-bold mt-1 text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                      {blog.contentText?.slice(0, 100) + "..." ||
                        "No content available"}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mt-3">
                      <span>
                        {blog.createdAt.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span>•</span>
                      <span>{blog.views} views</span>
                      <span>•</span>
                      <LikeButton
                        blogId={blog.id}
                        initialLiked={userLikes.includes(blog.id)}
                        initialLikes={blog._count.likes}
                      />
                      <span>•</span>
                      <span>{blog._count.comments} comments</span>
                      {user && (
                        <BookmarkButton
                          blogId={blog.id}
                          initialBookmarked={userBookmarks.includes(blog.id)}
                        />
                      )}
                    </div>
                  </div>
                  {blog.thumbnail && (
                    <div className="w-full md:w-40 h-28 flex-shrink-0">
                      <Image
                        src={blog.thumbnail}
                        alt={blog.title}
                        width={160}
                        height={112}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </Wrapper>
        </section>
      </div>
    </ClientWrapper>
  );
};

export default HomePage;

import { Wrapper } from "@/components";
import ClientWrapper from "@/components/client-wrapper";
import { db } from "@/lib/db";
import Link from "next/link";
import React from "react";

const HomePage = async () => {
  const blogs = await db.blog.findMany({
    include: { author: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <ClientWrapper>
      <div className="bg-slate-50">
        <section className="py-12">
          <Wrapper>
            <h2 className="text-2xl font-bold mb-6">Latest Stories</h2>
            <div className="space-y-8">
              {blogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.id}`}
                  className="flex flex-col md:flex-row justify-between gap-4 group"
                >
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">
                      In {blog.category || "Stories"} by{" "}
                      <span className="font-medium">
                        {blog.author?.name || "Anonymous"}
                      </span>
                    </p>
                    <h3 className="text-lg font-bold mt-1 group-hover:text-primary transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {blog.contentText?.slice(0, 100) + "..." ||
                        "No content available"}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-3">
                      <span>
                        {new Date(blog.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span>•</span>
                      <span>{blog.views} views</span>
                      <span>•</span>
                      <span>{blog.commentsCount} comments</span>
                    </div>
                  </div>
                  {blog.thumbnail && (
                    <div className="w-full md:w-40 h-28 flex-shrink-0">
                      <img
                        src={blog.thumbnail}
                        alt={blog.title}
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

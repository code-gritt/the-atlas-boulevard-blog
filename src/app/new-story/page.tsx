import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { db } from "@/lib/db";
import { Textarea } from "@/components/ui/textarea";

export const metadata: Metadata = {
  title: "New Story",
};

const NewStoryPage = async () => {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/api/auth/login");
  }

  const dbUser = await db.user.findUnique({
    where: { id: user?.id },
    select: { credits: true },
  });

  if (!dbUser || dbUser.credits < 5) {
    redirect("/pricing");
  }

  return (
    <div className="flex min-h-screen w-full bg-muted/40 dark:bg-muted-dark/40 pt-20 transition-colors duration-300">
      <div className="max-w-3xl mx-auto w-full p-6">
        <form
          action="/api/publish-blog"
          method="POST"
          encType="multipart/form-data"
          className="space-y-4"
        >
          <Input
            name="title"
            placeholder="Title"
            className="mb-4 text-3xl font-bold bg-white dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-600"
            required
          />
          <Input
            name="subtitle"
            placeholder="Subtitle"
            className="mb-4 bg-white dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-600"
          />
          <Input
            name="category"
            placeholder="Category (e.g., Tech, Lifestyle)"
            className="mb-4 bg-white dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-600"
          />
          <Input
            type="file"
            name="thumbnail"
            accept="image/*"
            className="mb-4 bg-white dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-600"
            placeholder="Upload Thumbnail"
          />
          <Textarea
            name="contentText"
            placeholder="Write your story here..."
            className="w-full h-40 p-2 mb-4 border rounded resize-y bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600"
            required
          />
          <Button type="submit" className="mt-4">
            Publish
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewStoryPage;

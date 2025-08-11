import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { EditorComponent } from "@/components/Editor";
import { Button } from "@/components/ui/Button";
import { db } from "@/lib/db";

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
    <div className="flex min-h-screen w-full bg-muted/40 pt-20">
      <div className="max-w-3xl mx-auto w-full p-6">
        <form action="/api/publish-blog" method="POST">
          <Input
            name="title"
            placeholder="Title"
            className="mb-4 text-3xl font-bold"
            required
          />
          <Input name="subtitle" placeholder="Subtitle" className="mb-4" />
          <Input
            name="category"
            placeholder="Category (e.g., Tech, Lifestyle)"
            className="mb-4"
          />
          <Input
            name="thumbnail"
            placeholder="Thumbnail URL (e.g., https://example.com/image.jpg)"
            className="mb-4"
          />
          <Input
            name="contentText"
            placeholder="Optional text summary (auto-generated if left blank)"
            className="mb-4"
          />
          <EditorComponent />
          <Button type="submit" className="mt-4">
            Publish
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewStoryPage;

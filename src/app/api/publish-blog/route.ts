import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const title = formData.get("title") as string;
  const subtitle = formData.get("subtitle") as string | null;
  const category = formData.get("category") as string | null;
  const thumbnail = formData.get("thumbnail") as string | null;
  const contentText = formData.get("contentText") as string; // Plain text content

  const dbUser = await db.user.findUnique({
    where: { id: user.id },
    select: { credits: true },
  });

  if (typeof dbUser?.credits === "number" && dbUser.credits < 5) {
    return NextResponse.redirect(new URL("/pricing", req.url));
  }
  await db.$transaction(async (tx) => {
    await tx.blog.create({
      data: {
        title,
        content: {}, // Empty JSON object since we're not using Tiptap
        authorId: user.id,
        subtitle,
        category,
        contentText, // Store plain text content here
        thumbnail,
        views: 0,
        commentsCount: 0,
      },
    });
    await tx.user.update({
      where: { id: user.id },
      data: { credits: { decrement: 5 } },
    });
  });

  return NextResponse.redirect(new URL("/", req.url));
}

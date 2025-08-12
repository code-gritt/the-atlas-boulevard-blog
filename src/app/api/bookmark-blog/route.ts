import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { blogId } = await req.json();

  if (!blogId) {
    return NextResponse.json({ error: "Missing blogId" }, { status: 400 });
  }

  const existingBookmark = await db.bookmark.findUnique({
    where: { userId_blogId: { userId: user.id, blogId } },
  });

  if (existingBookmark) {
    // Unbookmark
    await db.bookmark.delete({
      where: { id: existingBookmark.id },
    });
    return NextResponse.json({ bookmarked: false });
  } else {
    // Bookmark
    await db.bookmark.create({
      data: { userId: user.id, blogId },
    });
    return NextResponse.json({ bookmarked: true });
  }
}

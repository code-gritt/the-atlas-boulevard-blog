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

  const existingLike = await db.like.findUnique({
    where: { userId_blogId: { userId: user.id, blogId } },
  });

  if (existingLike) {
    // Unlike
    await db.like.delete({
      where: { id: existingLike.id },
    });
    return NextResponse.json({ liked: false });
  } else {
    // Like
    await db.like.create({
      data: { userId: user.id, blogId },
    });
    return NextResponse.json({ liked: true });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { blogId, content } = await req.json();

  if (!blogId || !content) {
    return NextResponse.json(
      { error: "Missing blogId or content" },
      { status: 400 }
    );
  }

  const comment = await db.comment.create({
    data: { userId: user.id, blogId, content },
  });

  return NextResponse.json(comment);
}

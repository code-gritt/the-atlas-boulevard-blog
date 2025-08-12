import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/lib/db";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: "dixptruyr",
  api_key: "245138847326732",
  api_secret: "0HbUELzR0VoXwD8XsIy8iF4E-GQ",
});

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
  const contentText = formData.get("contentText") as string;
  const thumbnailFile = formData.get("thumbnail") as File | null;

  let thumbnailUrl: string | null = null;
  if (thumbnailFile) {
    const bytes = await thumbnailFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    thumbnailUrl = await new Promise<string>((resolve, reject) => {
      cloudinary.v2.uploader
        .upload_stream(
          { folder: "blog-thumbnails", resource_type: "image" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result!.secure_url);
          }
        )
        .end(buffer);
    });
  }

  const dbUser = await db.user.findUnique({
    where: { id: user.id },
    select: { credits: true },
  });

  if (!dbUser || (dbUser.credits ?? 0) < 5) {
    return NextResponse.redirect(new URL("/pricing", req.url));
  }

  await db.$transaction(async (tx) => {
    await tx.blog.create({
      data: {
        title,
        content: {}, // Empty JSON object (can be removed if not needed)
        authorId: user.id,
        subtitle,
        category,
        contentText,
        thumbnail: thumbnailUrl,
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

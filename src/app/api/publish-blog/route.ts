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
  const content = JSON.parse(formData.get("content") as string);

  const dbUser = await db.user.findUnique({
    where: { id: user.id },
    select: { credits: true },
  });

  if (!dbUser || dbUser.credits < 5) {
    return NextResponse.redirect(new URL("/pricing", req.url));
  }
  await db.$transaction(
    async (tx: {
      blog: {
        create: (arg0: {
          data: { title: string; content: any; authorId: string };
        }) => any;
      };
      user: {
        update: (arg0: {
          where: { id: string };
          data: { credits: { decrement: number } };
        }) => any;
      };
    }) => {
      await tx.blog.create({
        data: {
          title,
          content,
          authorId: user.id,
        },
      });
      await tx.user.update({
        where: { id: user.id },
        data: { credits: { decrement: 5 } },
      });
    }
  );

  return NextResponse.redirect(new URL("/", req.url));
}

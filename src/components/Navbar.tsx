import React from "react";
import Wrapper from "./utils/Wrapper";
import Link from "next/link";
import { buttonVariants } from "./ui/Button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UserAccount from "./user/UserAccount";
import { db } from "@/lib/db";

interface Props {}

const Navbar: React.FC<Props> = async () => {
  const { getUser, isAuthenticated } = getKindeServerSession();

  const user = await getUser();
  const authenticated = await isAuthenticated();

  let credits = 0;
  if (authenticated && user?.id) {
    const dbUser = await db.user.findUnique({
      where: { id: user.id },
      select: { credits: true },
    });
    credits = dbUser?.credits || 0;
  }

  return (
    <header className="sticky z-[80] h-14 inset-x-0 top-0 w-full border-b border-border bg-white/50 backdrop-blur-lg transition-all">
      <Wrapper>
        <div className="flex h-14 items-center justify-between border-b border-border">
          <Link href="/" className="flex z-40 font-semibold text-xl">
            The Atlas <span className="text-primary ml-1"> Boulevard</span>
          </Link>

          <div className="flex items-center space-x-4 h-full">
            {user ? (
              <>
                {/* <Link href="/api/auth/logout" className={buttonVariants({ size: "sm", variant: "ghost" })}>
                                    Sign out
                                </Link> */}
                <span className="text-sm font-medium">Credits: {credits}</span>
                <Link
                  href="/new-story"
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden sm:flex items-center gap-1",
                  })}
                >
                  Write ⚡
                </Link>

                <UserAccount user={user} />
              </>
            ) : (
              <>
                <Link
                  href="/api/auth/register"
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  Sign up
                </Link>
                <Link
                  href="/api/auth/login"
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </Wrapper>
    </header>
  );
};

export default Navbar;

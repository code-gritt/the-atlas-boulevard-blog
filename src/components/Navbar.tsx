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
        <div className="flex items-center justify-between h-14 border-b border-border relative">
          <Link href="/" className="flex z-40 font-semibold text-xl">
            The Atlas <span className="text-primary ml-1"> Boulevard</span>
          </Link>

          {/* Mobile menu toggle checkbox (hidden) */}
          <input type="checkbox" id="menu-toggle" className="peer hidden" />

          {/* Hamburger icon */}
          <label
            htmlFor="menu-toggle"
            className="sm:hidden flex flex-col cursor-pointer p-2 space-y-1"
            aria-label="Toggle menu"
          >
            <span className="block w-6 h-0.5 bg-gray-700 peer-checked:hidden transition-all"></span>
            <span className="block w-6 h-0.5 bg-gray-700 peer-checked:rotate-45 peer-checked:translate-y-1.5 transition-all"></span>
            <span className="block w-6 h-0.5 bg-gray-700 peer-checked:-rotate-45 peer-checked:-translate-y-1.5 transition-all"></span>
          </label>

          {/* Desktop menu */}
          <nav className="hidden sm:flex items-center space-x-4 h-full">
            {user ? (
              <>
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
          </nav>

          {/* Mobile menu, visible only when checkbox is checked */}
          <nav
            className="peer-checked:flex flex-col space-y-2 sm:hidden absolute top-full right-0 bg-white border border-border rounded shadow-md p-4 w-48 z-50 hidden"
            aria-label="Mobile menu"
          >
            {user ? (
              <>
                <span className="text-sm font-medium">Credits: {credits}</span>
                <Link
                  href="/new-story"
                  className={buttonVariants({ size: "sm" })}
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
          </nav>
        </div>
      </Wrapper>
    </header>
  );
};

export default Navbar;

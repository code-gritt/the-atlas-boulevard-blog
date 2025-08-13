import React from "react";
import Wrapper from "./utils/Wrapper";
import Link from "next/link";
import { buttonVariants } from "./ui/Button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UserAccount from "./user/UserAccount";
import { db } from "@/lib/db";
import ThemeToggle from "./ThemeToggle";

const aiProducts = {
  title: "AI Products",
  links: [
    { name: "Nuvonote", href: "https://nuvonote.vercel.app" },
    { name: "Workafloat AI", href: "https://workafloat-ai.vercel.app" },
    { name: "ContenGen AI", href: "https://contengen-ai.vercel.app/" },
    { name: "TerraNovoa AI", href: "https://terranovoa-ai.vercel.app/" },
    { name: "VisualAIze", href: "https://visualaize-vert.vercel.app/" },
    { name: "LernKarte AI", href: "https://lernkarte-ai.vercel.app/" },
    { name: "Geldify AI", href: "https://geldify-ai.vercel.app/" },
    { name: "PruneUrl", href: "https://prune-url.vercel.app/" },
    { name: "Resumesque AI", href: "https://resumesque-ai.vercel.app/" },
    { name: "Orqly AI", href: "https://orqly-ai.vercel.app/" },
  ],
};

const blogs = {
  title: "Blogs",
  links: [
    { name: "Devverse", href: "https://devverse-astro.vercel.app/" },
    {
      name: "The Atlas Boulevard",
      href: "https://the-atlas-boulevard.vercel.app/",
    },
    {
      name: "Ich Spreche Deutsch",
      href: "https://ich-spreche-deutsch.vercel.app/",
    },
  ],
};

const Navbar = async () => {
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
    <header className="sticky z-[80] h-14 inset-x-0 top-0 w-full border-b border-border bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg transition-all">
      <Wrapper>
        <div className="flex items-center justify-between h-14 relative">
          {/* Logo */}
          <Link href="/" className="flex z-40 font-semibold text-xl">
            The Atlas <span className="text-primary ml-1"> Boulevard</span>
          </Link>

          {/* Mobile toggle */}
          <input type="checkbox" id="menu-toggle" className="peer hidden" />
          <label
            htmlFor="menu-toggle"
            className="sm:hidden flex flex-col cursor-pointer p-2 space-y-1"
          >
            <span className="block w-6 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all"></span>
            <span className="block w-6 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all"></span>
            <span className="block w-6 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all"></span>
          </label>

          {/* Desktop menu */}
          <nav className="hidden sm:flex items-center space-x-6 h-full">
            <div className="relative group">
              <span
                className={buttonVariants({
                  size: "sm",
                  className: "hidden sm:flex items-center gap-1",
                })}
              >
                {blogs.title}
              </span>
              <div className="absolute top-7 left-0 mt-2 hidden group-hover:block bg-white dark:bg-gray-800 border border-border rounded-lg shadow-lg p-2 min-w-[200px] z-50">
                {blogs.links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    className="block px-4 py-2 font-bold text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* AI Products Dropdown */}
            <div className="relative group">
              <span
                className={buttonVariants({
                  size: "sm",
                  className: "hidden sm:flex items-center gap-1",
                })}
              >
                {aiProducts.title}
              </span>
              <div className="absolute top-7 left-0 mt-2 hidden group-hover:block bg-white dark:bg-gray-800 border border-border rounded-lg shadow-lg p-2 min-w-[200px] z-50">
                {aiProducts.links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    className="block px-4 py-2 font-bold text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

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
            <ThemeToggle />
          </nav>

          {/* Mobile menu */}
          <nav className="peer-checked:flex flex-col space-y-3 sm:hidden absolute top-full right-0 bg-white dark:bg-gray-900 border border-border rounded shadow-md p-4 w-56 z-50 hidden">
            <details className="w-full">
              <summary className="cursor-pointer font-medium text-gray-700 dark:text-gray-300">
                {blogs.title}
              </summary>
              <div className="mt-2 space-y-2">
                {blogs.links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </details>

            {/* AI Products for mobile */}
            <details className="w-full">
              <summary className="cursor-pointer font-medium text-gray-700 dark:text-gray-300">
                {aiProducts.title}
              </summary>
              <div className="mt-2 space-y-2">
                {aiProducts.links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </details>

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
            <ThemeToggle />
          </nav>
        </div>
      </Wrapper>
    </header>
  );
};

export default Navbar;

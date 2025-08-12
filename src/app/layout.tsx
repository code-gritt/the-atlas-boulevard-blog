import { DM_Sans } from "next/font/google";
import "@/styles/globals.css";
import { Footer, Navbar, Providers } from "@/components";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/Sonner";
import { SITE_CONFIG } from "@/config";
import { ThemeProvider } from "@/components/theme-provider";

const font = DM_Sans({
  subsets: ["latin"],
});

export const metadata = SITE_CONFIG;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="google-site-verification"
          content="wdlByCZtt15adBudf4vuQ__pWccGvhmx4kxx4n_1pLY"
        />
        <meta name="google-adsense-account" content="ca-pub-8291461267710066" />
      </head>
      <body
        className={cn(
          "min-h-screen antialiased",
          font.className,
          "dark:bg-gray-900 dark:text-gray-100"
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Providers>
            <Navbar />
            <Toaster richColors theme="light" />
            <main className="flex flex-col min-h-[calc(100vh-3.5rem-1px)]">
              <div className="flex-1 flex flex-col h-full">{children}</div>
              <Footer />
            </main>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}

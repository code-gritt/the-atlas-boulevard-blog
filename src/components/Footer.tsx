import React from "react";
import Wrapper from "./utils/Wrapper";
import { Button } from "./ui/Button";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative bg-background py-8">
      <Wrapper>
        <div className="border-t border-border pt-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
            {/* Company */}
            <div>
              <h4 className="mb-3 text-sm font-semibold text-foreground">
                Company
              </h4>
              <ul className="space-y-2">
                {[
                  ["About", "https://portfolio-devsite.netlify.app/"],
                  [
                    "LinkedIn",
                    "https://www.linkedin.com/in/gokul-va-14a304a5/",
                  ],
                  ["Blog", "https://devverse-astro.vercel.app/"],
                  ["YoutTube", "https://www.youtube.com/@DevvResolve"],
                ].map(([name, href]) => (
                  <li key={name}>
                    <Link
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* AI Products */}
            <div>
              <h4 className="mb-3 text-sm font-semibold text-foreground">
                AI Products
              </h4>
              <ul className="space-y-2">
                {[
                  ["Nuvonote", "https://nuvonote.vercel.app"],
                  ["Workafloat AI", "https://workafloat-ai.vercel.app"],
                  ["ContenGen AI", "https://contengen-ai.vercel.app/"],
                  ["TerraNovoa AI", "https://terranovoa-ai.vercel.app/"],
                  ["VisualAIze", "https://visualaize-vert.vercel.app/"],
                  ["LernKarte AI", "https://lernkarte-ai.vercel.app/"],
                  ["Geldify AI", "https://geldify-ai.vercel.app/"],
                  ["PruneUrl", "https://prune-url.vercel.app/"],
                  ["Resumesque AI", "https://resumesque-ai.vercel.app/"],
                  ["Orqly AI", "https://orqly-ai.vercel.app/"],
                  ["Rocliq", "https://rocliq.vercel.app/"],
                ].map(([name, href]) => (
                  <li key={name}>
                    <Link
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Blogs */}
            <div>
              <h4 className="mb-3 text-sm font-semibold text-foreground">
                Blogs
              </h4>
              <ul className="space-y-2">
                {[
                  ["Devverse", "https://devverse-astro.vercel.app/"],
                  [
                    "The Atlas Boulevard",
                    "https://the-atlas-boulevard.vercel.app/",
                  ],
                  [
                    "Ich Spreche Deutsch",
                    "https://ich-spreche-deutsch.vercel.app/",
                  ],
                  [
                    "Je Parle Francais",
                    "https://je-parle-francais.vercel.app/",
                  ],
                ].map(([name, href]) => (
                  <li key={name}>
                    <Link
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="mb-3 text-sm font-semibold text-foreground">
                Resources
              </h4>
              <ul className="space-y-2">
                {[
                  ["Help Center", "/help-center"],
                  ["Community", "/community"],
                  ["Guides", "/guides"],
                ].map(([name, href]) => (
                  <li key={name}>
                    <Link
                      href={href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="mb-3 text-sm font-semibold text-foreground">
                Legal
              </h4>
              <ul className="space-y-2">
                {[
                  ["Privacy", "/privacy"],
                  ["Terms", "/terms"],
                  ["Cookies", "/cookies"],
                ].map(([name, href]) => (
                  <li key={name}>
                    <Link
                      href={href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="flex flex-col items-center justify-between mt-8 border-t border-border pt-4 md:flex-row">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              &copy; {new Date().getFullYear()} All rights reserved
            </p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <Link href="/terms">
                <Button variant="ghost">Terms</Button>
              </Link>
              <Link href="/privacy">
                <Button variant="ghost">Privacy Policy</Button>
              </Link>
            </div>
          </div>
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;

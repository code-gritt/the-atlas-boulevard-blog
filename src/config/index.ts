import { Metadata } from "next";

export const PRODUCT_PRICES = {
  material: {
    sillicone: 0,
    metal: 100,
    leather: 100,
    carbon_fiber: 150,
    polycarbonate: 50,
  },
  finish: {
    smooth: 0,
    textured: 50,
    matte: 100,
    glossy: 50,
    transparent: 75,
    frosted: 100,
    brushed: 100,
  },
} as const;

export const BASE_PRICE = 12_00;

export const SITE_CONFIG: Metadata = {
  title: {
    default: "The Atlas Boulevard | Your Window to the World’s Cities",
    template: `%s | The Atlas Boulevard`,
  },
  description:
    "The Atlas Boulevard is your destination for cosmopolitan stories, culture, and insights from the world’s great cities.",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        href: "/favicon.ico",
      },
    ],
  },
  openGraph: {
    title: "The Atlas Boulevard | Your Window to the World’s Cities",
    description:
      "The Atlas Boulevard is your destination for cosmopolitan stories, culture, and insights from the world’s great cities.",
    images: [
      {
        url: "/og-image.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@stylar",
    title: "The Atlas Boulevard - Explore the Global City",
    description:
      "The Atlas Boulevard is your destination for cosmopolitan stories, culture, and insights from the world’s great cities.",
    images: [
      {
        url: "/og-image.png",
      },
    ],
  },
  metadataBase: new URL("https://the-atlas-boulevard.vercel.app"),
};

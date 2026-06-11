import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aiverse.ai"),
  title: "AIVERSE — Luxury Jewellery Ads Created With AI",
  description:
    "AIVERSE transforms ordinary jewellery product images into premium cinematic advertisements, AI influencer videos and social campaigns — no photoshoots, no models, no production crews. Delivered in 48 hours.",
  keywords: [
    "AI jewellery advertising",
    "jewellery video ads",
    "AI UGC ads",
    "AI model photoshoot",
    "jewellery marketing",
    "luxury product videos",
    "AI advertising agency",
  ],
  openGraph: {
    title: "AIVERSE — Luxury Jewellery Ads Created With AI",
    description:
      "Premium cinematic jewellery advertisements created with AI. No photoshoots. No models. 48-hour delivery.",
    type: "website",
    siteName: "AIVERSE.AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "AIVERSE — Luxury Jewellery Ads Created With AI",
    description:
      "Premium cinematic jewellery advertisements created with AI. No photoshoots. No models. 48-hour delivery.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

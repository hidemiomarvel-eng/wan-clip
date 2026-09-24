import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { Heart, Search } from "lucide-react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WanClip",
  description:
    "Dog-friendly spot sharing service for community-curated recommendations.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-wan-ivory text-wan-navy">
        <nav className="border-b border-wan-border bg-white">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="text-xl font-extrabold tracking-tight text-wan-navy transition-colors hover:text-wan-orange"
            >
              WanClip
            </Link>
            <div className="flex items-center gap-6 text-base font-semibold text-wan-navy">
              <Link
                className="inline-flex items-center gap-2 transition-colors hover:text-wan-orange"
                href="/spots"
              >
                <Search aria-hidden="true" className="h-4 w-4" />
                スポット一覧
              </Link>
              <Link
                className="inline-flex items-center gap-2 transition-colors hover:text-wan-orange"
                href="/want-to-go"
              >
                <Heart aria-hidden="true" className="h-4 w-4" />
                行きたい一覧
              </Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}

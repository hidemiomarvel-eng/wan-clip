import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
      <body className="flex min-h-full flex-col bg-stone-50 text-slate-800">
        <nav className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="text-lg font-bold tracking-tight text-slate-900"
            >
              WanClip
            </Link>
            <div className="flex items-center gap-4 text-sm font-medium text-slate-600">
              <Link className="transition-colors hover:text-slate-900" href="/spots">
                スポット一覧
              </Link>
              <Link
                className="transition-colors hover:text-slate-900"
                href="/want-to-go"
              >
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

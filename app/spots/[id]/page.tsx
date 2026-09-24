"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import { SpotDetail } from "@/components/spots/SpotDetail";
import { spots as mockSpots } from "@/lib/mock-data";
import { getStoredSpotById } from "@/lib/spot-storage";

export default function SpotDetailPage() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const id = params.id;
  const backHref =
    searchParams.get("from") === "want-to-go" ? "/want-to-go" : "/spots";
  const backLabel =
    backHref === "/want-to-go" ? "行きたい一覧へ戻る" : "スポット一覧へ戻る";

  const spot = useMemo(() => {
    if (typeof window === "undefined") {
      return mockSpots.find((item) => item.id === id);
    }

    return mockSpots.find((item) => item.id === id) ?? getStoredSpotById(id);
  }, [id]);

  if (!spot) {
    return (
      <main className="min-h-screen bg-wan-ivory px-4 py-10 text-wan-navy sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
            WanClip
          </p>
          <h1 className="mt-4 text-3xl font-bold text-wan-navy">
            スポットが見つかりませんでした
          </h1>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            指定されたスポットは削除されたか、URLが正しくありません。
          </p>
          <Link
            href={backHref}
            className="mt-6 inline-flex items-center rounded-full bg-wan-orange px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-700"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            {backLabel}
          </Link>
        </div>
      </main>
    );
  }

  return <SpotDetail spot={spot} backHref={backHref} />;
}

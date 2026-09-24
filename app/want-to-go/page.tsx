"use client";

import Link from "next/link";
import { useMemo, useSyncExternalStore, useState } from "react";
import { SpotCard } from "@/components/spots/SpotCard";
import { spots as mockSpots } from "@/lib/mock-data";
import { getStoredSpots } from "@/lib/spot-storage";
import {
  getWantToGoSnapshot,
  subscribeWantToGo,
} from "@/lib/want-to-go-storage";
import type { Spot } from "@/types/spot";

export default function WantToGoPage() {
  const [storedSpots] = useState<Spot[]>(() => getStoredSpots());
  const wantToGoSnapshot = useSyncExternalStore(
    subscribeWantToGo,
    getWantToGoSnapshot,
    () => "[]",
  );
  const wantToGoIds = JSON.parse(wantToGoSnapshot) as string[];
  const wantToGoIdSet = useMemo(() => new Set(wantToGoIds), [wantToGoIds]);
  const wantToGoSpots = useMemo(
    () => [...mockSpots, ...storedSpots].filter((spot) => wantToGoIdSet.has(spot.id)),
    [storedSpots, wantToGoIdSet],
  );

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-10 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
            WanClip
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            行きたい一覧
          </h1>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            気になるスポットを、あとから確認できます。
          </p>
        </header>

        {wantToGoSpots.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-sm">
            <p className="text-lg font-semibold text-slate-900">
              行きたいスポットはまだありません
            </p>
            <p className="mt-2 text-sm text-slate-600">
              スポット詳細画面から「行きたい」を登録してください。
            </p>
            <Link
              href="/spots"
              className="mt-6 inline-flex items-center rounded-full bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
            >
              スポット一覧を見る
            </Link>
          </div>
        ) : (
          <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {wantToGoSpots.map((spot) => (
              <SpotCard
                key={spot.id}
                spot={spot}
                detailHref={`/spots/${spot.id}?from=want-to-go`}
              />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

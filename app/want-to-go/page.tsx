"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useSyncExternalStore } from "react";
import { SpotCard } from "@/components/spots/SpotCard";
import { spots as mockSpots } from "@/lib/mock-data";
import {
  EMPTY_SPOTS_SNAPSHOT,
  getStoredSpotsSnapshot,
  parseStoredSpotsSnapshot,
  subscribeStoredSpots,
} from "@/lib/spot-storage";
import {
  getWantToGoSnapshot,
  subscribeWantToGo,
} from "@/lib/want-to-go-storage";

export default function WantToGoPage() {
  const storedSpotsSnapshot = useSyncExternalStore(
    subscribeStoredSpots,
    getStoredSpotsSnapshot,
    () => EMPTY_SPOTS_SNAPSHOT,
  );
  const storedSpots = useMemo(
    () => parseStoredSpotsSnapshot(storedSpotsSnapshot),
    [storedSpotsSnapshot],
  );
  const wantToGoSnapshot = useSyncExternalStore(
    subscribeWantToGo,
    getWantToGoSnapshot,
    () => "[]",
  );
  const wantToGoIds = JSON.parse(wantToGoSnapshot) as string[];
  const wantToGoIdSet = useMemo(() => new Set(wantToGoIds), [wantToGoIds]);
  const wantToGoSpots = useMemo(
    () =>
      [...mockSpots, ...storedSpots].filter((spot) =>
        wantToGoIdSet.has(spot.id),
      ),
    [storedSpots, wantToGoIdSet],
  );

  return (
    <main className="min-h-screen bg-wan-ivory px-4 py-10 text-wan-navy sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-wan-orange">
            WanClip
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-wan-navy sm:text-4xl">
            行きたい一覧
          </h1>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            気になるスポットを、あとから確認できます。
          </p>
        </header>

        {wantToGoSpots.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-wan-green-light px-6 py-12 text-center shadow-sm">
            <p className="text-lg font-semibold text-slate-900">
              行きたいスポットはまだありません
            </p>
            <p className="mt-2 text-sm text-slate-600">
              スポット詳細画面から「行きたい」を登録してください。
            </p>
            <Link
              href="/spots"
              className="mt-6 inline-flex items-center rounded-full bg-wan-orange px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-wan-orange focus:ring-offset-2"
            >
              <Search aria-hidden="true" className="mr-2 h-4 w-4" />
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

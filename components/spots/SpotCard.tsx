"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useSyncExternalStore } from "react";
import {
  categoryLabels,
  dogAccessLabels,
  formatBoolean,
  formatDogSizes,
} from "@/lib/spot-display";
import type { Spot } from "@/types/spot";
import {
  addWantToGo,
  isWantToGo,
  removeWantToGo,
  subscribeWantToGo,
} from "@/lib/want-to-go-storage";

type SpotCardProps = {
  spot: Spot;
  detailHref?: string;
};

export function SpotCard({
  spot,
  detailHref = `/spots/${spot.id}`,
}: SpotCardProps) {
  const wantToGo = useSyncExternalStore(
    subscribeWantToGo,
    () => isWantToGo(spot.id),
    () => false,
  );

  const handleWantToGo = () => {
    if (wantToGo) {
      removeWantToGo(spot.id);
      return;
    }

    addWantToGo(spot.id);
  };

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-wan-orange">
            {categoryLabels[spot.category]}
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-900">{spot.name}</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-wan-green px-2.5 py-1 text-xs font-medium text-wan-navy">
            {spot.prefecture}
          </span>
          <button
            type="button"
            onClick={handleWantToGo}
            className={
              wantToGo
                ? "inline-flex h-9 w-9 items-center justify-center rounded-full bg-wan-orange-light text-wan-orange transition-colors hover:bg-orange-200"
                : "inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 transition-colors hover:border-wan-orange hover:text-wan-orange"
            }
            aria-label={
              wantToGo
                ? `${spot.name}を行きたいから解除`
                : `${spot.name}を行きたいに登録`
            }
            aria-pressed={wantToGo}
          >
            <Heart
              aria-hidden="true"
              className="h-5 w-5"
              fill={wantToGo ? "currentColor" : "none"}
            />
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
            犬の利用可否
          </p>
          <p className="mt-1 font-medium text-slate-700">
            {spot.dogAccess ? dogAccessLabels[spot.dogAccess] : "未確認"}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
            対応サイズ
          </p>
          <p className="mt-1 font-medium text-slate-700">
            {formatDogSizes(spot.supportedDogSizes)}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
            ドッグラン
          </p>
          <p className="mt-1 font-medium text-slate-700">
            {formatBoolean(spot.hasDogRun)}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
            犬用メニュー
          </p>
          <p className="mt-1 font-medium text-slate-700">
            {formatBoolean(spot.hasDogMenu)}
          </p>
        </div>

        <div className="sm:col-span-2">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
            駐車場
          </p>
          <p className="mt-1 font-medium text-slate-700">
            {formatBoolean(spot.hasParking)}
          </p>
        </div>
      </div>

      {spot.address ? (
        <p className="mt-4 text-sm text-slate-500">{spot.address}</p>
      ) : null}

      <div className="mt-5">
        <Link
          href={detailHref}
          className="inline-flex items-center rounded-full bg-wan-orange px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-wan-orange"
          aria-label={`${spot.name} の詳細を見る`}
        >
          詳細を見る
        </Link>
      </div>
    </article>
  );
}

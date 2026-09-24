import Link from "next/link";
import {
  categoryLabels,
  dogAccessLabels,
  formatBoolean,
  formatDogSizes,
} from "@/lib/spot-display";
import type { Spot } from "@/types/spot";

type SpotCardProps = {
  spot: Spot;
};

export function SpotCard({ spot }: SpotCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
            {categoryLabels[spot.category]}
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-900">{spot.name}</h2>
        </div>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
          {spot.prefecture}
        </span>
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
          href={`/spots/${spot.id}`}
          className="inline-flex items-center rounded-full bg-slate-900 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300"
          aria-label={`${spot.name} の詳細を見る`}
        >
          詳細を見る
        </Link>
      </div>
    </article>
  );
}

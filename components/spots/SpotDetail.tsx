"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import type { Spot } from "@/types/spot";
import {
  categoryLabels,
  dogAccessLabels,
  formatBoolean,
  formatDogSizes,
} from "@/lib/spot-display";
import { deleteStoredSpot, getStoredSpotById } from "@/lib/spot-storage";
import {
  addWantToGo,
  isWantToGo,
  removeWantToGo,
  subscribeWantToGo,
} from "@/lib/want-to-go-storage";

type SpotDetailProps = {
  spot: Spot;
  backHref?: string;
};

export function SpotDetail({ spot, backHref = "/spots" }: SpotDetailProps) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const router = useRouter();
  const backLabel =
    backHref === "/want-to-go"
      ? "行きたい一覧へ戻る"
      : "スポット一覧へ戻る";
  const isStoredSpot = Boolean(getStoredSpotById(spot.id));
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

  const handleDelete = () => {
    if (!isStoredSpot) {
      return;
    }

    deleteStoredSpot(spot.id);
    removeWantToGo(spot.id);
    router.push("/spots");
  };

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-10 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between gap-3">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
          >
            ← {backLabel}
          </Link>

          <div className="flex flex-wrap items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleWantToGo}
              className={
                wantToGo
                  ? "inline-flex items-center rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-800 transition-colors hover:bg-amber-200"
                  : "inline-flex items-center rounded-full border border-amber-300 bg-white px-4 py-2 text-sm font-medium text-amber-700 transition-colors hover:bg-amber-50"
              }
            >
              {wantToGo ? "♥ 行きたい済み" : "♡ 行きたい"}
            </button>
            {isStoredSpot ? (
              <div className="flex items-center gap-3">
              <Link
                href={`/spots/${spot.id}/edit`}
                className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
              >
                編集する
              </Link>
              <button
                type="button"
                onClick={() => setIsDeleteOpen(true)}
                className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-100"
              >
                削除する
              </button>
            </div>
            ) : null}
          </div>
        </div>

        <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-slate-50 px-5 py-6 sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
              {categoryLabels[spot.category]}
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {spot.name}
            </h1>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-700 ring-1 ring-slate-200">
                {spot.prefecture}
              </span>
              <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-700 ring-1 ring-slate-200">
                {spot.dogAccess ? dogAccessLabels[spot.dogAccess] : "未確認"}
              </span>
            </div>
          </div>

          <div className="grid gap-5 p-5 sm:p-8 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
                住所
              </p>
              <p className="mt-2 text-base font-medium text-slate-700">
                {spot.address || "未確認"}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
                犬の利用可否
              </p>
              <p className="mt-2 text-base font-medium text-slate-700">
                {spot.dogAccess ? dogAccessLabels[spot.dogAccess] : "未確認"}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
                対応サイズ
              </p>
              <p className="mt-2 text-base font-medium text-slate-700">
                {formatDogSizes(spot.supportedDogSizes)}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
                ドッグラン
              </p>
              <p className="mt-2 text-base font-medium text-slate-700">
                {formatBoolean(spot.hasDogRun)}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
                犬用メニュー
              </p>
              <p className="mt-2 text-base font-medium text-slate-700">
                {formatBoolean(spot.hasDogMenu)}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
                駐車場
              </p>
              <p className="mt-2 text-base font-medium text-slate-700">
                {formatBoolean(spot.hasParking)}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 md:col-span-2">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
                Webサイト
              </p>
              {spot.websiteUrl ? (
                <a
                  href={spot.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex break-all text-base font-medium text-amber-700 underline decoration-amber-500 underline-offset-4 transition-colors hover:text-amber-800"
                >
                  {spot.websiteUrl}
                </a>
              ) : (
                <p className="mt-2 text-base font-medium text-slate-700">
                  未確認
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 md:col-span-2">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
                メモ
              </p>
              <p className="mt-2 whitespace-pre-wrap text-base leading-relaxed text-slate-700">
                {spot.memo || "未確認"}
              </p>
            </div>
          </div>
        </article>
      </div>

      {isDeleteOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-slate-900">削除の確認</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              このスポットを削除しますか? この操作は取り消せません。
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteOpen(false)}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                キャンセル
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-500"
              >
                削除する
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

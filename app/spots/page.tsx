"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SpotCard } from "@/components/spots/SpotCard";
import { spots as mockSpots } from "@/lib/mock-data";
import { categoryLabels, dogSizeLabels } from "@/lib/spot-display";
import { getStoredSpots } from "@/lib/spot-storage";
import {
  prefectureOptions,
  type DogSizeType,
  type Prefecture,
  type Spot,
  type SpotCategory,
} from "@/types/spot";

type Filters = {
  keyword: string;
  category: SpotCategory | "";
  prefecture: Prefecture | "";
  dogSize: DogSizeType | "";
  hasDogRun: boolean;
  hasDogMenu: boolean;
  hasParking: boolean;
};

const initialFilters: Filters = {
  keyword: "",
  category: "",
  prefecture: "",
  dogSize: "",
  hasDogRun: false,
  hasDogMenu: false,
  hasParking: false,
};

export default function SpotsPage() {
  const [storedSpots] = useState<Spot[]>(() => getStoredSpots());
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const allSpots = useMemo(() => [...mockSpots, ...storedSpots], [storedSpots]);

  const filteredSpots = useMemo(() => {
    const normalizedKeyword = filters.keyword.trim().toLowerCase();

    return allSpots.filter((spot) => {
      const matchesKeyword =
        !normalizedKeyword ||
        [spot.name, spot.address ?? ""].some((value) =>
          value.toLowerCase().includes(normalizedKeyword),
        );

      const matchesCategory =
        !filters.category || spot.category === filters.category;
      const matchesPrefecture =
        !filters.prefecture || spot.prefecture === filters.prefecture;
      const matchesDogSize =
        !filters.dogSize ||
        (spot.supportedDogSizes ?? []).includes(filters.dogSize);
      const matchesDogRun = !filters.hasDogRun || spot.hasDogRun === true;
      const matchesDogMenu = !filters.hasDogMenu || spot.hasDogMenu === true;
      const matchesParking = !filters.hasParking || spot.hasParking === true;

      return (
        matchesKeyword &&
        matchesCategory &&
        matchesPrefecture &&
        matchesDogSize &&
        matchesDogRun &&
        matchesDogMenu &&
        matchesParking
      );
    });
  }, [allSpots, filters]);

  const resetFilters = () => setFilters(initialFilters);

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-10 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
              WanClip
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              スポット一覧
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
              犬と一緒に利用できる場所を、種類や条件ごとに見比べられる一覧です。
            </p>
          </div>

          <Link
            href="/spots/new"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          >
            新規登録
          </Link>
        </header>

        <section className="mb-8 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                キーワード検索
              </label>
              <input
                type="text"
                value={filters.keyword}
                onChange={(event) =>
                  setFilters((current) => ({
                    ...current,
                    keyword: event.target.value,
                  }))
                }
                placeholder="施設名や住所を入力"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition-colors focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  カテゴリ
                </label>
                <select
                  value={filters.category}
                  onChange={(event) =>
                    setFilters((current) => ({
                      ...current,
                      category: event.target.value as SpotCategory,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition-colors focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                >
                  <option value="">すべて</option>
                  {Object.entries(categoryLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  都道府県
                </label>
                <select
                  value={filters.prefecture}
                  onChange={(event) =>
                    setFilters((current) => ({
                      ...current,
                      prefecture: event.target.value as Prefecture,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition-colors focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                >
                  <option value="">すべて</option>
                  {prefectureOptions.map((prefecture) => (
                    <option key={prefecture} value={prefecture}>
                      {prefecture}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  対応犬サイズ
                </label>
                <select
                  value={filters.dogSize}
                  onChange={(event) =>
                    setFilters((current) => ({
                      ...current,
                      dogSize: event.target.value as DogSizeType,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition-colors focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                >
                  <option value="">すべて</option>
                  {(
                    Object.entries(dogSizeLabels) as [DogSizeType, string][]
                  ).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-slate-700">
                利用条件
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  {
                    key: "hasDogRun",
                    label: "ドッグランあり",
                  },
                  {
                    key: "hasDogMenu",
                    label: "犬用メニューあり",
                  },
                  {
                    key: "hasParking",
                    label: "駐車場あり",
                  },
                ].map((item) => (
                  <label
                    key={item.key}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700"
                  >
                    <input
                      type="checkbox"
                      checked={filters[item.key as keyof Filters] as boolean}
                      onChange={(event) =>
                        setFilters((current) => ({
                          ...current,
                          [item.key]: event.target.checked,
                        }))
                      }
                      className="accent-amber-600"
                    />
                    {item.label}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={resetFilters}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                条件をクリア
              </button>
            </div>
          </div>
        </section>

        {filteredSpots.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center shadow-sm">
            <p className="text-lg font-semibold text-slate-900">
              条件に一致するスポットはありません
            </p>
            <p className="mt-2 text-sm text-slate-600">
              検索条件を変えるか、条件をクリアして一覧を戻してください。
            </p>
          </div>
        ) : (
          <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredSpots.map((spot) => (
              <SpotCard key={spot.id} spot={spot} />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

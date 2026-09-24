"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { SpotForm } from "@/components/spots/SpotForm";
import { getStoredSpotById } from "@/lib/spot-storage";

export default function EditSpotPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const spot = useMemo(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    return getStoredSpotById(id);
  }, [id]);

  if (!spot) {
    return (
      <main className="min-h-screen bg-stone-50 px-4 py-10 text-slate-800 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
            WanClip
          </p>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">
            スポットが見つかりませんでした
          </h1>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            編集できる保存済みスポットが見つかりません。
          </p>
          <Link
            href="/spots"
            className="mt-6 inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          >
            一覧へ戻る
          </Link>
        </div>
      </main>
    );
  }

  return <SpotForm mode="edit" initialSpot={spot} />;
}

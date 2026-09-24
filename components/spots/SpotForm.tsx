"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import {
  categoryLabels,
  dogAccessLabels,
  dogSizeLabels,
} from "@/lib/spot-display";
import {
  prefectureOptions,
  type DogAccessType,
  type DogSizeType,
  type Prefecture,
  type Spot,
  type SpotCategory,
} from "@/types/spot";
import { saveStoredSpot, updateStoredSpot } from "@/lib/spot-storage";

type FormState = {
  name: string;
  category: SpotCategory | "";
  prefecture: Prefecture | "";
  address: string;
  dogAccess: DogAccessType | "";
  supportedDogSizes: DogSizeType[];
  hasDogRun: boolean | undefined;
  hasDogMenu: boolean | undefined;
  hasParking: boolean | undefined;
  websiteUrl: string;
  memo: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialFormState: FormState = {
  name: "",
  category: "",
  prefecture: "",
  address: "",
  dogAccess: "",
  supportedDogSizes: [],
  hasDogRun: undefined,
  hasDogMenu: undefined,
  hasParking: undefined,
  websiteUrl: "",
  memo: "",
};

const booleanOptions = [
  { value: "", label: "未確認" },
  { value: "true", label: "あり" },
  { value: "false", label: "なし" },
] as const;

function validateForm(form: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!form.name.trim()) {
    errors.name = "施設名を入力してください。";
  }

  if (!form.category) {
    errors.category = "カテゴリを選択してください。";
  }

  if (!form.prefecture) {
    errors.prefecture = "都道府県を選択してください。";
  }

  if (!form.dogAccess) {
    errors.dogAccess = "犬が利用できる場所を選択してください。";
  }

  if (
    form.websiteUrl.trim() &&
    !/^https?:\/\/.+/i.test(form.websiteUrl.trim())
  ) {
    errors.websiteUrl =
      "WebサイトURLは http:// または https:// で入力してください。";
  }

  return errors;
}

function fieldClassName(hasError: boolean) {
  return [
    "mt-2 w-full rounded-xl border bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition-colors",
    hasError
      ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100"
      : "border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-100",
  ].join(" ");
}

function RequiredBadge() {
  return (
    <span className="ml-2 inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-red-700">
      必須
    </span>
  );
}

function getFormStateFromSpot(spot: Spot): FormState {
  return {
    name: spot.name,
    category: spot.category,
    prefecture: spot.prefecture,
    address: spot.address ?? "",
    dogAccess: spot.dogAccess ?? "",
    supportedDogSizes: spot.supportedDogSizes ?? [],
    hasDogRun: spot.hasDogRun,
    hasDogMenu: spot.hasDogMenu,
    hasParking: spot.hasParking,
    websiteUrl: spot.websiteUrl ?? "",
    memo: spot.memo ?? "",
  };
}

type SpotFormProps = {
  mode?: "create" | "edit";
  initialSpot?: Spot;
};

export function SpotForm({ mode = "create", initialSpot }: SpotFormProps) {
  const [form, setForm] = useState<FormState>(() =>
    initialSpot ? getFormStateFromSpot(initialSpot) : initialFormState,
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [submittedSpot, setSubmittedSpot] = useState<Spot | null>(null);
  const isEditMode = mode === "edit";

  const handleChange = (
    field: keyof FormState,
    value: string | boolean | undefined | DogSizeType[],
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleDogSizeToggle = (size: DogSizeType) => {
    setForm((current) => {
      const hasSize = current.supportedDogSizes.includes(size);
      const nextSizes = hasSize
        ? current.supportedDogSizes.filter((entry) => entry !== size)
        : [...current.supportedDogSizes, size];

      return { ...current, supportedDogSizes: nextSizes };
    });
  };

  const handleBooleanChange = (
    field: "hasDogRun" | "hasDogMenu" | "hasParking",
    value: boolean | undefined,
  ) => {
    handleChange(field, value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsConfirmOpen(true);
  };

  const handleConfirm = () => {
    const baseSpot: Spot = {
      id: isEditMode && initialSpot ? initialSpot.id : `spot-${Date.now()}`,
      name: form.name.trim(),
      category: form.category as SpotCategory,
      prefecture: form.prefecture as Prefecture,
      address: form.address.trim() || undefined,
      dogAccess: form.dogAccess as DogAccessType,
      supportedDogSizes:
        form.supportedDogSizes.length > 0 ? form.supportedDogSizes : undefined,
      hasDogRun: form.hasDogRun,
      hasDogMenu: form.hasDogMenu,
      hasParking: form.hasParking,
      websiteUrl: form.websiteUrl.trim() || undefined,
      memo: form.memo.trim() || undefined,
      createdAt:
        isEditMode && initialSpot
          ? initialSpot.createdAt
          : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (isEditMode && initialSpot) {
      updateStoredSpot(initialSpot.id, baseSpot);
    } else {
      saveStoredSpot(baseSpot);
    }

    setSubmittedSpot(baseSpot);
    setIsConfirmOpen(false);
    setIsSuccessOpen(true);
    if (!isEditMode) {
      setForm(initialFormState);
    }
  };

  return (
    <main className="min-h-screen bg-wan-ivory px-4 py-10 text-wan-navy sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between gap-3">
          <Link
            href="/spots"
            className="inline-flex items-center gap-2 rounded-full border border-wan-orange bg-white px-3 py-2 text-sm font-medium text-wan-orange shadow-sm transition-colors hover:bg-wan-orange-light"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            スポット一覧へ戻る
          </Link>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-wan-orange">
              WanClip
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-wan-navy">
              {isEditMode ? "スポットを編集する" : "スポットを登録する"}
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {isEditMode
                ? "既存の情報を更新してください。"
                : "犬と一緒に利用できる場所の基本情報を入力してください。"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700">
                  <span className="inline-flex items-center">
                    施設名
                    <RequiredBadge />
                  </span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(event) => handleChange("name", event.target.value)}
                  className={fieldClassName(Boolean(errors.name))}
                  placeholder="例: Paws & Coffee"
                />
                {errors.name ? (
                  <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                ) : null}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  <span className="inline-flex items-center">
                    施設の種類
                    <RequiredBadge />
                  </span>
                </label>
                <select
                  value={form.category}
                  onChange={(event) =>
                    handleChange("category", event.target.value as SpotCategory)
                  }
                  className={fieldClassName(Boolean(errors.category))}
                >
                  <option value="">選択してください</option>
                  {Object.entries(categoryLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                {errors.category ? (
                  <p className="mt-2 text-sm text-red-600">{errors.category}</p>
                ) : null}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  <span className="inline-flex items-center">
                    都道府県
                    <RequiredBadge />
                  </span>
                </label>
                <select
                  value={form.prefecture}
                  onChange={(event) =>
                    handleChange("prefecture", event.target.value as Prefecture)
                  }
                  className={fieldClassName(Boolean(errors.prefecture))}
                >
                  <option value="">選択してください</option>
                  {prefectureOptions.map((prefecture) => (
                    <option key={prefecture} value={prefecture}>
                      {prefecture}
                    </option>
                  ))}
                </select>
                {errors.prefecture ? (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.prefecture}
                  </p>
                ) : null}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700">
                  住所
                </label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(event) =>
                    handleChange("address", event.target.value)
                  }
                  className={fieldClassName(false)}
                  placeholder="例: 東京都渋谷区神南1-1-1"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700">
                  <span className="inline-flex items-center">
                    犬が利用できる場所
                    <RequiredBadge />
                  </span>
                </label>
                <div className="mt-2 flex flex-wrap gap-3">
                  {(
                    Object.entries(dogAccessLabels) as [DogAccessType, string][]
                  ).map(([value, label]) => (
                    <label
                      key={value}
                      className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-wan-green-light px-3 py-2 text-sm text-slate-700"
                    >
                      <input
                        type="radio"
                        name="dogAccess"
                        value={value}
                        checked={form.dogAccess === value}
                        onChange={() => handleChange("dogAccess", value)}
                        className="accent-wan-orange"
                      />
                      {label}
                    </label>
                  ))}
                </div>
                {errors.dogAccess ? (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.dogAccess}
                  </p>
                ) : null}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700">
                  対応している犬のサイズ
                </label>
                <div className="mt-2 flex flex-wrap gap-3">
                  {(
                    Object.entries(dogSizeLabels) as [DogSizeType, string][]
                  ).map(([value, label]) => (
                    <label
                      key={value}
                      className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-wan-green-light px-3 py-2 text-sm text-slate-700"
                    >
                      <input
                        type="checkbox"
                        checked={form.supportedDogSizes.includes(value)}
                        onChange={() => handleDogSizeToggle(value)}
                        className="accent-wan-orange"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  ドッグラン
                </label>
                <select
                  value={
                    form.hasDogRun === undefined ? "" : String(form.hasDogRun)
                  }
                  onChange={(event) => {
                    const nextValue = event.target.value;
                    handleBooleanChange(
                      "hasDogRun",
                      nextValue === "" ? undefined : nextValue === "true",
                    );
                  }}
                  className={fieldClassName(false)}
                >
                  {booleanOptions.map((option) => (
                    <option key={option.label} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  犬用メニュー
                </label>
                <select
                  value={
                    form.hasDogMenu === undefined ? "" : String(form.hasDogMenu)
                  }
                  onChange={(event) => {
                    const nextValue = event.target.value;
                    handleBooleanChange(
                      "hasDogMenu",
                      nextValue === "" ? undefined : nextValue === "true",
                    );
                  }}
                  className={fieldClassName(false)}
                >
                  {booleanOptions.map((option) => (
                    <option key={option.label} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  駐車場
                </label>
                <select
                  value={
                    form.hasParking === undefined ? "" : String(form.hasParking)
                  }
                  onChange={(event) => {
                    const nextValue = event.target.value;
                    handleBooleanChange(
                      "hasParking",
                      nextValue === "" ? undefined : nextValue === "true",
                    );
                  }}
                  className={fieldClassName(false)}
                >
                  {booleanOptions.map((option) => (
                    <option key={option.label} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700">
                  WebサイトURL
                </label>
                <input
                  type="url"
                  value={form.websiteUrl}
                  onChange={(event) =>
                    handleChange("websiteUrl", event.target.value)
                  }
                  className={fieldClassName(Boolean(errors.websiteUrl))}
                  placeholder="https://example.com"
                />
                {errors.websiteUrl ? (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.websiteUrl}
                  </p>
                ) : null}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700">
                  メモ
                </label>
                <textarea
                  value={form.memo}
                  onChange={(event) => handleChange("memo", event.target.value)}
                  rows={5}
                  className={fieldClassName(false)}
                  placeholder="犬との利用条件や気をつけたい点を書いてください。"
                />
              </div>
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                type="submit"
                className="rounded-full bg-wan-orange px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-wan-orange focus:ring-offset-2"
              >
                {isEditMode ? "更新する" : "登録する"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {isConfirmOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-slate-900">
              {isEditMode ? "更新内容の確認" : "登録内容の確認"}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {isEditMode
                ? "入力した内容でスポット情報を更新します。よろしいですか?"
                : "入力した内容でスポット情報を登録します。よろしいですか?"}
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsConfirmOpen(false)}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                キャンセル
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="rounded-full bg-wan-orange px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-700"
              >
                {isEditMode ? "更新する" : "登録する"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {isSuccessOpen && submittedSpot ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-wan-orange">
              {isEditMode ? "更新完了" : "登録完了"}
            </p>
            <h2 className="mt-4 text-2xl font-bold text-slate-900">
              {isEditMode ? "スポットを更新しました" : "スポットを登録しました"}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {isEditMode
                ? `${submittedSpot.name} の情報を更新しました。`
                : `${submittedSpot.name} の情報を追加しました。`}
            </p>
            <Link
              href={isEditMode ? `/spots/${submittedSpot.id}` : "/spots"}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-wan-orange px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-700"
            >
              {isEditMode ? "詳細画面へ" : "スポット一覧へ"}
            </Link>
          </div>
        </div>
      ) : null}
    </main>
  );
}

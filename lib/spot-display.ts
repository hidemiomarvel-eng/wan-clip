import type { DogSizeType, Spot } from "@/types/spot";

export const categoryLabels: Record<Spot["category"], string> = {
  cafe: "カフェ",
  restaurant: "レストラン",
  hotel: "宿泊施設",
  attraction: "観光スポット",
  dog_run: "ドッグラン",
  other: "その他",
};

export const dogAccessLabels: Record<NonNullable<Spot["dogAccess"]>, string> = {
  indoor: "店内OK",
  terrace: "テラスのみ",
  other: "その他",
};

export const dogSizeLabels: Record<DogSizeType, string> = {
  small: "小型犬",
  medium: "中型犬",
  large: "大型犬",
};

export function formatDogSizes(sizes?: Spot["supportedDogSizes"]) {
  if (!sizes || sizes.length === 0) {
    return "未確認";
  }

  return sizes.map((size) => dogSizeLabels[size]).join(" / ");
}

export function formatBoolean(value?: boolean) {
  if (value === undefined) {
    return "未確認";
  }

  return value ? "あり" : "なし";
}

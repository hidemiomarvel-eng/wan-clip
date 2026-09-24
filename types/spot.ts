export type SpotCategory =
  | "cafe"
  | "restaurant"
  | "hotel"
  | "attraction"
  | "dog_run"
  | "other";

export type DogAccessType = "indoor" | "terrace" | "other";

export type DogSizeType = "small" | "medium" | "large";

export const prefectureOptions = [
  "東京都",
  "神奈川県",
  "埼玉県",
  "千葉県",
  "茨城県",
  "栃木県",
  "群馬県",
  "静岡県",
  "山梨県",
  "長野県",
] as const;

export type Prefecture = (typeof prefectureOptions)[number];

export type Spot = {
  id: string;
  name: string;
  category: SpotCategory;
  prefecture: Prefecture;
  address?: string;
  dogAccess?: DogAccessType;
  supportedDogSizes?: DogSizeType[];
  hasDogRun?: boolean;
  hasDogMenu?: boolean;
  hasParking?: boolean;
  websiteUrl?: string;
  memo?: string;
  createdAt: string;
  updatedAt: string;
};

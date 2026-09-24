import type { Spot } from "@/types/spot";

export const SPOT_STORAGE_KEY = "wanclip-spots";

export function getStoredSpots(): Spot[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawValue = window.localStorage.getItem(SPOT_STORAGE_KEY);

    if (!rawValue) {
      return [];
    }

    const parsed = JSON.parse(rawValue) as unknown;

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((item): item is Spot => {
      if (!item || typeof item !== "object") {
        return false;
      }

      const spot = item as Partial<Spot>;
      return typeof spot.id === "string" && typeof spot.name === "string";
    });
  } catch {
    return [];
  }
}

export function saveStoredSpot(spot: Spot) {
  if (typeof window === "undefined") {
    return [];
  }

  const currentSpots = getStoredSpots();
  const nextSpots = [...currentSpots, spot];

  window.localStorage.setItem(SPOT_STORAGE_KEY, JSON.stringify(nextSpots));
  return nextSpots;
}

export function getStoredSpotById(id: string): Spot | undefined {
  return getStoredSpots().find((spot) => spot.id === id);
}

export function updateStoredSpot(id: string, nextSpot: Spot) {
  if (typeof window === "undefined") {
    return [];
  }

  const currentSpots = getStoredSpots();
  const nextSpots = currentSpots.map((spot) =>
    spot.id === id
      ? { ...spot, ...nextSpot, id, createdAt: spot.createdAt }
      : spot,
  );

  window.localStorage.setItem(SPOT_STORAGE_KEY, JSON.stringify(nextSpots));
  return nextSpots;
}

export function deleteStoredSpot(id: string) {
  if (typeof window === "undefined") {
    return [];
  }

  const currentSpots = getStoredSpots();
  const nextSpots = currentSpots.filter((spot) => spot.id !== id);

  window.localStorage.setItem(SPOT_STORAGE_KEY, JSON.stringify(nextSpots));
  return nextSpots;
}

import type { Spot } from "@/types/spot";

export const SPOT_STORAGE_KEY = "wanclip-spots";
export const SPOT_STORAGE_CHANGE_EVENT = "wanclip-spots-change";
export const EMPTY_SPOTS_SNAPSHOT = "[]";

export function parseStoredSpotsSnapshot(snapshot: string): Spot[] {
  try {
    const parsed = JSON.parse(snapshot) as unknown;

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

export function getStoredSpots(): Spot[] {
  if (typeof window === "undefined") {
    return [];
  }

  return parseStoredSpotsSnapshot(getStoredSpotsSnapshot());
}

export function getStoredSpotsSnapshot(): string {
  if (typeof window === "undefined") {
    return EMPTY_SPOTS_SNAPSHOT;
  }

  return window.localStorage.getItem(SPOT_STORAGE_KEY) ?? EMPTY_SPOTS_SNAPSHOT;
}

export function subscribeStoredSpots(onChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === SPOT_STORAGE_KEY) {
      onChange();
    }
  };

  window.addEventListener("storage", handleStorageChange);
  window.addEventListener(SPOT_STORAGE_CHANGE_EVENT, onChange);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
    window.removeEventListener(SPOT_STORAGE_CHANGE_EVENT, onChange);
  };
}

function notifyStoredSpotsChanged() {
  window.dispatchEvent(new Event(SPOT_STORAGE_CHANGE_EVENT));
}

export function saveStoredSpot(spot: Spot) {
  if (typeof window === "undefined") {
    return [];
  }

  const currentSpots = getStoredSpots();
  const nextSpots = [...currentSpots, spot];

  window.localStorage.setItem(SPOT_STORAGE_KEY, JSON.stringify(nextSpots));
  notifyStoredSpotsChanged();
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
  notifyStoredSpotsChanged();
  return nextSpots;
}

export function deleteStoredSpot(id: string) {
  if (typeof window === "undefined") {
    return [];
  }

  const currentSpots = getStoredSpots();
  const nextSpots = currentSpots.filter((spot) => spot.id !== id);

  window.localStorage.setItem(SPOT_STORAGE_KEY, JSON.stringify(nextSpots));
  notifyStoredSpotsChanged();
  return nextSpots;
}

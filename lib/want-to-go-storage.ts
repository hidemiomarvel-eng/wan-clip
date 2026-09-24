const WANT_TO_GO_STORAGE_KEY = "wanclip-want-to-go";
export const WANT_TO_GO_CHANGE_EVENT = "wanclip-want-to-go-change";

function readWantToGoIds(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawValue = window.localStorage.getItem(WANT_TO_GO_STORAGE_KEY);

    if (!rawValue) {
      return [];
    }

    const parsed = JSON.parse(rawValue) as unknown;

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((id): id is string => typeof id === "string");
  } catch {
    return [];
  }
}

function writeWantToGoIds(ids: string[]) {
  const uniqueIds = [...new Set(ids)];
  window.localStorage.setItem(WANT_TO_GO_STORAGE_KEY, JSON.stringify(uniqueIds));
  window.dispatchEvent(new Event(WANT_TO_GO_CHANGE_EVENT));
}

export function getWantToGoIds(): string[] {
  return readWantToGoIds();
}

export function isWantToGo(id: string): boolean {
  return readWantToGoIds().includes(id);
}

export function subscribeWantToGo(onChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  window.addEventListener(WANT_TO_GO_CHANGE_EVENT, onChange);
  return () => window.removeEventListener(WANT_TO_GO_CHANGE_EVENT, onChange);
}

export function getWantToGoSnapshot(): string {
  return JSON.stringify(readWantToGoIds());
}

export function addWantToGo(id: string): string[] {
  const ids = readWantToGoIds();
  const nextIds = [...new Set([...ids, id])];
  writeWantToGoIds(nextIds);
  return nextIds;
}

export function removeWantToGo(id: string): string[] {
  const nextIds = readWantToGoIds().filter((storedId) => storedId !== id);
  writeWantToGoIds(nextIds);
  return nextIds;
}

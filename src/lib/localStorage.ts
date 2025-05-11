export function loadState<T>(key: string): T | undefined {
  try {
    const serializedState = localStorage.getItem(key);
    if (!serializedState) return undefined;
    const parsed = JSON.parse(serializedState) as T;

    if (key === "dailyReport") {
      (parsed as any).reports = (parsed as any).reports.map((r: any) => ({
        ...r,
        date: new Date(r.date),
      }));
    }
    if (key === "farms") {
      (parsed as any).farms = (parsed as any).farms.map((f: any) => ({
        ...f,
        startDate: new Date(f.startDate),
      }));
    }

    return parsed;
  } catch (err) {
    console.error("Failed to load state:", err);
    return undefined;
  }
}

export function saveState<T>(key: string, state: T): void {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.error("Failed to save state:", err);
  }
}

interface DailyUsage {
  scans: number;
  recipes: number;
  date: string; // YYYY-MM-DD
}

const usageMap = new Map<string, DailyUsage>();

const DAILY_LIMITS = {
  scans: 5,
  recipes: 3,
};

function getTodayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function getUsage(deviceId: string): DailyUsage {
  const today = getTodayStr();
  const entry = usageMap.get(deviceId);

  if (!entry || entry.date !== today) {
    const fresh = { scans: 0, recipes: 0, date: today };
    usageMap.set(deviceId, fresh);
    return fresh;
  }

  return entry;
}

export function checkLimit(
  deviceId: string,
  type: 'scans' | 'recipes',
): { ok: boolean; remaining: number } {
  const usage = getUsage(deviceId);
  const limit = DAILY_LIMITS[type];

  if (usage[type] >= limit) {
    return { ok: false, remaining: 0 };
  }

  usage[type]++;
  return { ok: true, remaining: limit - usage[type] };
}

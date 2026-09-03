// Small in-memory rate limiter. Good enough for a portfolio app on Vercel:
// each serverless instance keeps its own map, so the real limit is a bit looser
// than configured, but it stops a single visitor (or a bot) from running up a bill.

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = Number(process.env.RATE_LIMIT_PER_10_MIN ?? 5);
const MAX_PER_DAY_GLOBAL = Number(process.env.RATE_LIMIT_GLOBAL_PER_DAY ?? 300);

const hits = new Map<string, number[]>();
let dayKey = new Date().toISOString().slice(0, 10);
let dayCount = 0;

export function checkRateLimit(ip: string): { ok: true } | { ok: false; reason: string } {
  const now = Date.now();
  const today = new Date().toISOString().slice(0, 10);
  if (today !== dayKey) {
    dayKey = today;
    dayCount = 0;
  }
  if (dayCount >= MAX_PER_DAY_GLOBAL) {
    return { ok: false, reason: "This demo has hit its daily limit. Try again tomorrow." };
  }

  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    return { ok: false, reason: "Slow down — a few runs per ten minutes is plenty. Try again shortly." };
  }
  recent.push(now);
  hits.set(ip, recent);
  dayCount += 1;

  // Keep the map from growing forever.
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return { ok: true };
}

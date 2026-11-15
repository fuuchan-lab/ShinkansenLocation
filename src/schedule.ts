// 空港の発着予定（AeroDataBox。RapidAPI 経由）。
// 利用者が自分の API キーを登録したときだけ使い、ブラウザから RapidAPI へ直接つなぐ（開発者のサーバーは通らない）。
// 無料枠は小さいので、同じ空港は 15 分間、結果を使い回す。
import type { ApiKeyName } from './user';

export const SCHEDULE_KEY: ApiKeyName = 'aerodatabox';
const HOST = 'aerodatabox.p.rapidapi.com';
const CACHE_MS = 15 * 60 * 1000;
const HOUR = 3600e3;

export type ScheduleErrorKind = 'key' | 'quota' | 'network' | 'other';
export class ScheduleError extends Error {
  constructor(public kind: ScheduleErrorKind, message: string) {
    super(message);
  }
}

export interface Scheduled {
  /** NH 12 など（空白は除いて照合する） */
  number: string;
  airline: string;
  /** 見込みの時刻（遅れ・早まりを反映。なければ予定）ms */
  time: number;
  /** 予定の時刻 ms */
  scheduled: number;
  status: string;
  /** 相手の空港（出発なら行先・到着なら出発地） */
  otherCode: string;
  otherName: string;
  /** 国際線（相手の空港が日本以外） */
  intl: boolean;
  terminal: string;
  gate: string;
  model: string;
}
export type Kind = 'dep' | 'arr';

interface Time { utc?: string }
interface Raw {
  number?: string;
  status?: string;
  isCargo?: boolean;
  aircraft?: { model?: string };
  airline?: { name?: string };
  movement?: {
    airport?: { iata?: string; name?: string; shortName?: string; municipalityName?: string; countryCode?: string };
    scheduledTime?: Time;
    revisedTime?: Time;
    predictedTime?: Time;
    terminal?: string;
    gate?: string;
  };
}

/** "2026-11-15 01:35Z" → ms */
const when = (t?: Time) => (t?.utc ? Date.parse(t.utc.replace(' ', 'T')) : NaN);
/** 日本時間（空港はすべて日本時間）の "YYYY-MM-DDTHH:mm" */
const jst = (ms: number) => new Date(ms + 9 * HOUR).toISOString().slice(0, 16);

/** 出発は今から 12 時間先まで、到着は 2 時間前から 2 時間先まで */
export function windowOf(kind: Kind, now = Date.now()): [number, number] {
  return kind === 'dep' ? [now, now + 12 * HOUR] : [now - 2 * HOUR, now + 2 * HOUR];
}

async function call(path: string, key: string): Promise<unknown> {
  let res: Response;
  try {
    res = await fetch(`https://${HOST}${path}`, { headers: { 'X-RapidAPI-Key': key, 'X-RapidAPI-Host': HOST } });
  } catch {
    throw new ScheduleError('network', 'network');
  }
  if (res.status === 401 || res.status === 403) throw new ScheduleError('key', String(res.status));
  if (res.status === 429) throw new ScheduleError('quota', '429');
  if (!res.ok) throw new ScheduleError('other', String(res.status));
  return res.json();
}

/** 登録したキーが使えるかを確かめる（空港情報を 1 件取るだけ） */
export async function testKey(key: string): Promise<void> {
  await call('/airports/iata/HND', key);
}

export async function fetchSchedule(code: string, kind: Kind, key: string): Promise<Scheduled[]> {
  const cacheKey = `sched.${code}.${kind}`;
  try {
    const hit = JSON.parse(sessionStorage.getItem(cacheKey) ?? 'null') as { at: number; data: Scheduled[] } | null;
    if (hit && Date.now() - hit.at < CACHE_MS) return hit.data;
  } catch {
    // キャッシュを読めなければ取り直す
  }
  const [from, to] = windowOf(kind);
  const direction = kind === 'dep' ? 'Departure' : 'Arrival';
  const query = `direction=${direction}&withLeg=false&withCancelled=false&withCodeshared=false&withCargo=false&withPrivate=false&withLocation=false`;
  const body = (await call(`/flights/airports/iata/${code}/${jst(from)}/${jst(to)}?${query}`, key)) as { departures?: Raw[]; arrivals?: Raw[] };
  const raw = (kind === 'dep' ? body.departures : body.arrivals) ?? [];
  const data: Scheduled[] = [];
  for (const r of raw) {
    const m = r.movement;
    const scheduled = when(m?.scheduledTime);
    const time = [when(m?.revisedTime), when(m?.predictedTime), scheduled].find((x) => !Number.isNaN(x));
    if (!m || time === undefined || r.isCargo) continue;
    const ap = m.airport;
    data.push({
      number: (r.number ?? '').trim(),
      airline: r.airline?.name ?? '',
      time,
      scheduled: Number.isNaN(scheduled) ? time : scheduled,
      status: r.status ?? '',
      otherCode: ap?.iata ?? '',
      otherName: ap?.municipalityName || ap?.shortName || ap?.name || '',
      intl: !!ap?.countryCode && ap.countryCode !== 'JP',
      terminal: m.terminal ?? '',
      gate: m.gate ?? '',
      model: r.aircraft?.model ?? '',
    });
  }
  data.sort((a, b) => a.time - b.time);
  try {
    sessionStorage.setItem(cacheKey, JSON.stringify({ at: Date.now(), data }));
  } catch {
    // 保存できなくても表示には影響しない
  }
  return data;
}

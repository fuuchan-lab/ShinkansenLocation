// 空港の発着（中継サーバーの /airport。利用者の登録は不要）。
// - official: 公共交通オープンデータセンターの JAL・ANA の発着情報（定刻・見込み・状態）
// - usual: 中継サーバーが飛行中の便を観測して作った、ふだんの離陸・着陸の時刻（全社の便。推定）
// 中継サーバーで 5 分キャッシュしているので、同じ空港は 5 分間、結果を使い回す。
import { LIVE_API } from './aircraft';

const CACHE_MS = 5 * 60 * 1000;

export interface Official {
  /** 便名（JL123 など。共同運航の便名も含む） */
  numbers: string[];
  /** OnTime / Delayed / Cancelled / Departed など */
  status: string;
  /** 日本時間の "HH:MM" */
  scheduled: string;
  estimated: string;
  actual: string;
  /** 相手の空港（IATA） */
  other: string;
  gate: string;
  terminal: string;
}

export interface Usual {
  callsign: string;
  /** 便名（NH21 など。分からなければ空） */
  flight: string;
  other: string;
  intl: boolean;
  /** ふだんの離陸（出発）・着陸（到着）の時刻。日本時間の 0 時からの分 */
  min: number;
  /** 最近 7 日で見えた日数 */
  days: number;
  /** 直近 16 時間に離陸・着陸した時刻（ms） */
  recent: number | null;
}

export interface Board {
  dep: { official: Official[] | null; usual: Usual[] };
  arr: { official: Official[] | null; usual: Usual[] };
}

type OfficialRow = { n: string[]; s: string; t: string; e: string; a: string; o: string; g: string; m: string };
type UsualRow = [string, string, string, 0 | 1, number, number, number | null];

const cache = new Map<string, { at: number; board: Board }>();

export async function fetchBoard(code: string): Promise<Board> {
  const hit = cache.get(code);
  if (hit && Date.now() - hit.at < CACHE_MS) return hit.board;
  const res = await fetch(`${LIVE_API}/airport?code=${code}`);
  if (!res.ok) throw new Error(`airport ${res.status}`);
  const data = (await res.json()) as {
    usual: { dep: UsualRow[]; arr: UsualRow[] };
    official: { dep: OfficialRow[]; arr: OfficialRow[] } | null;
  };
  const official = (rows: OfficialRow[]): Official[] =>
    rows.map((r) => ({ numbers: r.n, status: r.s, scheduled: r.t, estimated: r.e, actual: r.a, other: r.o, gate: r.g, terminal: r.m }));
  const usual = (rows: UsualRow[]): Usual[] =>
    rows.map(([callsign, flight, other, intl, min, days, recent]) => ({ callsign, flight, other, intl: intl === 1, min, days, recent }));
  const board: Board = {
    dep: { official: data.official && official(data.official.dep), usual: usual(data.usual.dep) },
    arr: { official: data.official && official(data.official.arr), usual: usual(data.usual.arr) },
  };
  cache.set(code, { at: Date.now(), board });
  return board;
}

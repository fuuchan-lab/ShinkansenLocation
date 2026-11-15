// ships.js の型（フロントエンドの src/ais.ts からも使うため）
export type ShipRow = [number, string, number, number, number | null, number | null, number | null, number, string, number, number | null];

export class ShipStore {
  statics: Map<number, { name?: string; type?: number; dest?: string; len?: number }>;
  stats: { messages: number; lastError: string };
  passengers(): ShipRow[];
  passengerStatics(): [number, { name?: string; type?: number; dest?: string; len?: number }][];
}

export function connect(apiKey: string, store: ShipStore, onClose: () => void): Promise<WebSocket>;

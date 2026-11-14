// 地図用アイコン（SVG を画像にして MapLibre に登録する）
import type { Map as MLMap } from 'maplibre-gl';

// 新幹線の先頭車を横から見たピクトグラム
const STATION = `
<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
  <rect x="1.5" y="1.5" width="25" height="25" rx="6" fill="#0b1f3a" stroke="#fff" stroke-width="2"/>
  <path d="M5 17.5h13.5c3 0 5-1.1 5-2.4 0-1.2-1.9-2-4.7-2.9l-4.3-1.5c-1.2-.4-2.3-.6-3.5-.6H5z" fill="#fff"/>
  <path d="M7 12.4h3v1.8H7zM11.2 12.4h3v1.8h-3z" fill="#0b1f3a"/>
  <path d="M15.6 12.3l3 1.1c.4.2.2.8-.3.8h-2.7z" fill="#0b1f3a"/>
  <rect x="5" y="19.5" width="18" height="1.6" rx=".8" fill="#fff"/>
</svg>`;

const AIRPORT = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <circle cx="12" cy="12" r="10.5" fill="#5b6b7f" stroke="#fff" stroke-width="2"/>
  <g transform="translate(12 12) rotate(45) scale(.62) translate(-12 -12)">
    <path fill="#fff" d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
  </g>
</svg>`;

async function svgImage(svg: string, scale: number): Promise<HTMLImageElement> {
  const w = Number(/width="(\d+)"/.exec(svg)![1]) * scale;
  const h = Number(/height="(\d+)"/.exec(svg)![1]) * scale;
  const img = new Image(w, h);
  img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  await img.decode();
  return img;
}

export async function addIcons(map: MLMap) {
  const ratio = 2;
  const [station, airport] = await Promise.all([svgImage(STATION, ratio), svgImage(AIRPORT, ratio)]);
  map.addImage('station', station, { pixelRatio: ratio });
  map.addImage('airport', airport, { pixelRatio: ratio });
}

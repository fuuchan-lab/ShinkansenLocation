// 日本語・英語の切り替え。初期値はブラウザの言語（日本語以外なら英語）。選んだ言語は保存する
import { airport, LINES, STATIONS, TRAINS } from './names-en';

export type Lang = 'ja' | 'en';

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem('lang');
    if (saved === 'ja' || saved === 'en') return saved;
  } catch {
    // 保存した言語を読めなければブラウザの言語
  }
  return navigator.language.toLowerCase().startsWith('ja') ? 'ja' : 'en';
}

export let lang: Lang = initialLang();
document.documentElement.lang = lang;

export function setLang(l: Lang) {
  lang = l;
  document.documentElement.lang = l;
  try {
    localStorage.setItem('lang', l);
  } catch {
    // 保存できなくても、この画面では切り替わる
  }
}

const en = () => lang === 'en';

// ---- 固有名詞 ----
export const station = (name: string) => (en() ? STATIONS[name] ?? name : name);
export const airportName = (name: string) => (en() ? airport(name) : name);
/** 地図・一覧に出す列車名（のぞみ1 / Nozomi 1） */
export const trainLabel = (n: string, no: number) => (en() ? `${TRAINS[n] ?? n} ${no}` : `${n}${no}`);
/** 見出しの列車名（のぞみ 1号 / Nozomi 1） */
export const trainTitle = (n: string, no: number) => (en() ? `${TRAINS[n] ?? n} ${no}` : `${n} ${no}号`);
export const lineName = (l: { id: string; name: string }) => (en() ? LINES[l.id] ?? l.name : l.name);
/** 路線ボタン用の短い名前（東海道 / Tokaido） */
export const lineShort = (l: { id: string; name: string }) => lineName(l).replace(en() ? ' Shinkansen' : '新幹線', '');

// ---- 画面の文言 ----
const ja = {
  badge: '推定',
  title: 'のりものレーダー',
  domestic: '国内線',
  international: '国際線',
  ships: '旅客船',
  ship: '旅客船',
  running: (n: number) => `${n}本`,
  noService: '運行時間外',
  loadFailed: 'データの読み込みに失敗しました',
  official: { jrc: 'JR東海 運行情報', jrw: 'JR西日本 運行情報', jre: 'JR東日本 運行情報', jrh: 'JR北海道 運行情報', jrk: 'JR九州 運行情報' },
  // 列車
  stoppedAt: (s: string) => `<b>${s}</b> に停車中`,
  runningBetween: (a: string, b: string) => `<b>${a}</b> → <b>${b}</b> 間を走行中`,
  speed: (v: number) => `約 ${v} km/h`,
  nextStop: (s: string, t: string) => `次の停車駅 <b>${s}</b> ${t}着`,
  bound: (s: string) => `${s}行`,
  arr: (t: string) => `${t}着`,
  dep: (t: string) => `${t}発`,
  following: '追従中',
  follow: '列車を追従',
  trainNote: '時刻・号数は推定値です。駅名をタップするとその駅の時刻表を表示します。',
  // 駅
  timetable: '駅 時刻表',
  down: '下り',
  up: '上り',
  toward: (names: string[]) => `${names.join('・')}方面`,
  now: (t: string) => `いま ${t}`,
  nowEnded: (t: string) => `いま ${t}（本日の発車は終了）`,
  hour: '時',
  origin: '始発',
  live: '運行中',
  noDepartures: '発車する列車はありません。',
  stationNote: '推定時刻表です。「運行中」の列車をタップすると現在位置を表示します。',
  // 飛行機・船
  compass: ['北', '北東', '東', '南東', '南', '南西', '西', '北西'],
  callsign: 'コールサイン',
  route: '経路',
  altitude: '高度',
  groundSpeed: '対地速度',
  heading: '進行方向',
  aircraftType: '機種',
  registration: '登録記号',
  about: (m: string) => `約 ${m}`,
  moreOn: (site: string) => `${site} で詳しく見る ↗`,
  aircraftNote: (age: number) => `ADS-B の受信データ（約${age}秒前の位置から推定）。国内線・国際線は便名の経路から判定し、不明な場合は航空会社や登録国から推定しています。`,
  status: '状態',
  underway: '航行中',
  moored: '停泊中・停船中',
  shipSpeed: '速力',
  knots: 'ノット',
  bow: '船首の向き',
  destination: '行先（AIS）',
  length: '全長',
  shipNote: (age: number) => `AIS の受信データ（約${age}秒前の位置から推定）。行先は船から送られた文字をそのまま表示しています。`,
  // 空港
  airportFlights: '発着情報',
  arriving: '到着予定',
  departed: '出発した便（飛行中）',
  etaNote: '到着時刻は、残りの距離と今の速度から推定しています。',
  fromAirport: (c: string) => `${c} から`,
  toAirport: (c: string) => `${c} へ`,
  approx: (t: string) => `${t}頃`,
  noFlights: '今、この空港を発着して飛行中の便は見つかりません。',
  noCode: 'この飛行場には定期便の情報がありません。',
  airportNote: '今飛んでいる便のうち、経路が分かった便だけを表示しています（地上の便・欠航・遅延は反映されません）。発着の予定は下のリンクで確認してください。',
  schedules: (site: string) => `${site} で発着予定を見る ↗`,
  // マイリスト・ログイン
  myList: 'マイリスト',
  myListLogin: 'マイリスト・ログイン',
  favStation: 'お気に入り',
  tracking: 'トラッキング中',
  track: 'トラッキング',
  unregister: '登録を解除',
  loginToRegister: '登録するには Google アカウントでログインしてください。',
  guest: '<b>ゲスト</b>（閲覧のみ）',
  guestNote: 'Google アカウントでログインすると、列車・飛行機・船のトラッキングと、お気に入りの駅を登録できます。登録内容は、あなたの Google ドライブのこのアプリ専用の領域に保存されます。',
  privacy: '個人情報の保存の仕組み・プライバシーポリシー',
  privacyUrl: 'privacy.html',
  signIn: 'Google でログイン',
  signingIn: 'ログイン中…',
  signOut: 'ログアウト',
  saving: '保存中…',
  savedToDrive: 'Google ドライブに保存',
  empty: 'まだ登録がありません。地図で列車・飛行機・船・駅をタップし、☆を押すと登録できます。',
  trains: '列車',
  aircraft: '飛行機',
  stations: '駅',
  stationOf: (s: string) => `${s}駅`,
  stoppedAtShort: (s: string) => `${s}に停車中`,
  leftShort: (s: string) => `${s}を出て走行中`,
  notFlying: '表示範囲で飛行していません',
  flying: '飛行中',
  notReceived: '受信していません',
  minutesAgo: (m: number) => `約${m}分前の位置`,
  openTimetable: '時刻表を見る',
  close: '閉じる',
};

const english: typeof ja = {
  badge: 'Est.',
  title: 'Norimono Radar',
  domestic: 'Domestic',
  international: 'International',
  ships: 'Ferries',
  ship: 'Ferry',
  running: (n) => `${n} trains`,
  noService: 'No service now',
  loadFailed: 'Failed to load data',
  official: { jrc: 'JR Central service info', jrw: 'JR West service info', jre: 'JR East service info', jrh: 'JR Hokkaido service info', jrk: 'JR Kyushu service info' },
  stoppedAt: (s) => `Stopped at <b>${s}</b>`,
  runningBetween: (a, b) => `Running <b>${a}</b> → <b>${b}</b>`,
  speed: (v) => `about ${v} km/h`,
  nextStop: (s, t) => `Next stop <b>${s}</b> arr. ${t}`,
  bound: (s) => `for ${s}`,
  arr: (t) => `arr. ${t}`,
  dep: (t) => `dep. ${t}`,
  following: 'Following',
  follow: 'Follow train',
  trainNote: 'Times and train numbers are estimates. Tap a station name to see its timetable.',
  timetable: 'Station timetable',
  down: 'Outbound',
  up: 'Inbound',
  toward: (names) => `for ${names.join(' / ')}`,
  now: (t) => `Now ${t}`,
  nowEnded: (t) => `Now ${t} (no more departures today)`,
  hour: '',
  origin: 'Origin',
  live: 'Running',
  noDepartures: 'No departures.',
  stationNote: 'Estimated timetable. Tap a running train to see where it is now.',
  compass: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'],
  callsign: 'Callsign',
  route: 'Route',
  altitude: 'Altitude',
  groundSpeed: 'Ground speed',
  heading: 'Heading',
  aircraftType: 'Aircraft type',
  registration: 'Registration',
  about: (m) => `about ${m}`,
  moreOn: (site) => `More on ${site} ↗`,
  aircraftNote: (age) => `ADS-B data (estimated from a position about ${age}s ago). Domestic / international is judged from the flight's route, or from the airline and country of registration when unknown.`,
  status: 'Status',
  underway: 'Underway',
  moored: 'Moored / stopped',
  shipSpeed: 'Speed',
  knots: 'kn',
  bow: 'Heading',
  destination: 'Destination (AIS)',
  length: 'Length',
  shipNote: (age) => `AIS data (estimated from a position about ${age}s ago). The destination is shown exactly as sent by the ship.`,
  airportFlights: 'Flights',
  arriving: 'Arriving',
  departed: 'Departed (in flight)',
  etaNote: 'Arrival times are estimated from the remaining distance and current speed.',
  fromAirport: (c) => `from ${c}`,
  toAirport: (c) => `to ${c}`,
  approx: (t) => `~${t}`,
  noFlights: 'No flights to or from this airport are in the air right now.',
  noCode: 'No scheduled flight information for this airfield.',
  airportNote: 'Only flights currently in the air with a known route are shown (flights on the ground, cancellations and delays are not reflected). Check the link below for schedules.',
  schedules: (site) => `Schedules on ${site} ↗`,
  myList: 'My list',
  myListLogin: 'My list / Sign in',
  favStation: 'Favorite',
  tracking: 'Tracking',
  track: 'Track',
  unregister: 'Remove',
  loginToRegister: 'Sign in with your Google account to save items.',
  guest: '<b>Guest</b> (view only)',
  guestNote: 'Sign in with Google to track trains, flights and ferries and to save favorite stations. Your list is saved in a private app-only area of your own Google Drive.',
  privacy: 'How your data is stored / Privacy policy',
  privacyUrl: 'privacy.html#en',
  signIn: 'Sign in with Google',
  signingIn: 'Signing in…',
  signOut: 'Sign out',
  saving: 'Saving…',
  savedToDrive: 'Saved to Google Drive',
  empty: 'Nothing saved yet. Tap a train, flight, ferry or station on the map and press ☆.',
  trains: 'Trains',
  aircraft: 'Flights',
  stations: 'Stations',
  stationOf: (s) => `${s} Station`,
  stoppedAtShort: (s) => `Stopped at ${s}`,
  leftShort: (s) => `Running after ${s}`,
  notFlying: 'Not flying in the covered area',
  flying: 'Flying',
  notReceived: 'No signal received',
  minutesAgo: (m) => `position from about ${m} min ago`,
  openTimetable: 'Open timetable',
  close: 'Close',
};

/** 今の言語の文言 */
export const t = () => (en() ? english : ja);

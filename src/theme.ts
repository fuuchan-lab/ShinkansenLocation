// 表示モード（自動・ライト・ダーク）。自動のときは端末の設定に従う。選んだものは保存する
export type Theme = 'auto' | 'light' | 'dark';

const dark = matchMedia('(prefers-color-scheme: dark)');

function initialTheme(): Theme {
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark' || saved === 'auto') return saved;
  } catch {
    // 保存した設定を読めなければ自動
  }
  return 'auto';
}

let theme: Theme = initialTheme();
const listeners = new Set<() => void>();
export const onThemeChange = (f: () => void) => listeners.add(f);

export const getTheme = () => theme;
/** 実際に使う配色（自動なら端末の設定） */
export const effectiveTheme = (): 'light' | 'dark' => (theme === 'auto' ? (dark.matches ? 'dark' : 'light') : theme);

function apply() {
  const e = effectiveTheme();
  document.documentElement.dataset.theme = e;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', e === 'dark' ? '#0b0f14' : '#0b1f3a');
  listeners.forEach((f) => f());
}

export function setTheme(t: Theme) {
  theme = t;
  try {
    localStorage.setItem('theme', t);
  } catch {
    // 保存できなくても、この画面では切り替わる
  }
  apply();
}

dark.addEventListener('change', () => {
  if (theme === 'auto') apply();
});
apply();

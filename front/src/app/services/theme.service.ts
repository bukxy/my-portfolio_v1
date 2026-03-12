import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private _theme = signal<string>(localStorage.getItem('theme') ?? 'dark');

  readonly theme = this._theme.asReadonly();
  readonly isDark = computed(() => this._theme() === 'dark');

  constructor() {
    this.applyTheme(this._theme());
  }

  toggle() {
    const next = this._theme() === 'dark' ? 'light' : 'dark';
    this._theme.set(next);
    localStorage.setItem('theme', next);
    this.applyTheme(next);
  }

  private applyTheme(theme: string) {
    document.documentElement.setAttribute('data-theme', theme);
  }
}

import {inject, Injectable, signal} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LangService {
  private translate = inject(TranslateService);
  currentLang = signal(localStorage.getItem('lang') ?? 'fr');

  constructor() {
    this.translate.use(this.currentLang());
  }

  setLang(lang: string) {
    this.translate.use(lang);
    this.currentLang.set(lang);
    localStorage.setItem('lang', lang);
  }
}

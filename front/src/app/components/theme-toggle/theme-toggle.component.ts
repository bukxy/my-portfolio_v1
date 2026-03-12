import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  template: `
    <div class="nav_ac theme-toggle" (click)="themeService.toggle()">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
        @if (themeService.isDark()) {
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        } @else {
          <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        }
      </svg>
    </div>
  `,
  styles: [`
    .theme-toggle {
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 5px 15px;
      height: 50px;
    }
    svg { width: 2em; height: 2em; stroke: currentColor; }
  `]
})
export class ThemeToggleComponent {
  protected themeService = inject(ThemeService);
}

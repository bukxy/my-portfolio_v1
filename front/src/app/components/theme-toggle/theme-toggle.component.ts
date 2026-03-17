import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  template: `
    <button
      type="button"
      aria-label="Toggle theme menu"
      (click)="themeService.toggle()"
      class="flex items-center justify-center"
    >
      <mat-icon style="font-size: 24px; width: 24px; height: 24px;">light_mode</mat-icon>
    </button>
  `,
  imports: [
    MatIcon
  ],
  styles: [`
    .theme-toggle {
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 5px 15px;
      height: 50px;
    }

    svg {
      width: 2em;
      height: 2em;
      stroke: currentColor;
    }

    button {
      transition: color 0.2s;
    }

    button:hover {
      color: var(--accent-color) !important;
    }
  `]
})
export class ThemeToggleComponent {
  protected themeService = inject(ThemeService);
}

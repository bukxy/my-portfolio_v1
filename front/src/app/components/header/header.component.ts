import {Component, inject, signal} from '@angular/core';

import {RouterLink, RouterLinkActive} from '@angular/router';
import {ThemeToggleComponent} from '../theme-toggle/theme-toggle.component';
import {logotext, socialprofils} from '../../content_option';
import {Login} from '../../dialogs/login/login';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {LangService} from '../../services/lang/lang-service';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ThemeToggleComponent, RouterLinkActive, Login, MatIcon, MatIconButton, MatMenu, MatMenuTrigger, MatMenuItem, TranslatePipe],
  templateUrl: './header.component.html',
  styles: [`
    button {
      transition: color 0.2s;
    }

    button:hover {
      color: var(--accent-color) !important;
    }
  `]
})
export class HeaderComponent {

  langService = inject(LangService);

   navItems: [string, string][] = [
    ["/", "navigation.home"],
    ["/portfolio", "navigation.portfolio"],
    ["/about", "navigation.about"],
    ["/contact", "navigation.contact"],
  ];

  logotext = logotext;
  socialprofils = socialprofils;
  isMenuOpen = signal(false);

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
    document.body.classList.toggle('ovhidden');
  }

  closeMenu() {
    this.isMenuOpen.set(false);
    document.body.classList.remove('ovhidden');
  }
}

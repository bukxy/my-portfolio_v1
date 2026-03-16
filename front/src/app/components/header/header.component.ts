import { Component, signal, inject } from '@angular/core';

import {RouterLink, RouterLinkActive} from '@angular/router';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { logotext, socialprofils } from '../../content_option';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ThemeToggleComponent, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent {

   navItems: [string, string][] = [
    ["/", "Home"],
    ["/portfolio", "Portfolio"],
    ["/about", "About"],
    ["/contact", "Contact"],
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

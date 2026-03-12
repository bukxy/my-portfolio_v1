import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { logotext, socialprofils } from '../../content_option';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, ThemeToggleComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
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

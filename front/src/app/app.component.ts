import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './components/header/header.component';
import { SocialIconsComponent } from './components/social-icons/social-icons.component';
import { AnimatedCursorComponent } from './components/animated-cursor/animated-cursor.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SocialIconsComponent, AnimatedCursorComponent],
  template: `
    <app-animated-cursor></app-animated-cursor>
    <app-header></app-header>
    <div class="s_c">
      <router-outlet></router-outlet>
      <app-social-icons></app-social-icons>
    </div>
    <div class="br-top"></div>
    <div class="br-bottom"></div>
    <div class="br-left"></div>
    <div class="br-right"></div>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0);
    });
  }
}

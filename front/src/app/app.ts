import {Component, inject, OnInit, signal} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {AnimatedCursorComponent} from './components/animated-cursor/animated-cursor.component';
import {SocialIconsComponent} from './components/social-icons/social-icons.component';
import {HeaderComponent} from './components/header/header.component';
import {filter} from 'rxjs';
import {Dialog} from '@angular/cdk/dialog';
import {RequesterService} from './services/requester/requester-service';
import {AuthService} from './services/auth/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AnimatedCursorComponent, HeaderComponent, SocialIconsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('test');
  protected readonly dialog = inject(Dialog);
  protected readonly router = inject(Router);

  private authService = inject(AuthService);
  private request = inject(RequesterService);

  ngOnInit() {
    // Besoin pour remettre le cursor au dessus des dialog --'
    this.dialog.afterOpened.subscribe(() => {
      setTimeout(() => {
        const inner = document.querySelector('.cursor-inner');
        const outer = document.querySelector('.cursor-outer');
        [inner, outer].forEach(el => {
          if (el) {
            (el as any).hidePopover();
            (el as any).showPopover();
          }
        });
      }, 0);
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0);
    });

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      this.request.post<{ access_token: string }>('auth/refresh', null, true)
      .subscribe({
        next: (res) => this.authService.setAccessToken(res.access_token),
        error: () => {
          this.authService.removeAccessToken();
          localStorage.removeItem('isLoggedIn');
        }
      });
    }
  }
}

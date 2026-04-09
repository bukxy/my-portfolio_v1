import { afterNextRender, Component, computed, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AnimatedCursorComponent } from './components/animated-cursor/animated-cursor.component';
import { SocialIconsComponent } from './components/social-icons/social-icons.component';
import { HeaderComponent } from './components/header/header.component';
import { filter } from 'rxjs';
import { Dialog } from '@angular/cdk/dialog';
import { RequesterService } from './services/requester/requester-service';
import { AuthService } from './services/auth/auth-service';
import { NgScrollbarDocument, NgScrollbarModule } from 'ngx-scrollbar';
import { ConfigService } from './services/maintenance/maintenance';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    AnimatedCursorComponent,
    HeaderComponent,
    SocialIconsComponent,
    NgScrollbarModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('test');
  protected readonly dialog = inject(Dialog);
  protected readonly router = inject(Router);

  private authService = inject(AuthService);
  private request = inject(RequesterService);
  configService = inject(ConfigService);

  isMobile = signal(window.matchMedia('(pointer: coarse)').matches);
  isMaintenance = computed(() => this.configService.isMaintenance);

  scrollbarDocument = inject(NgScrollbarDocument);
  constructor() {
    afterNextRender({
      earlyRead: () => {
        this.scrollbarDocument.attachScrollbar();
      }
    });
  }

  ngOnInit() {
    // Curseur au-dessus de tous les overlays
    setTimeout(() => {
      const refresh = () => {
        const inner = document.querySelector('.cursor-inner') as any;
        const outer = document.querySelector('.cursor-outer') as any;
        inner?.hidePopover?.();
        outer?.hidePopover?.();
        inner?.showPopover?.();
        outer?.showPopover?.();
      };

      const observer = new MutationObserver(() => {
        observer.disconnect();
        setTimeout(() => {
          refresh();
          observer.observe(document.body, { childList: true, subtree: true });
        }, 150);
      });

      observer.observe(document.body, { childList: true, subtree: true });
    }, 500);

    // Besoin pour remettre le cursor au dessus des dialog --'
    this.dialog.afterOpened.subscribe(() => {
      setTimeout(() => {
        const inner = document.querySelector('.cursor-inner') as any;
        const outer = document.querySelector('.cursor-outer') as any;
        [inner, outer].forEach((el) => {
          if (el) {
            el.hidePopover();
            el.showPopover();
          }
        });
      }, 0);
    });

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      window.scrollTo(0, 0);
    });

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      this.request.post<{ access_token: string }>('auth/refresh', null, true).subscribe({
        next: (res) => this.authService.setAccessToken(res.access_token),
        error: () => {
          this.authService.removeAccessToken();
          localStorage.removeItem('isLoggedIn');
        },
      });
    }
  }
}

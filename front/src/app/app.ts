import {Component, OnDestroy, OnInit, signal} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {AnimatedCursorComponent} from './components/animated-cursor/animated-cursor.component';
import {SocialIconsComponent} from './components/social-icons/social-icons.component';
import {HeaderComponent} from './components/header/header.component';
import {filter} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AnimatedCursorComponent, HeaderComponent, SocialIconsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('test');

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0);
    });
  }
}

import {Component} from '@angular/core';
import {socialprofils} from '../../content_option';

@Component({
  selector: 'app-social-icons',
  standalone: true,
  templateUrl: './social-icons.component.html',
  imports: [],
  styles: [`
    .follow-link:hover svg path {
        fill: var(--color-red);
    }
  `]
})
export class SocialIconsComponent {
  profiles = socialprofils;
}

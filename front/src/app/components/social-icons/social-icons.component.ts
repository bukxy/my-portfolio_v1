import {Component} from '@angular/core';
import {socialprofils} from '../../content_option';

@Component({
  selector: 'app-social-icons',
  standalone: true,
  templateUrl: './social-icons.component.html',
  imports: [],
  styleUrls: ['./social-icons.component.css']
})
export class SocialIconsComponent {
  profiles = socialprofils;
}

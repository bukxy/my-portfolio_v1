import {Component, inject, OnInit, signal} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {dataabout, meta, services, worktimeline} from '../../content_option';
import {RequesterService} from '../../services/requester/requester-service';
import {Skill} from '../../components/skill/skill';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  imports: [
    Skill,
    TranslatePipe
  ],
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  private title = inject(Title);
  private metaService = inject(Meta);

  worktimeline = worktimeline;

  services = services;
  isLoaded = signal(true);

  protected readonly req = inject(RequesterService);

  ngOnInit() {
    this.title.setTitle(`A propos | ${meta.title}`);
    this.metaService.updateTag({ name: 'description', content: meta.description });
  }

  protected readonly meta = meta;
}

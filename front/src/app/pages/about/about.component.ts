import {Component, inject, OnInit, signal} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {dataabout, meta, services, worktimeline} from '../../content_option';
import {RequesterService} from '../../services/requester/requester-service';
import {Skill} from '../../components/skill/skill';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  imports: [
    Skill
  ],
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  private title = inject(Title);
  private metaService = inject(Meta);

  dataabout = dataabout;
  worktimeline = worktimeline;

  services = services;
  // work
  // about
  //services
  isLoaded = signal(true);

  protected readonly req = inject(RequesterService);

  ngOnInit() {
    this.title.setTitle(`About | ${meta.title}`);
    this.metaService.updateTag({ name: 'description', content: meta.description });
  }
}

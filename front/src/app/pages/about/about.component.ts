import { Component, OnInit, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { dataabout, meta, worktimeline, skills, services } from '../../content_option';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  private title = inject(Title);
  private metaService = inject(Meta);

  dataabout = dataabout;
  worktimeline = worktimeline;
  skills = skills;
  services = services;

  ngOnInit() {
    this.title.setTitle(`About | ${meta.title}`);
    this.metaService.updateTag({ name: 'description', content: meta.description });
  }
}

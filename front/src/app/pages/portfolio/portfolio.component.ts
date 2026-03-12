import { Component, OnInit, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { dataportfolio, meta } from '../../content_option';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  private title = inject(Title);
  private metaService = inject(Meta);

  dataportfolio = dataportfolio;

  ngOnInit() {
    this.title.setTitle(`Portfolio | ${meta.title}`);
    this.metaService.updateTag({ name: 'description', content: meta.description });
  }
}

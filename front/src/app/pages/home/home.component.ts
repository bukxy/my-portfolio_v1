import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';
import {introdata, links, meta, socialprofils} from '../../content_option';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private title = inject(Title);
  private metaService = inject(Meta);

  introdata = introdata;
  currentText = signal('');
  private animIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private timer: ReturnType<typeof setTimeout> | null = null;

  ngOnInit() {
    this.title.setTitle(meta.title);
    this.metaService.updateTag({ name: 'description', content: meta.description });
    this.typeWriter();
  }

  ngOnDestroy() {
    if (this.timer) clearTimeout(this.timer);
  }

  private typeWriter() {
    const texts = this.introdata.animated;
    const current = texts[this.animIndex];

    if (this.isDeleting) {
      this.currentText.set(current.substring(0, this.charIndex - 1));
      this.charIndex--;
    } else {
      this.currentText.set(current.substring(0, this.charIndex + 1));
      this.charIndex++;
    }

    let delay = this.isDeleting ? 50 : 80;

    if (!this.isDeleting && this.charIndex === current.length) {
      delay = 1500;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.animIndex = (this.animIndex + 1) % texts.length;
    }

    this.timer = setTimeout(() => this.typeWriter(), delay);
  }

    protected readonly socialprofils = socialprofils;
  protected readonly links = links;
}

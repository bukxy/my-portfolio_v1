import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-page-loader',
  imports: [],
  templateUrl: './page-loader.html',
  styleUrl: './page-loader.css',
})
export class PageLoader {
  isHidden = signal(false);

  ngOnInit() {
    setTimeout(() => {
      this.isHidden.set(true);
    }, 800);
  }
}

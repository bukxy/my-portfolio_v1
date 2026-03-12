import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-animated-cursor',
  standalone: true,
  template: `
    <div class="cursor-outer"
         [style.left.px]="outerX()"
         [style.top.px]="outerY()"
         [style.transform]="'translate(-50%, -50%) scale(' + outerScale() + ')'">
    </div>
    <div class="cursor-inner"
         [style.left.px]="innerX()"
         [style.top.px]="innerY()"
         [style.transform]="'translate(-50%, -50%) scale(' + innerScale() + ')'">
    </div>
  `,
  styles: [`
    .cursor-inner, .cursor-outer {
      position: fixed;
      border-radius: 50%;
      pointer-events: none;
      z-index: 999999;
    }
    .cursor-inner {
      width: 15px; height: 15px;
      background-color: rgb(204, 0, 0);
      transition: transform 0.1s ease;
    }
    .cursor-outer {
      width: 15px; height: 15px;
      background-color: rgba(255,255,255,0.4);
      transition: left 0.08s ease, top 0.08s ease, transform 0.1s ease;
    }
  `]
})
export class AnimatedCursorComponent {
  innerX = signal(0); innerY = signal(0);
  outerX = signal(0); outerY = signal(0);
  innerScale = signal(0.7);
  outerScale = signal(1);

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.innerX.set(e.clientX);
    this.innerY.set(e.clientY);
    setTimeout(() => { this.outerX.set(e.clientX); this.outerY.set(e.clientY); }, 80);
  }

  @HostListener('document:mousedown')
  onMouseDown() { this.innerScale.set(1.2); this.outerScale.set(5); }

  @HostListener('document:mouseup')
  onMouseUp() { this.innerScale.set(0.7); this.outerScale.set(1); }
}

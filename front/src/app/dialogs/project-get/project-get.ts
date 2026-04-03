import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MarkdownComponent } from 'ngx-markdown';
import { MatButton, MatIconButton } from '@angular/material/button';
import { DatePipe, NgClass, NgTemplateOutlet } from '@angular/common';
import { NgScrollbar } from 'ngx-scrollbar';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-project-get',
  imports: [
    MatIcon,
    MarkdownComponent,
    MatButton,
    MatDialogClose,
    MatIconButton,
    NgClass,
    NgScrollbar,
    TranslatePipe,
    NgTemplateOutlet,
    DatePipe,
  ],
  templateUrl: './project-get.html',
  styleUrl: './project-get.css',
})
export class ProjectGet {
  data = inject(MAT_DIALOG_DATA);
  currentImage = signal(0);

  isLightboxOpen = signal(false);

  isMobile = signal(window.matchMedia('(pointer: coarse)').matches);

  openLightbox(index: number) {
    this.currentImage.set(index);
    this.isLightboxOpen.set(true);
  }

  closeLightbox() {
    this.isLightboxOpen.set(false);
  }

  prevImage() {
    this.currentImage.update((i) => (i === 0 ? this.data.images.length - 1 : i - 1));
  }

  nextImage() {
    this.currentImage.update((i) => (i === this.data.images.length - 1 ? 0 : i + 1));
  }
}

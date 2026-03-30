import {Component, inject, OnInit, signal} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {MarkdownComponent} from 'ngx-markdown';
import {MatButton, MatIconButton} from '@angular/material/button';
import {NgClass} from '@angular/common';
import {NgScrollbar} from 'ngx-scrollbar';
import {Project} from '../../components/project/project';

@Component({
  selector: 'app-project-get',
  imports: [
    MatIcon,
    MarkdownComponent,
    MatButton,
    MatDialogClose,
    MatIconButton,
    NgClass,
    NgScrollbar
  ],
  templateUrl: './project-get.html',
  styleUrl: './project-get.css',
})
export class ProjectGet {
  data = inject(MAT_DIALOG_DATA);
  currentImage = signal(0);

  prevImage() {
    this.currentImage.update(i => i === 0 ? this.data.images.length - 1 : i - 1);
  }

  nextImage() {
    this.currentImage.update(i => i === this.data.images.length - 1 ? 0 : i + 1);
  }
}

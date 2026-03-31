import {Component, inject} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  imports: [
    MatIcon
  ],
  template: `
    <div style="display:flex; align-items:center; justify-content:space-between; width:100%;">
      <span>{{ data.message }}</span>
      @if (data.icon) {
        <mat-icon>{{ data.icon }}</mat-icon>
      }
    </div>
  `,
  styleUrl: './snack-bar.css',
})
export class SnackBar {
  data = inject(MAT_SNACK_BAR_DATA);
}

import {ChangeDetectionStrategy, Component, inject, model, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';

export interface DialogData {
  animal: string;
  name: string;
}

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'app-login',
  template: `
    <button mat-icon-button (click)="openDialog()" class="flex items-center justify-center">
      <mat-icon style="font-size: 24px; width: 24px; height: 24px;">fingerprint</mat-icon>
    </button>
  `,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    button {
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      transition: color 0.2s;
    }

    button:hover {
      color: var(--accent-color) !important;
    }
  `]
})
export class Login {
  readonly dialog = inject(MatDialog);

  openDialog(): void {
    this.dialog.open(LoginForm, {
      data: {name: null, animal: null},
    });
  }
}

@Component({
  selector: 'app-login-form',
  imports: [
    MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule
  ],
  templateUrl: './login.html',
})
export class LoginForm {
  readonly dialogRef = inject(MatDialogRef<LoginForm>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly animal = model(this.data.animal);

  onNoClick(): void {
    this.dialogRef.close();
  }

  readonly username = new FormControl('', [Validators.required]);

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}

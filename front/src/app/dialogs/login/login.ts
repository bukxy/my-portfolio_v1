import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {LoginResponse} from '../../interfaces/login-interface';
import {RequesterService} from '../../services/requester/requester-service';
import {SnackBarCall} from '../../services/snack-bar/snack-bar';
import {DataModel} from '../../interfaces/data-model-interface';
import {AuthService} from '../../services/auth/auth-service';
import {MatTooltip} from '@angular/material/tooltip';

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'app-login',
  template: `
    @if (authService.isAuthenticated()) {
      <button mat-icon-button (click)="logout()" class="flex items-center justify-center"
              #tooltip="matTooltip"
              matTooltip="Logout !"
      >
        <mat-icon style="font-size: 24px; width: 24px; height: 24px;">logout</mat-icon>
      </button>
    } @else {
      <button mat-icon-button (click)="openDialog()" class="flex items-center justify-center"
              #tooltip="matTooltip"
              matTooltip="Login ^^"
      >
        <mat-icon style="font-size: 24px; width: 24px; height: 24px;">fingerprint</mat-icon>
      </button>
    }
  `,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIcon, MatTooltip],
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
  readonly authService = inject(AuthService);
  readonly request = inject(RequesterService);
  private snackBar = inject(SnackBarCall);

  openDialog(): void {
    this.dialog.open(LoginForm, {
      data: {name: null, animal: null},
    });
  }

  logout() {
    this.request.post<DataModel>('auth/signout', null, true)
    .subscribe({
      next: (res) => {
        this.snackBar.showSuccessMessage(res.message)
        this.authService.removeAccessToken()
      },
      error: (err) => this.snackBar.showErrorMessage(err.error.message),
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
export class LoginForm{
  readonly dialogRef = inject(MatDialogRef<LoginForm>);
  readonly request = inject(RequesterService);
  readonly authService = inject(AuthService);
  private snackBar = inject(SnackBarCall);

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  // LOGIN FORM REQUEST
  protected readonly loginFormGroup= new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  login() {
    if(this.loginFormGroup.valid) {
      this.request.post<LoginResponse>('auth/signin', this.loginFormGroup.value, true)
        .subscribe({
          next: (res) => {
            this.snackBar.showSuccessMessage(res.message)
            this.authService.setAccessToken(res.access_token)
            this.dialogRef.close();
          },
          error: (err) => this.snackBar.showErrorMessage(err.error.message),
        });
      }
  }
}

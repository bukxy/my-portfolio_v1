import {inject, Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import {SnackBar} from '../../tools/snack-bar/snack-bar';
import {Subject} from 'rxjs';

export enum SNACK_BAR_MESSAGE_TYPE {
  success = 'success-snackbar',
  warning = 'warning-snackbar',
  error = 'error-snackbar',
  default = 'default-snackbar'
}

@Injectable({
  providedIn: 'root',
})
export class SnackBarCall {
  private matSnackBar = inject(MatSnackBar);

  public showSnackBar(context: string, message: string, icon?: string) {
    this.matSnackBar.openFromComponent(SnackBar, {
      data: { message, icon },
      duration: 3000,
      panelClass: [context || SNACK_BAR_MESSAGE_TYPE.default],
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }

  public showErrorMessage(message: string) {
    this.showSnackBar(SNACK_BAR_MESSAGE_TYPE.error, message, 'close');
  }

  public showSuccessMessage(message: string) {
    this.showSnackBar(SNACK_BAR_MESSAGE_TYPE.success, message, 'check');
  }

  public showWarningMessage(message: string) {
    this.showSnackBar(SNACK_BAR_MESSAGE_TYPE.warning, message, 'warning');
  }

  public showDefaultMessage(message: string) {
    this.showSnackBar(SNACK_BAR_MESSAGE_TYPE.default, message, 'info');
  }
}

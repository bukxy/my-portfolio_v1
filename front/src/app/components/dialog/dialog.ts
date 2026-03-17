import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

export interface DialogAction {
  label: string;
  value?: any; // valeur retournée à afterClosed()
  color?: 'primary' | 'accent' | 'warn';
  variant?: 'flat' | 'stroked' | 'basic';
  closeOnClick?: boolean; // défaut: true
  handler?: () => void | Promise<void>;
}

export interface DialogData {
  title?: string;
  message?: string; // texte simple
  html?: string; // contenu HTML
  actions?: DialogAction[];
  disableClose?: boolean;
}

@Component({
  selector: 'app-dialog',
  imports: [MatDialogContent, MatDialogActions, MatButton, MatDialogTitle],
  templateUrl: './dialog.html',
  styleUrls: [],
})
export class GenericDialog {

  readonly data: DialogData = inject(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<GenericDialog>);

  async onAction(action: DialogAction) {
    if (action.handler) {
      await action.handler();
    }
    if (action.closeOnClick !== false) {
      this.dialogRef.close(action.value ?? action.label);
    }
  }
}

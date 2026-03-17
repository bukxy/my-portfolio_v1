import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DialogData, GenericDialog} from '../components/dialog/dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialog = inject(MatDialog);

  /**
   * Ouvre la dialog générique.
   */
  open<T = any>(data: DialogData, config?: MatDialogConfig): Observable<T> {
    const ref = this.dialog.open<GenericDialog, DialogData, T>(
      GenericDialog,
      {
        width: '480px',
        disableClose: data.disableClose ?? false,
        data,
        ...config,
      }
    );
    return ref.afterClosed() as Observable<T>;
  }

  /** confirmation Annuler / Confirmer */
  confirm(message: string, title = 'Confirmation'): Observable<boolean> {
    return this.open<boolean>({
      title,
      message,
      actions: [
        { label: 'Annuler',   value: false, variant: 'basic'   },
        { label: 'Confirmer', value: true,  variant: 'flat', color: 'primary' },
      ],
    });
  }

  /** suppression */
  confirmDelete(itemName?: string): Observable<boolean> {
    return this.open<boolean>({
      title: 'Supprimer ' + (itemName ?? 'cet élément') + ' ?',
      message: 'Cette action est irréversible.',
      disableClose: true,
      actions: [
        { label: 'Annuler',    value: false, variant: 'basic' },
        { label: 'Supprimer',  value: true,  variant: 'flat', color: 'warn' },
      ],
    });
  }

  /** information */
  info(message: string, title = 'Information'): Observable<void> {
    return this.open({
      title,
      message,
      actions: [{ label: 'OK', variant: 'flat', color: 'primary' }],
    });
  }
}

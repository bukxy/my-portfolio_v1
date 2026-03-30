import {ChangeDetectionStrategy, Component, inject, Injector} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {SnackBarCall} from '../../services/snack-bar/snack-bar';
import {SkillService} from '../../services/skill/skill-service';
import {DataModel} from '../../interfaces/data-model-interface';
import {ProjectService} from '../../services/project/project-service';

// Service list used by delete dialog
const SERVICE_MAP: Record<string, any> = {
  SkillService: SkillService,
  ProjectService: ProjectService,
};

@Component({
  selector: 'app-confirm-delete-dialog',
  styleUrl: './confirm-delete.css',
  templateUrl: './confirm-delete.html',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDeleteDialog {
  readonly dialogRef = inject(MatDialogRef<ConfirmDeleteDialog>);
  readonly data = inject(MAT_DIALOG_DATA);
  private injector = inject(Injector);
  private snackBarCall = inject(SnackBarCall);

  delete(): void {
    const serviceClass = SERVICE_MAP[this.data.service_name];
    const service = this.injector.get(serviceClass) as any;

    service.delete(this.data.id).subscribe({
      next: (res: DataModel) => {
        this.snackBarCall.showSuccessMessage(res.message);
        service.triggerRefresh();
        this.dialogRef.close();
      },
      error: (err: any) => this.snackBarCall.showErrorMessage(err.message)
    })
  }
}

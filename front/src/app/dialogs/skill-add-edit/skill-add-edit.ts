import {Component, inject, input, signal} from '@angular/core';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogClose} from '@angular/material/dialog';
import {RequesterService} from '../../services/requester/requester-service';
import {MatTooltip} from '@angular/material/tooltip';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {SnackBarCall} from '../../services/snack-bar/snack-bar';
import {SkillService} from '../../services/skill/skill-service';
import {ConfirmDeleteDialog} from '../confirm-delete/confirm-delete';
import {SkillInterface} from '../../interfaces/skill-interface';

@Component({
  selector: 'app-skill-add-edit',
  imports: [
    ReactiveFormsModule,
    MatIcon,
    MatIconButton,
    MatTooltip
  ],
  template: `
    @if (skillData()) {
      <button class="small-icon" mat-icon-button
              matTooltip="Supprimer {{ skillData().name}}"
              (click)="deleteSkill( skillData())">
        <mat-icon>delete_forever</mat-icon>
      </button>
      <button class="small-icon" mat-icon-button
              matTooltip="Editer {{ skillData().name}}"
              (click)="openAddEditDialog()">
        <mat-icon>edit</mat-icon>
      </button>
    } @else {
      <button mat-icon-button
              matTooltip="Ajouter"
              (click)="openAddEditDialog()">
        <mat-icon>add_circle</mat-icon>
      </button>
    }
  `,
})
export class SkillAddEditDialog {

  skillData = input<any>(null)

  readonly dialog = inject(MatDialog);
  readonly request = inject(RequesterService);

  openAddEditDialog(): void {
    this.dialog.open(SkillAddEditForm, {
      data: this.skillData() ?? {name: null, percentage: null},
    });
  }

  deleteSkill(data: SkillInterface): void {
    this.dialog.open(ConfirmDeleteDialog, {
      data: {
        id: data.id,
        service_name: 'SkillService',
        info: data.name
      }
    });
  }
}

@Component({
  selector: 'app-skill-form',
  imports: [
    MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatDialogClose, MatTooltip
  ],
  templateUrl: './skill-add-edit.html',
})
export class SkillAddEditForm {
  readonly data = inject(MAT_DIALOG_DATA);

  private snackBar = inject(SnackBarCall);
  private skillService = inject(SkillService);

  protected readonly skillFormGroup= new FormGroup({
    name: new FormControl(this.data?.name || '' , [Validators.required]),
    percentage: new FormControl(this.data?.percentage || '', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(0),
      Validators.max(100)]),
  });

  get isEdit() {
    return !!this.data?.id;
  }

  backendErrors = signal<Record<string, string>>({});

  submit() {
    if(this.isEdit) {
      this.skillService.update(this.data.id, this.skillFormGroup).subscribe({
        next: (res) => {
          this.snackBar.showSuccessMessage(res.message);
          this.skillService.triggerRefresh();
        },
        error: (err) => this.backendErrors.set(err.error.errors ?? {})
      })
    } else {
      this.skillService.add(this.skillFormGroup).subscribe({
        next: (res) => {
          this.snackBar.showSuccessMessage(res.message)
          this.skillService.triggerRefresh();
          this.skillFormGroup.reset();
        },
        error: (err) => this.backendErrors.set(err.error.errors ?? {})
      });
    }
  }
}

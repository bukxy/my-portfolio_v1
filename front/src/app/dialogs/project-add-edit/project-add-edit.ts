import {ChangeDetectionStrategy, Component, inject, input, signal} from '@angular/core';
import {MatButtonModule, MatIconButton} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialog, MatDialogClose} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {RequesterService} from '../../services/requester/requester-service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {SnackBarCall} from '../../services/snack-bar/snack-bar';
import {ConfirmDeleteDialog} from '../confirm-delete/confirm-delete';
import {ProjectService} from '../../services/project/project-service';
import {ProjectInterface} from '../../interfaces/project-interface';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import ChipsList, {Option} from '../../components/chips-list/chips-list';
import {SkillService} from '../../services/skill/skill-service';
import {SkillInterface} from '../../interfaces/skill-interface';

@Component({
  selector: 'app-project-add-edit',
  imports: [
    ReactiveFormsModule,
    MatIcon,
    MatIconButton,
    MatTooltip
  ],
  template: `
    @if (projectData()) {
      <button class="small-icon" mat-icon-button
              matTooltip="Supprimer {{ projectData().name}}"
              (click)="deleteProject( projectData())">
        <mat-icon>delete_forever</mat-icon>
      </button>
      <button class="small-icon" mat-icon-button
              matTooltip="Editer {{ projectData().name}}"
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
export class ProjectAddEditDialog {

  projectData = input<any>(null)

  readonly dialog = inject(MatDialog);
  readonly request = inject(RequesterService);

  openAddEditDialog(): void {
    this.dialog.open(ProjectAddEditForm, {
      data: this.projectData() ?? {name: null, percentage: null},
    });
  }

  deleteProject(data: ProjectInterface): void {
    this.dialog.open(ConfirmDeleteDialog, {
      data: {
        id: data.id,
        service_name: 'ProjectService',
        info: data.name
      }
    });
  }
}

@Component({
  selector: 'app-project-form',
  imports: [
    MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatDialogClose, MatSlideToggle, MatTooltip, ChipsList, ChipsList
  ],
  templateUrl: './project-add-edit.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectAddEditForm {
  readonly data = inject(MAT_DIALOG_DATA);

  readonly isEdit: boolean;
  private snackBar = inject(SnackBarCall);
  private projectService = inject(ProjectService);
  private skillService = inject(SkillService);

  listSkill = signal<Option[]>([]);

  ngOnInit() {
    this.skillService.getAll().subscribe({
      next: (res) => this.listSkill.set(
        res.map((skill: SkillInterface) => ({ id: skill.id, name: skill.name }))
      ),
      error: (err) => this.backendErrors.set(err.error.errors ?? {})
    });
  }

  constructor() {
    this.isEdit = !!this.data?.id;
  }

  backendErrors = signal<Record<string, string>>({});

  protected readonly projectFormGroup= new FormGroup({
    name: new FormControl(this.data?.name || '' , [Validators.required]),
    url: new FormControl(this.data?.url || '', [Validators.required]),
    is_github: new FormControl(this.data?.is_github || '', [Validators.required]),
    short_description: new FormControl(this.data?.short_description || '', [Validators.required]),
    description: new FormControl(this.data?.description || ''),
    date_start: new FormControl(this.data?.date_start || '', [Validators.required]),
    date_end: new FormControl(this.data?.date_end || '', []),
    images: new FormControl<File[]>([]),
    skill_ids: new FormControl(this.data?.skills || []),
  });

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.projectFormGroup.patchValue({ images: Array.from(input.files) });
    }
  }

  submit() {

    if (this.projectFormGroup.get('skill_ids')?.value) {
      const skillIds = this.projectFormGroup.get('skill_ids')?.value?.map((s: Option) => s.id) ?? [];
      this.projectFormGroup.patchValue({skill_ids: skillIds});
    }

    if (this.projectFormGroup.get('is_github')?.value)
      this.projectFormGroup.patchValue({description: ""});

    if(this.isEdit) {
      this.projectService.update(this.data.id, this.projectFormGroup).subscribe({
        next: (res) => {
          this.snackBar.showSuccessMessage(res.message);
          this.projectService.triggerRefresh();
        },
        error: (err) => this.backendErrors.set(err.error.errors ?? {})
      })
    } else {
      this.projectService.add(this.projectFormGroup).subscribe({
        next: (res) => {
          this.snackBar.showSuccessMessage(res.message)
          this.projectService.triggerRefresh();
          this.projectFormGroup.reset();
        },
        error: (err) => this.backendErrors.set(err.error.errors ?? {})
      });
    }
  }
}

import {Component, inject, input, OnInit, signal} from '@angular/core';
import {AuthService} from '../../services/auth/auth-service';
import {ProjectInterface, ProjectsInterface} from '../../interfaces/project-interface';
import {ProjectService} from '../../services/project/project-service';
import {ProjectAddEditDialog} from '../../dialogs/project-add-edit/project-add-edit';
import {MatDialog} from '@angular/material/dialog';
import {ProjectGet} from '../../dialogs/project-get/project-get';
import {MatChip, MatChipSet} from '@angular/material/chips';
import {DatePipe} from '@angular/common';
import {MatTooltip} from '@angular/material/tooltip';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-project',
  imports: [
    ProjectAddEditDialog,
    MatChip,
    MatChipSet,
    DatePipe,
    MatTooltip,
    TranslatePipe,
  ],
  templateUrl: './project.html',
})
export class Project implements OnInit {
  authService = inject(AuthService);
  readonly projectService = inject(ProjectService);

  readonly dialog = inject(MatDialog);

  projects = signal<ProjectsInterface>([]);
  isLoaded = signal(false);

  projectData = input<any>(null)

  openProject(project: ProjectInterface): void {
    this.dialog.open(ProjectGet, {
      data: project,
      width: '1200px',
      maxWidth: '95vw',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '150ms',
    });
  }

  ngOnInit() {
    this.loadProjects();

    this.projectService.onRefresh$.subscribe(() => {
      this.loadProjects();
    });
  }

  loadProjects() {
    this.projectService.getAll().subscribe(projects => {
      this.projects.set(projects);
      this.isLoaded.set(true);
    });
  }
}

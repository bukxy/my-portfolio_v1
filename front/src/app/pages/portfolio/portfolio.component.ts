import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { meta } from '../../content_option';
import { Project } from '../../components/project/project';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { ProjectAddEditForm } from '../../dialogs/project-add-edit/project-add-edit';
import { AuthService } from '../../services/auth/auth-service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ProjectFilter } from '../../interfaces/project-interface';
import { SkillsInterface } from '../../interfaces/skill-interface';
import { SkillService } from '../../services/skill/skill-service';
import { ProjectService } from '../../services/project/project-service';
import { MatFormField, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { CategoriesInterface } from '../../interfaces/category-interface';
import { CategoryService } from '../../services/category/category-service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  templateUrl: './portfolio.component.html',
  imports: [
    Project,
    MatIcon,
    MatIconButton,
    MatTooltip,
    TranslatePipe,
    MatFormField,
    MatSelect,
    MatLabel,
    MatOption,
  ],
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent implements OnInit {
  private title = inject(Title);
  private metaService = inject(Meta);
  authService = inject(AuthService);
  private translate = inject(TranslateService);
  readonly skillService = inject(SkillService);
  readonly categoryService = inject(CategoryService);

  filters = signal<ProjectFilter>({});
  readonly skills = signal<SkillsInterface>([]);
  readonly categories = signal<CategoriesInterface>([]);

  isLoaded = signal(false);
  readonly projectService = inject(ProjectService);
  projectData = input<any>(null);

  readonly dialog = inject(MatDialog);

  openAddEditDialog(): void {
    this.dialog.open(ProjectAddEditForm, {
      data: this.projectData() ?? { name: null, percentage: null },
    });
  }

  ngOnInit() {
    forkJoin({
      skills: this.skillService.getAll(),
      categories: this.categoryService.getAll(),
    }).subscribe(({ skills, categories }) => {
      this.skills.set(skills);
      this.categories.set(categories);
      this.isLoaded.set(true);
    });

    this.translate.stream('navigation.portfolio').subscribe((translated) => {
      this.title.setTitle(`${translated} | ${meta.title}`);
    });

    this.metaService.updateTag({ name: 'description', content: meta.description });
  }

  onSkillFilterChange(selectedIds: number[]) {
    this.filters.update((f) => ({
      ...f,
      skillIds: selectedIds.length ? selectedIds : undefined,
    }));
    this.projectService.setFilters(this.filters());
  }

  onCategoryFilterChange(selectedIds: number[]) {
    this.filters.update((f) => ({
      ...f,
      categoryIds: selectedIds.length ? selectedIds : undefined,
    }));
    this.projectService.setFilters(this.filters());
  }

  protected readonly meta = meta;
}

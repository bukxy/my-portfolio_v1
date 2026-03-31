import {Component, inject, input, OnInit} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {meta} from '../../content_option';
import {Project} from '../../components/project/project';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {MatDialog} from '@angular/material/dialog';
import {ProjectAddEditForm} from '../../dialogs/project-add-edit/project-add-edit';
import {AuthService} from '../../services/auth/auth-service';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  templateUrl: './portfolio.component.html',
  imports: [
    Project,
    MatIcon,
    MatIconButton,
    MatTooltip,
    TranslatePipe
  ],
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  private title = inject(Title);
  private metaService = inject(Meta);
  authService = inject(AuthService);
  private translate = inject(TranslateService);

  projectData = input<any>(null)

  readonly dialog = inject(MatDialog);

  openAddEditDialog(): void {
    this.dialog.open(ProjectAddEditForm, {
      data: this.projectData() ?? {name: null, percentage: null},
    });
  }

  ngOnInit() {
    this.translate.stream('navigation.portfolio').subscribe(translated => {
      this.title.setTitle(`${translated} | ${meta.title}`);
    });

    this.metaService.updateTag({ name: 'description', content: meta.description });

  }

  protected readonly meta = meta;
}

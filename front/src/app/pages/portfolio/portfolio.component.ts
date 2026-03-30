import {Component, OnInit, inject, input} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { dataportfolio, meta } from '../../content_option';
import {Project} from '../../components/project/project';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {MatDialog} from '@angular/material/dialog';
import {RequesterService} from '../../services/requester/requester-service';
import {ProjectAddEditForm} from '../../dialogs/project-add-edit/project-add-edit';
import {AuthService} from '../../services/auth/auth-service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  templateUrl: './portfolio.component.html',
  imports: [
    Project,
    MatIcon,
    MatIconButton,
    MatTooltip
  ],
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  private title = inject(Title);
  private metaService = inject(Meta);
  authService = inject(AuthService);

  projectData = input<any>(null)

  readonly dialog = inject(MatDialog);

  openAddEditDialog(): void {
    this.dialog.open(ProjectAddEditForm, {
      data: this.projectData() ?? {name: null, percentage: null},
    });
  }

  ngOnInit() {
    this.title.setTitle(`Portfolio | ${meta.title}`);
    this.metaService.updateTag({ name: 'description', content: meta.description });
  }
}

import {Component, inject, OnInit, signal} from '@angular/core';
import {AuthService} from '../../services/auth/auth-service';
import {RequesterService} from '../../services/requester/requester-service';
import {SkillsInterface} from '../../interfaces/skill-interface';
import {SkillService} from '../../services/skill/skill-service';
import {SkillAddEditDialog} from '../../dialogs/skill-add-edit/skill-add-edit';

@Component({
  selector: 'app-skill',
  host: { class: 'card-surface p-6 lg:col-span-7 md:p-8' },
  imports: [
    SkillAddEditDialog,
  ],
  templateUrl: './skill.html',
})
export class Skill implements OnInit {
  authService = inject(AuthService);
  private skillService = inject(SkillService);
  protected readonly req = inject(RequesterService);

  skills = signal<SkillsInterface>([]);
  isLoaded = signal(false);

  ngOnInit() {
    this.loadSkills();

    this.skillService.onRefresh$.subscribe(() => {
      this.loadSkills();
    });
  }

  loadSkills() {
    this.skillService.getAll().subscribe(skills => {
      this.skills.set(skills);
      this.isLoaded.set(true);
    });
  }

}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAddEdit } from './project-add-edit';

describe('ProjectAddEdit', () => {
  let component: ProjectAddEdit;
  let fixture: ComponentFixture<ProjectAddEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectAddEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectAddEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

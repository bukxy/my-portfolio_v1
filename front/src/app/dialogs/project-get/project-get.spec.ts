import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectGet } from './project-get';

describe('ProjectGet', () => {
  let component: ProjectGet;
  let fixture: ComponentFixture<ProjectGet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectGet],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectGet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

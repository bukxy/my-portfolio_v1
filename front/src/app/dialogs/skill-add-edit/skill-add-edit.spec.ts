import { ComponentFixture, TestBed } from '@angular/core/testing';
import {SkillAddEditForm} from './skill-add-edit';


describe('SkillAddEditForm', () => {
  let component: SkillAddEditForm;
  let fixture: ComponentFixture<SkillAddEditForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillAddEditForm],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillAddEditForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import ChipsList from './chips-list';

describe('ChipsList', () => {
  let component: ChipsList;
  let fixture: ComponentFixture<ChipsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChipsList],
    }).compileComponents();

    fixture = TestBed.createComponent(ChipsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillUnitComponent } from './skill-unit.component';

describe('SkillComponent', () => {
  let component: SkillUnitComponent;
  let fixture: ComponentFixture<SkillUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SkillUnitComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

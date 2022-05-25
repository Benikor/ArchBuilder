import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboSkillsComponent } from './combo-skills.component';

describe('ComboSkillsComponent', () => {
  let component: ComboSkillsComponent;
  let fixture: ComponentFixture<ComboSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComboSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

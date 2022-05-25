import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroicSkillsComponent } from './heroic-skills.component';

describe('HeroicSkillsComponent', () => {
  let component: HeroicSkillsComponent;
  let fixture: ComponentFixture<HeroicSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroicSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroicSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

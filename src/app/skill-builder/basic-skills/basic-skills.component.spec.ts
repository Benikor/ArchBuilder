import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicSkillsComponent } from './basic-skills.component';

describe('BasicSkillsComponent', () => {
  let component: BasicSkillsComponent;
  let fixture: ComponentFixture<BasicSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

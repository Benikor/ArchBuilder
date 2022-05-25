import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillBuilderComponent } from './skill-builder.component';

describe('SkillBuilderComponent', () => {
  let component: SkillBuilderComponent;
  let fixture: ComponentFixture<SkillBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

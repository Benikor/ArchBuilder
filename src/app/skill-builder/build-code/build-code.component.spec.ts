import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildCodeComponent } from './build-code.component';

describe('BuildCodeComponent', () => {
  let component: BuildCodeComponent;
  let fixture: ComponentFixture<BuildCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

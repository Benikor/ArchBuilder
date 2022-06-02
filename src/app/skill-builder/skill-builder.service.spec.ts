import { TestBed } from '@angular/core/testing';

import { SkillBuilderService } from './skill-builder.service';

describe('SkillBuilderService', () => {
  let service: SkillBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { Component, Input, OnInit } from '@angular/core';
import { Skill } from '../skill-builder/skill';
import { SkillBuilderService } from '../skill-builder/skill-builder.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css'],
})
export class SkillComponent implements OnInit {
  @Input() skill: Skill = {} as Skill;
  @Input() skillType = '';
  skillLevel = 0;

  constructor(private skillBuilderService: SkillBuilderService) {}

  ngOnInit(): void {}

  increasePoint() {
    if (
      this.skillLevel < 5 &&
      this.skillBuilderService.getAvilableSkillPoints() >=
        this.skill.skillPoints[this.skillLevel] &&
      this.skillBuilderService.getAvilableHeroicPoints() >=
        this.skill.heroicPoints[this.skillLevel]
    ) {
      this.skillBuilderService.increaseUsedSkillPoints(
        this.skill.skillPoints[this.skillLevel]
      );
      this.skillBuilderService.increaseUsedHeroicPoints(
        this.skill.heroicPoints[this.skillLevel]
      );
      this.skillLevel++;
    }
  }
  // WRITE SKILL POINTS TO THE JSON FILES
  decreasePoint() {
    if (this.skillLevel > 0) {
      this.skillLevel--;
      this.skillBuilderService.decreaseUsedSkillPoints(
        this.skill.skillPoints[this.skillLevel]
      );
      this.skillBuilderService.decreaseUsedHeroicPoints(
        this.skill.heroicPoints[this.skillLevel]
      );
    }
  }
}

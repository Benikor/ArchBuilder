import { Component, Input, OnInit } from '@angular/core';
import { Skill } from '../skill';
import { SkillBuilderService } from '../skill-builder.service';

@Component({
  selector: 'app-skill-unit',
  templateUrl: './skill-unit.component.html',
  styleUrls: ['./skill-unit.component.css'],
})
export class SkillUnitComponent implements OnInit {
  @Input() skill: Skill = {} as Skill;
  @Input() increasable: boolean = false;
  @Input() decreasable: boolean = false;
  displayDescription = false;

  constructor(private skillBuilderService: SkillBuilderService) {}

  ngOnInit(): void {}

  increaseSkillLevel() {
    if (this.increasable) {
      this.skillBuilderService.increaseUsedSkillPoints(
        this.skill.skillPoints[this.skill.level]
      );
      this.skillBuilderService.increaseUsedHeroicPoints(
        this.skill.heroicPoints[this.skill.level]
      );
      this.skillBuilderService.addMinLevel(
        this.skill.requiredLevels[this.skill.level]
      );
      this.skill.level++;
    }
  }

  decreaseSkillLevel() {
    if (this.decreasable) {
      this.skill.level--;
      this.skillBuilderService.decreaseUsedSkillPoints(
        this.skill.skillPoints[this.skill.level]
      );
      this.skillBuilderService.decreaseUsedHeroicPoints(
        this.skill.heroicPoints[this.skill.level]
      );
      this.skillBuilderService.removeMinLevel(
        this.skill.requiredLevels[this.skill.level]
      );
    }
  }
}

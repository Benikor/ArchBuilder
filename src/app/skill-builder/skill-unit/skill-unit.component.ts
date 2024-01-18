import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Skill } from '../skill';
import { SkillBuilderService } from '../skill-builder.service';

@Component({
  selector: 'app-skill-unit',
  templateUrl: './skill-unit.component.html',
  styleUrls: ['./skill-unit.component.css'],
})
export class SkillUnitComponent implements OnInit, OnChanges {
  @Input() skill: Skill = {} as Skill;
  @Input() levelLimit = 0;
  skillLevel = 0;
  displayDescription = false;

  constructor(private skillBuilderService: SkillBuilderService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    for (let i = this.skill.requiredLevels.length - 1; i >= 0; i--) {
      if (
        this.skill.requiredLevels[i] > this.levelLimit &&
        this.skillLevel > i
      ) {
        this.decreasePoint();
      }
    }
  }

  increasePoint() {
    console.log(this.skill);
    if (
      this.skillLevel < 5 &&
      this.levelLimit >= this.skill.requiredLevels[this.skillLevel] &&
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
      this.skillBuilderService.addMinLevel(
        this.skill.requiredLevels[this.skillLevel]
      );
      this.skillLevel++;

      this.skillBuilderService.getMinLevel();
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
      this.skillBuilderService.removeMinLevel(
        this.skill.requiredLevels[this.skillLevel]
      );

      this.skillBuilderService.getMinLevel();
    }
  }

  skillAvailable() {
    if (this.skillLevel < 5) {
      return (
        this.levelLimit >= this.skill.requiredLevels[this.skillLevel] &&
        this.skillBuilderService.getAvilableSkillPoints() != 0
      );
    } else {
      return (
        this.levelLimit >= this.skill.requiredLevels[this.skillLevel - 1] &&
        this.skillBuilderService.getAvilableSkillPoints() != 0
      );
    }
  }

  showDescription() {
    console.log(this.skill);
    this.displayDescription = !this.displayDescription;
  }
}

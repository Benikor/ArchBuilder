import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SkillBuilderService } from './skill-builder.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Skill } from './skill';
import { Subscription, forkJoin, switchMap } from 'rxjs';

@Component({
  selector: 'app-skill-builder',
  templateUrl: './skill-builder.component.html',
  styleUrls: ['./skill-builder.component.css'],
})
export class SkillBuilderComponent implements OnInit {
  levelLimitForm = new FormGroup({
    levelLimitInput: new FormControl(0),
  });

  skills: Skill[][] = [];
  skillTypes: string[] = [];
  currentClass: string = '';
  levelLimit: number = 0;

  subscriptions = new Subscription();

  constructor(
    private skillBuilderService: SkillBuilderService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscriptions = this.activatedRoute.params
      .pipe(
        switchMap((params) => {
          this.currentClass = params['currentClass'];
          return this.skillBuilderService.getTypes(this.currentClass);
        }),
        switchMap((skillTypes) => {
          let observables = [];
          this.skillTypes = skillTypes;
          for (let skillType of this.skillTypes) {
            observables.push(
              this.skillBuilderService.getSkills(
                this.currentClass,
                skillType.toLowerCase()
              )
            );
          }
          return forkJoin(observables);
        })
      )
      .subscribe((skills) => {
        this.skills = skills;
        this.levelLimit = this.getMaxLevel();
        this.skillBuilderService.resetMinLevel();
        this.skillBuilderService.setUsedSkillPoints(0);
        this.skillBuilderService.setUsedHeroicPoints(0);
        this.skillBuilderService.setMaxSkillPoint(this.levelLimit);
        this.skillBuilderService.setMaxHeroicPoint(this.levelLimit);
        this.levelLimitForm.controls['levelLimitInput'].setValue(
          this.levelLimit
        );
      });
  }

  changeLevelLimit() {
    console.log(this.skills);
    console.log(Number(this.levelLimitForm.value.levelLimitInput));
    if (
      Number(this.levelLimitForm.value.levelLimitInput) > this.getMaxLevel()
    ) {
      this.levelLimitForm.controls['levelLimitInput'].setValue(
        this.getMaxLevel()
      );
    }
    if (
      Number(this.levelLimitForm.value.levelLimitInput) < this.getMinLevel()
    ) {
      this.levelLimitForm.controls['levelLimitInput'].setValue(
        this.getMinLevel()
      );
    }
    this.levelLimit = Number(this.levelLimitForm.value.levelLimitInput);
    this.skillBuilderService.setMaxSkillPoint(this.levelLimit);
    this.skillBuilderService.setMaxHeroicPoint(this.levelLimit);
  }

  getMaxSkillPoints() {
    return this.skillBuilderService.getMaxSkillPoints();
  }

  getAvilableSkillPoints() {
    return this.skillBuilderService.getAvilableSkillPoints();
  }

  getMaxHeroicPoints() {
    return this.skillBuilderService.getMaxHeroicPoints();
  }

  getAvilableHeroicPoints() {
    return this.skillBuilderService.getAvilableHeroicPoints();
  }

  getMinLevel() {
    return this.skillBuilderService.getMinLevel();
  }

  getMaxLevel() {
    return this.skillBuilderService.getMaxLevel();
  }

  increasable(skill: Skill) {
    let requiredPassed = true;
    for (let requiredSkillName in skill.requiredSkills) {
      for (let skillsByType of this.skills) {
        for (let requiredSkill of skillsByType) {
          if (requiredSkill.name === requiredSkillName) {
            requiredPassed =
              requiredPassed &&
              requiredSkill.level >=
                Number(skill.requiredSkills[requiredSkillName as keyof Object]);
            break;
          }
        }
      }
    }

    return (
      skill.level < 5 &&
      (this.levelLimit >= skill.requiredLevels[skill.level] ||
        this.getMaxHeroicPoints() - this.getAvilableHeroicPoints() >=
          skill.requiredSpentHeroicPoints[skill.level]) &&
      this.getAvilableSkillPoints() >= skill.requiredSkillPoints[skill.level] &&
      this.getAvilableHeroicPoints() >=
        skill.requiredHeroicPoints[skill.level] &&
      requiredPassed
    );
  }

  decreasable(skill: Skill) {
    let requiredByPassed = true;
    for (let skillsByType of this.skills) {
      for (let requiredBySkill of skillsByType) {
        for (let requiredBySkillName in requiredBySkill.requiredSkills) {
          if (skill.name === requiredBySkillName) {
            requiredByPassed =
              requiredByPassed &&
              (requiredBySkill.level == 0 ||
                skill.level >
                  Number(
                    requiredBySkill.requiredSkills[
                      requiredBySkillName as keyof Object
                    ]
                  ));
          }
        }
      }
    }

    return skill.level > 0 && requiredByPassed;
  }

  resetSkillBuilder() {
    this.subscriptions.unsubscribe();
    this.ngOnInit();
  }
}

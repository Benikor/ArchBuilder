import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SkillBuilderService } from './skill-builder.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Skill } from './skill';
import { Subscription, forkJoin, switchMap } from 'rxjs';
import { BuildCode } from './build-code';

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
  skillsLoading = true;

  subscriptions = new Subscription();
  buildCode: BuildCode = {} as BuildCode;

  constructor(
    private skillBuilderService: SkillBuilderService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions = this.activatedRoute.params
      .pipe(
        switchMap((params) => {
          this.skillsLoading = true;
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
        this.levelLimit = this.buildCode.levelLimit
          ? Number(this.buildCode.levelLimit)
          : this.getMaxLevel();
        this.skillBuilderService.resetMinLevel();
        this.skillBuilderService.setUsedSkillPoints(0);
        this.skillBuilderService.setUsedHeroicPoints(0);
        this.skillBuilderService.setMaxSkillPoint(this.levelLimit);
        this.skillBuilderService.setMaxHeroicPoint(this.levelLimit);
        this.skillBuilderService.resetRequiredSpentSkillPoints();
        this.skillBuilderService.resetRequiredSpentHeroicPoints();
        this.levelLimitForm.controls['levelLimitInput'].setValue(
          this.levelLimit
        );
        if (this.buildCode.skillLevels) {
          this.activateBuildCode();
        }
        this.skillsLoading = false;
      });
  }

  changeLevelLimit() {
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
    let requirementPassed = true;
    let requiredSkillPointsSpent = true;
    let requiredHeroicPointsSpent = true;
    let requiredEvolutionSkillPointsSpent = true;
    for (let requiredSkillName in skill.requirements) {
      for (let skillsByType of this.skills) {
        for (let requiredSkill of skillsByType) {
          if (requiredSkill.name === requiredSkillName) {
            requirementPassed =
              requirementPassed &&
              requiredSkill.level >=
                Number(skill.requirements[requiredSkillName as keyof Object]);
            break;
          }
        }
      }
    }

    if (skill.requirements['All Skill Points' as keyof Object]) {
      requiredSkillPointsSpent =
        this.skillBuilderService.getUsedSkillPoints() >=
        Number(skill.requirements['All Skill Points' as keyof Object]);
    }

    if (skill.requirements['Heroic Skill Points' as keyof Object]) {
      requiredHeroicPointsSpent =
        this.skillBuilderService.getUsedHeroicPoints() >=
        Number(skill.requirements['Heroic Skill Points' as keyof Object]);
    }

    if (skill.requirements['Slayer Skill Points' as keyof Object]) {
      requiredEvolutionSkillPointsSpent =
        this.requiredEvolutionSkillPointsSpent(
          Number(skill.requirements['Slayer Skill Points' as keyof Object]),
          skill.type
        );
    }
    if (skill.requirements['Orbiter Skill Points' as keyof Object]) {
      requiredEvolutionSkillPointsSpent =
        this.requiredEvolutionSkillPointsSpent(
          Number(skill.requirements['Orbiter Skill Points' as keyof Object]),
          skill.type
        );
    }
    if (skill.requirements['Summoner Skill Points' as keyof Object]) {
      requiredEvolutionSkillPointsSpent =
        this.requiredEvolutionSkillPointsSpent(
          Number(skill.requirements['Summoner Skill Points' as keyof Object]),
          skill.type
        );
    }

    return (
      skill.level < 5 &&
      (this.levelLimit >= skill.requiredLevels[skill.level] ||
        skill.type.search('heroic') != -1) &&
      this.getAvilableSkillPoints() >= skill.requiredSkillPoints[skill.level] &&
      this.getAvilableHeroicPoints() >=
        skill.requiredHeroicPoints[skill.level] &&
      requiredEvolutionSkillPointsSpent &&
      requiredHeroicPointsSpent &&
      requiredSkillPointsSpent &&
      requirementPassed
    );
  }

  decreasable(skill: Skill) {
    let requirementByPassed = true;
    let requiredSkillPointsSpent = true;
    let requiredHeroicPointsSpent = true;
    for (let skillsByType of this.skills) {
      for (let requiredBySkill of skillsByType) {
        for (let requiredBySkillName in requiredBySkill.requirements) {
          if (skill.name === requiredBySkillName) {
            requirementByPassed =
              requirementByPassed &&
              (requiredBySkill.level == 0 ||
                skill.level >
                  Number(
                    requiredBySkill.requirements[
                      requiredBySkillName as keyof Object
                    ]
                  ));
          }
        }
      }
    }

    if (skill.requirements['All Skill Points' as keyof Object]) {
      requiredSkillPointsSpent =
        Number(skill.requirements['All Skill Points' as keyof Object]) >
          this.skillBuilderService.getRequiredSpentSkillPoints()[skill.level] ||
        this.skillBuilderService.getUsedSkillPoints() -
          skill.requiredSkillPoints[skill.level - 1] >=
          this.skillBuilderService.getRequiredSpentSkillPoints()[0];
    } else {
      requiredSkillPointsSpent =
        this.skillBuilderService.getUsedSkillPoints() -
          skill.requiredSkillPoints[skill.level - 1] >=
        this.skillBuilderService.getRequiredSpentSkillPoints()[0];
    }

    if (skill.requirements['Heroic Skill Points' as keyof Object]) {
      requiredHeroicPointsSpent =
        Number(skill.requirements['Heroic Skill Points' as keyof Object]) >
          this.skillBuilderService.getRequiredSpentHeroicPoints()[
            skill.level
          ] ||
        this.skillBuilderService.getUsedHeroicPoints() -
          skill.requiredHeroicPoints[skill.level - 1] >=
          this.skillBuilderService.getRequiredSpentHeroicPoints()[0];
    } else {
      requiredHeroicPointsSpent =
        this.skillBuilderService.getUsedHeroicPoints() -
          skill.requiredHeroicPoints[skill.level - 1] >=
        this.skillBuilderService.getRequiredSpentHeroicPoints()[0];
    }

    return (
      skill.level > 0 &&
      requirementByPassed &&
      requiredSkillPointsSpent &&
      requiredHeroicPointsSpent
    );
  }

  requiredEvolutionSkillPointsSpent(
    requiredEvolutionSkillPoints: number,
    skillType: string
  ) {
    let spentEvolutionSkillPoints = 0;
    for (let skillsByType of this.skills) {
      for (let skillByType of skillsByType) {
        if (skillByType.type != skillType) {
          break;
        }

        spentEvolutionSkillPoints =
          spentEvolutionSkillPoints + skillByType.level;
      }
      if (spentEvolutionSkillPoints != 0) {
        break;
      }
    }
    return spentEvolutionSkillPoints >= requiredEvolutionSkillPoints;
  }

  loadBuildCode(buildCode: BuildCode) {
    this.buildCode = buildCode;
    if (this.buildCode.currentClass != this.currentClass) {
      this.router.navigate([this.buildCode.currentClass]);
    } else {
      this.resetSkillBuilder();
    }
  }

  activateBuildCode() {
    let index = 0;
    for (let skillsByType of this.skills) {
      for (let skill of skillsByType) {
        for (let i = 0; i < this.buildCode.skillLevels[index]; i++) {
          this.skillBuilderService.increaseUsedSkillPoints(
            skill.requiredSkillPoints[skill.level]
          );
          this.skillBuilderService.increaseUsedHeroicPoints(
            skill.requiredHeroicPoints[skill.level]
          );
          this.skillBuilderService.addMinLevel(
            skill.requiredLevels[skill.level]
          );
          skill.level++;

          if (skill.requirements['All Skill Points' as keyof Object]) {
            this.skillBuilderService.addRequiredSpentSkillPoints(
              Number(skill.requirements['All Skill Points' as keyof Object])
            );
          }

          if (skill.requirements['Heroic Skill Points' as keyof Object]) {
            this.skillBuilderService.addRequiredSpentHeroicPoints(
              Number(skill.requirements['Heroic Skill Points' as keyof Object])
            );
          }
        }
        index++;
      }
    }
    this.buildCode = {} as BuildCode;
  }

  resetSkillBuilder() {
    this.subscriptions.unsubscribe();
    this.ngOnInit();
  }
}

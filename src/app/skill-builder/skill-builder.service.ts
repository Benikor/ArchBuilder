import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Skill } from './skill';
import { Router } from '@angular/router';
import { BuildCode } from './build-code';

@Injectable({
  providedIn: 'root',
})
export class SkillBuilderService {
  private maxSkillPoints = 0;
  private usedSkillPoints = 0;
  private maxHeroicPoints = 0;
  private usedHeroicPoints = 0;
  private maxLevel = 150;
  private minLevel = [0];
  private requiredSpentSkillPoints = [0];
  private requiredSpentHeroicPoints = [0];
  private buildCode: BuildCode = {} as BuildCode;

  constructor(private httpClient: HttpClient, private router: Router) {}

  setBuildCode(buildCode: BuildCode) {
    this.buildCode = buildCode;
  }

  loadBuildCode() {
    this.router.navigate([this.buildCode.currentClass]);
  }

  getBuildCode() {
    return this.buildCode;
  }

  setUsedSkillPoints(skillPoints: number) {
    this.usedSkillPoints = skillPoints;
  }

  increaseUsedSkillPoints(skillPoints: number) {
    this.usedSkillPoints += skillPoints;
  }

  decreaseUsedSkillPoints(skillPoints: number) {
    this.usedSkillPoints -= skillPoints;
  }

  getUsedSkillPoints() {
    return this.usedSkillPoints;
  }

  getAvilableSkillPoints() {
    return this.maxSkillPoints - this.usedSkillPoints;
  }

  addRequiredSpentSkillPoints(requiredSpentSkillPoints: number) {
    this.requiredSpentSkillPoints.push(requiredSpentSkillPoints);
    this.requiredSpentSkillPoints.sort((a, b) => b - a);
  }

  removeRequiredSpentSkillPoints(requiredSpentSkillPoints: number) {
    this.requiredSpentSkillPoints
      .splice(
        this.requiredSpentSkillPoints.indexOf(requiredSpentSkillPoints, 0),
        1
      )
      .sort((a, b) => b - a);
  }

  resetRequiredSpentSkillPoints() {
    this.requiredSpentSkillPoints = [0];
  }

  getRequiredSpentSkillPoints() {
    return this.requiredSpentSkillPoints;
  }

  setUsedHeroicPoints(HeroicPoints: number) {
    this.usedHeroicPoints = HeroicPoints;
  }

  increaseUsedHeroicPoints(HeroicPoints: number) {
    this.usedHeroicPoints += HeroicPoints;
  }

  decreaseUsedHeroicPoints(HeroicPoints: number) {
    this.usedHeroicPoints -= HeroicPoints;
  }

  getUsedHeroicPoints() {
    return this.usedHeroicPoints;
  }

  getAvilableHeroicPoints() {
    return this.maxHeroicPoints - this.usedHeroicPoints;
  }

  addRequiredSpentHeroicPoints(requiredSpentHeroicPoints: number) {
    this.requiredSpentHeroicPoints.push(requiredSpentHeroicPoints);
    this.requiredSpentHeroicPoints.sort((a, b) => b - a);
  }

  removeRequiredSpentHeroicPoints(requiredSpentHeroicPoints: number) {
    this.requiredSpentHeroicPoints
      .splice(
        this.requiredSpentHeroicPoints.indexOf(requiredSpentHeroicPoints, 0),
        1
      )
      .sort((a, b) => b - a);
  }

  resetRequiredSpentHeroicPoints() {
    this.requiredSpentHeroicPoints = [0];
  }

  getRequiredSpentHeroicPoints() {
    return this.requiredSpentHeroicPoints;
  }

  getSkillPointByLevel(level: number) {
    // Lv1 - Lv49 -> 1 SkillPoint // Lv50 - Lv70 -> 2 SkillPoint // Lv71 - Lv150 -> 1 SkillPoint
    return level + (level > 49 ? (level - 49 < 21 ? level - 49 : 21) : 0);
  }

  setMaxSkillPoint(level: number) {
    this.maxSkillPoints = this.getSkillPointByLevel(level);
  }

  getMaxSkillPoints() {
    return this.maxSkillPoints;
  }

  getRequiredLevelForSkillPoint() {
    let requiredLevelForSkillPoint = 0;
    for (let level = 0; level <= 150; level++) {
      if (this.getSkillPointByLevel(level) >= this.usedSkillPoints) {
        requiredLevelForSkillPoint = level;
        break;
      }
    }
    return requiredLevelForSkillPoint;
  }

  getHeroicPointByLevel(level: number) {
    // Lv90 -> 1 HeroicPoint // Lv91 - Lv110 -> 2 HeroicPoint // Lv111 - Lv150 -> 3 HeroicPoint
    return (
      (level - 89 > 0 ? level - 89 : 0) +
      (level - 90 > 0 ? level - 90 : 0) +
      (level - 110 > 0 ? level - 110 : 0)
    );
  }

  setMaxHeroicPoint(level: number) {
    this.maxHeroicPoints = this.getHeroicPointByLevel(level);
  }

  getMaxHeroicPoints() {
    return this.maxHeroicPoints;
  }

  getRequiredLevelForHeroicPoint() {
    let requiredLevelForHeroicPoint = 0;
    for (let level = 0; level <= 150; level++) {
      if (this.getHeroicPointByLevel(level) >= this.usedHeroicPoints) {
        requiredLevelForHeroicPoint = level;
        break;
      }
    }
    return requiredLevelForHeroicPoint;
  }

  getMaxLevel() {
    return this.maxLevel;
  }

  addMinLevel(minLevel: number) {
    this.minLevel.push(minLevel);
    this.minLevel.sort((a, b) => b - a);
  }

  removeMinLevel(minLevel: number) {
    this.minLevel
      .splice(this.minLevel.indexOf(minLevel, 0), 1)
      .sort((a, b) => b - a);
  }

  resetMinLevel() {
    this.minLevel = [0];
  }

  getMinLevel() {
    return this.getRequiredLevelForSkillPoint() > this.minLevel[0]
      ? this.getRequiredLevelForSkillPoint() >
        this.getRequiredLevelForHeroicPoint()
        ? this.getRequiredLevelForSkillPoint()
        : this.getRequiredLevelForHeroicPoint()
      : this.getRequiredLevelForHeroicPoint() > this.minLevel[0]
      ? this.getRequiredLevelForHeroicPoint()
      : this.minLevel[0];
  }

  getTypes(charClass: string): Observable<string[]> {
    return this.httpClient
      .get<string[]>(`assets/skillbuilder/${charClass}/types.json`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.router.navigate(['error'], { replaceUrl: true });
          return throwError(() => new Error(error.message));
        })
      );
  }

  getSkills(charClass: string, skillType: string): Observable<Skill[]> {
    return this.httpClient
      .get<Skill[]>(`assets/skillbuilder/${charClass}/${skillType}/skills.json`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.router.navigate(['error'], { replaceUrl: true });
          return throwError(() => new Error(error.message));
        })
      );
  }

  getClasses(): Observable<string[]> {
    return this.httpClient.get<string[]>('assets/classes/classes.json').pipe(
      catchError((error: HttpErrorResponse) => {
        this.router.navigate(['error'], { replaceUrl: true });
        return throwError(() => new Error(error.message));
      })
    );
  }
}

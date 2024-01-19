import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Skill } from './skill';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SkillBuilderService {
  private maxSkillPoints = 0;
  private usedSkillPoints = 0;
  private maxHeroicPoints = 0;
  private usedHeroicPoints = 0;
  private minLevel = [0];
  private maxLevel = 150;

  constructor(private httpClient: HttpClient, private router: Router) {}

  setUsedSkillPoints(skillPoints: number) {
    this.usedSkillPoints = skillPoints;
  }

  increaseUsedSkillPoints(skillPoints: number) {
    this.usedSkillPoints += skillPoints;
  }

  decreaseUsedSkillPoints(skillPoints: number) {
    this.usedSkillPoints -= skillPoints;
  }

  getAvilableSkillPoints() {
    return this.maxSkillPoints - this.usedSkillPoints;
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

  getAvilableHeroicPoints() {
    return this.maxHeroicPoints - this.usedHeroicPoints;
  }

  setMaxSkillPoint(charLevel: number) {
    this.maxSkillPoints =
      charLevel +
      (charLevel - 49 > 0 ? (charLevel - 49 < 21 ? charLevel - 49 : 21) : 0);
  }

  getMaxSkillPoints() {
    return this.maxSkillPoints;
  }

  setMaxHeroicPoint(charLevel: number) {
    // Lv90 -> 1HP // Lv91 - Lv110 -> 2HP // Lv111 - Lv150 -> 3HP
    this.maxHeroicPoints =
      (charLevel - 89 > 0 ? charLevel - 89 : 0) +
      (charLevel - 90 > 0 ? charLevel - 90 : 0) +
      (charLevel - 110 > 0 ? charLevel - 110 : 0);
  }

  getMaxHeroicPoints() {
    return this.maxHeroicPoints;
  }

  resetMinLevel() {
    this.minLevel = [0];
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

  getMinLevel() {
    return this.minLevel[0];
  }

  getMaxLevel() {
    return this.maxLevel;
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
    return this.httpClient
      .get<string[]>('assets/skillbuilder/classes.json')
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.router.navigate(['error'], { replaceUrl: true });
          return throwError(() => new Error(error.message));
        })
      );
  }
}

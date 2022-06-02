import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SkillBuilderService {
  constructor(private httpClient: HttpClient) {}

  getCharClasses(): Observable<string[]> {
    return this.httpClient.get<string[]>('assets/skillbuilder/classes.json');
  }
}

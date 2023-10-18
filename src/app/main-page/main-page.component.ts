import { Component, OnInit } from '@angular/core';
import { SkillBuilderService } from '../skill-builder/skill-builder.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  charClasses: string[] = [];

  constructor(private skillBuilderService: SkillBuilderService) {}

  ngOnInit(): void {
    this.getCharClasses();
  }

  getCharClasses() {
    this.skillBuilderService
      .getCharClasses()
      .subscribe((charClasses) => (this.charClasses = charClasses));
  }
}

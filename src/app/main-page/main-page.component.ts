import { Component, OnInit } from '@angular/core';
import { SkillBuilderService } from '../skill-builder/skill-builder.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  classes: string[] = [];
  classesLoading = true;

  constructor(private skillBuilderService: SkillBuilderService) {}

  ngOnInit(): void {
    this.getClasses();
  }

  getClasses() {
    this.classesLoading = true;
    this.skillBuilderService.getClasses().subscribe((classes) => {
      this.classes = classes;
      this.classesLoading = false;
    });
  }
}

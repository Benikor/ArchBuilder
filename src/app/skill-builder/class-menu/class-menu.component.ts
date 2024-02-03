import { Component, Input, OnInit } from '@angular/core';
import { SkillBuilderService } from '../skill-builder.service';

@Component({
  selector: 'app-class-menu',
  templateUrl: './class-menu.component.html',
  styleUrls: ['./class-menu.component.css'],
})
export class ClassMenuComponent implements OnInit {
  @Input() currentClass: string = '';
  classes: string[] = [];

  constructor(private skillBuilderService: SkillBuilderService) {}

  ngOnInit(): void {
    this.skillBuilderService
      .getClasses()
      .subscribe((classes) => (this.classes = classes));
  }
}

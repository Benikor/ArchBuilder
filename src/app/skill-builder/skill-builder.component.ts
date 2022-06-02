import { Component, OnInit } from '@angular/core';
import { SkillBuilderService } from './skill-builder.service';

@Component({
  selector: 'app-skill-builder',
  templateUrl: './skill-builder.component.html',
  styleUrls: ['./skill-builder.component.css'],
})
export class SkillBuilderComponent implements OnInit {
  charClasses: string[] = [];

  constructor(private skillBuilderService: SkillBuilderService) {}

  ngOnInit(): void {
    this.getCharClasses();
    console.log(this.charClasses);
  }

  getCharClasses() {
    this.skillBuilderService
      .getCharClasses()
      .subscribe((charClasses) => (this.charClasses = charClasses));
  }
}

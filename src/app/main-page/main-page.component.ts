import { Component, OnInit } from '@angular/core';
import { AES, enc } from 'crypto-js';
import { SkillBuilderService } from '../skill-builder/skill-builder.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  classes: string[] = [];
  classesLoading = true;

  buildCode: string = '';
  secretKey: string = 'ArchLordBuillderSecretKey';

  constructor(private skillBuilderService: SkillBuilderService) {}

  ngOnInit(): void {
    this.classesLoading = true;
    this.skillBuilderService.getClasses().subscribe((classes) => {
      this.classes = classes;
      this.classesLoading = false;
    });
  }

  loadBuildCode() {
    let buildCode;

    try {
      buildCode = JSON.parse(
        AES.decrypt(this.buildCode, this.secretKey.trim()).toString(enc.Utf8)
      );
    } catch (exception) {
      this.buildCode = 'Invalid Build Code!';
      return console.error(exception);
    }

    this.skillBuilderService.setBuildCode(buildCode);
    this.skillBuilderService.loadBuildCode();
  }
}

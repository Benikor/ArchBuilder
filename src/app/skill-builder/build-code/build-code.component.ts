import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { AES, enc } from 'crypto-js';
import { Skill } from '../skill';
import { BuildCode } from '../build-code';

@Component({
  selector: 'app-build-code',
  templateUrl: './build-code.component.html',
  styleUrls: ['./build-code.component.css'],
})
export class BuildCodeComponent implements OnInit, OnChanges {
  @Input() skills: Skill[][] = [];
  @Input() currentClass: string = '';
  @Input() levelLimit: number = 0;
  @Output() buildCodeEvent = new EventEmitter<BuildCode>();
  buildCode: string = '';
  buildCodePlaceholder: string = 'Insert or Generate Build Code!';
  secretKey: string = 'ArchLordBuillderSecretKey';

  constructor(private clipboard: Clipboard) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.buildCode = '';
    this.buildCodePlaceholder = 'Insert or Generate Build Code!';
  }

  generateBuildCode() {
    this.buildCode = '{"currentClass":"' + this.currentClass + '",';
    this.buildCode += '"levelLimit":"' + this.levelLimit + '",';
    this.buildCode += '"skillLevels":[';
    for (let skillsByType of this.skills) {
      for (let skill of skillsByType) {
        this.buildCode += skill.level + ',';
      }
    }

    this.buildCode = AES.encrypt(
      this.buildCode.replace(/,$/, ']}'),
      this.secretKey.trim()
    ).toString();

    // this.buildCode = this.buildCode.replace(/,$/, ']}'); // This is just for development
    this.buildCodePlaceholder = 'Insert or Generate Build Code!';
  }

  copyBuildCode() {
    this.clipboard.copy(this.buildCode);
  }

  loadBuildCode() {
    let buildCode;

    try {
      buildCode = JSON.parse(
        AES.decrypt(this.buildCode, this.secretKey.trim()).toString(enc.Utf8)
        // this.buildCode // This is just for development
      );
    } catch (exception) {
      this.buildCode = '';
      this.buildCodePlaceholder = 'Invalid Build Code!';
      return console.error(exception);
    }

    this.buildCodeEvent.emit(buildCode);
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SkillBuilderComponent } from './skill-builder/skill-builder.component';
import { BasicSkillsComponent } from './skill-builder/basic-skills/basic-skills.component';
import { ComboSkillsComponent } from './skill-builder/combo-skills/combo-skills.component';
import { HeroicSkillsComponent } from './skill-builder/heroic-skills/heroic-skills.component';
import { SkillComponent } from './skill-builder/skill/skill.component';

@NgModule({
  declarations: [
    AppComponent,
    SkillBuilderComponent,
    BasicSkillsComponent,
    ComboSkillsComponent,
    HeroicSkillsComponent,
    SkillComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SkillBuilderComponent } from './skill-builder/skill-builder.component';
import { BasicSkillsComponent } from './skill-builder/basic-skills/basic-skills.component';
import { ComboSkillsComponent } from './skill-builder/combo-skills/combo-skills.component';
import { HeroicSkillsComponent } from './skill-builder/heroic-skills/heroic-skills.component';
import { SkillComponent } from './skill-builder/skill/skill.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SkillDescriptionComponent } from './skill-builder/skill/skill-description/skill-description.component';

@NgModule({
  declarations: [
    AppComponent,
    SkillBuilderComponent,
    BasicSkillsComponent,
    ComboSkillsComponent,
    HeroicSkillsComponent,
    SkillComponent,
    MainPageComponent,
    HeaderComponent,
    PageNotFoundComponent,
    SkillDescriptionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

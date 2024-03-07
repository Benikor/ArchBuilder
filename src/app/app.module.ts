import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SkillBuilderComponent } from './skill-builder/skill-builder.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ClassMenuComponent } from './skill-builder/class-menu/class-menu.component';
import { SkillUnitComponent } from './skill-builder/skill-unit/skill-unit.component';
import { SkillDescriptionComponent } from './skill-builder/skill-unit/skill-description/skill-description.component';
import { BuildCodeComponent } from './skill-builder/build-code/build-code.component';

@NgModule({
  declarations: [
    AppComponent,
    SkillBuilderComponent,
    SkillUnitComponent,
    MainPageComponent,
    HeaderComponent,
    PageNotFoundComponent,
    SkillDescriptionComponent,
    ClassMenuComponent,
    BuildCodeComponent,
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

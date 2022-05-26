import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { SkillBuilderComponent } from './skill-builder/skill-builder.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'sorcerer', component: SkillBuilderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { SkillBuilderComponent } from './skill-builder/skill-builder.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  {
    path: 'skillbuilder',
    component: SkillBuilderComponent,
    children: [
      { path: 'knight', component: SkillBuilderComponent },
      { path: 'archer', component: SkillBuilderComponent },
      { path: 'mage', component: SkillBuilderComponent },
      { path: 'berserker', component: SkillBuilderComponent },
      { path: 'hunter', component: SkillBuilderComponent },
      { path: 'sorcerer', component: SkillBuilderComponent },
      { path: 'swashbuckler', component: SkillBuilderComponent },
      { path: 'ranger', component: SkillBuilderComponent },
      { path: 'elementalist', component: SkillBuilderComponent },
      { path: 'dragonscion', component: SkillBuilderComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

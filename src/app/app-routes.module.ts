import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SkillsComponent } from './skills/skills.component';
import { ExperienceComponent } from './experience/experience.component';

const routes: Routes = [
  { path: 'App', component: HomeComponent },
  { path: 'Skills', component: SkillsComponent },
  { path: 'Experience', component: ExperienceComponent },
  { path: '**', redirectTo: 'App' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}

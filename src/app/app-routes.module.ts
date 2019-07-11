import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkillsComponent } from './skills/skills.component';
import { ExperienceComponent } from './experience/experience.component';
import { AboutAppComponent } from './about-app/about-app.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { LoginComponent } from './auth/login/login.component';
// import { SignupComponent } from './auth/signup/signup.component';
import { MessageComponent } from './message/message.component';
import { AuthGuard } from './auth/auth.guard';
import { ContactComponent } from './contact/component/contact.component';

const routes: Routes = [
  { path: 'About-Me', component: AboutMeComponent },
  { path: 'About-App', component: AboutAppComponent },
  { path: 'Skills', component: SkillsComponent },
  { path: 'Experience', component: ExperienceComponent },
  {
    path: 'Messages',
    component: MessageComponent,
    canActivate: [AuthGuard],
  },
  { path: 'Contact-Me', component: ContactComponent },
  { path: 'Login', component: LoginComponent },
  // { path: 'Signup', component: SignupComponent },
  { path: '**', redirectTo: 'About-Me' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}

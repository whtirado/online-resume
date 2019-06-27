import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [FormsModule],
})
export class AuthModule {}

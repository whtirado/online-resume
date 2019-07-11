import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  declarations: [LoginComponent, SignupComponent],
})
export class AuthModule {}

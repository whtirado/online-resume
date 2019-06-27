import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { ICredentials } from '../credentials.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(private authService: AuthService) {}

  validateCredentials(form: NgForm) {
    if (form.valid) {
      const credentials: ICredentials = {
        email: form.controls.email.value,
        password: form.controls.password.value,
      };
      this.authService.signupUser(credentials);
    }
  }
}

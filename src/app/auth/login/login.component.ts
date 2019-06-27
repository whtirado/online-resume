import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ICredentials } from '../credentials.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  validateCredentials(form: NgForm) {
    if (form.valid) {
      const credentials: ICredentials = {
        email: form.controls.email.value,
        password: form.controls.password.value,
      };
      this.authService.loginUser(credentials);
    }
  }
}

import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ICredentials } from '../credentials.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
@Injectable()
export class LoginComponent implements OnInit, OnDestroy {
  private authServiceSub: Subscription;

  private readonly passwordToggleLabels = {
    show: 'Show',
    hide: 'Hide',
  };

  private readonly inputTypes = {
    text: 'text',
    password: 'password',
  };

  public isUserLoggedIn = false;
  public errorMessage = '';
  public isLoading = false;

  public showPassword = false;
  public inputType = this.inputTypes.password;
  public passwordToggleLabel = this.passwordToggleLabels.show;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authServiceSub = this.authService
      .getAuthStatusListener()
      .subscribe((response) => {
        if (response) {
          this.router.navigate(['/Messages']);
        }
      });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;

    this.inputType = this.showPassword
      ? this.inputTypes.text
      : this.inputTypes.password;

    this.passwordToggleLabel = this.showPassword
      ? this.passwordToggleLabels.hide
      : this.passwordToggleLabels.show;
  }

  validateCredentials(form: NgForm) {
    this.errorMessage = '';
    if (form.valid) {
      this.isLoading = true;

      const credentials: ICredentials = {
        email: form.value.email,
        password: form.value.password,
      };

      this.authService.loginUser(credentials).subscribe(
        (response) => {
          if (response.token) {
            this.authService.setAuthData(true, response.token);
            this.router.navigate(['/Messages']);
          }

          this.isLoading = false;
        },
        (error) => {
          this.errorMessage = error.error.message || 'Server Error';
          this.isLoading = false;
        }
      );
    } else {
      this.errorMessage = 'Please enter valid credentials';
    }
  }

  ngOnDestroy() {
    this.authServiceSub.unsubscribe();
  }
}

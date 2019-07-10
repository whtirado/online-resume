import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
import { Validator, FormBuilder, Validators } from '@angular/forms';
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

  public form;

  public isUserLoggedIn = false;
  public errorMessage = '';
  public isLoading = false;

  public showPassword = false;
  public inputType = this.inputTypes.password;
  public passwordToggleLabel = this.passwordToggleLabels.show;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: this.formBuilder.control(
        '',
        Validators.compose([Validators.required, Validators.email])
      ),
      password: this.formBuilder.control('', Validators.required),
    });

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

  validateCredentials(form) {
    this.errorMessage = '';
    console.log('form', form);
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
    }
  }

  ngOnDestroy() {
    this.authServiceSub.unsubscribe();
  }
}

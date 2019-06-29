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

  public isUserLoggedIn = false;
  public errorMessage = '';
  public isLoading = false;

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

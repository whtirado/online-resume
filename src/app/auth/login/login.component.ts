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
  public isUserLoggedIn = false;
  public errorMessage = '';
  private authServiceSub: Subscription;

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
      console.log('form valid', form);
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
        },
        (error) => {
          this.errorMessage = error.error.message;
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

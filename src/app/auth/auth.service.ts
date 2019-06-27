import { Injectable } from '@angular/core';
import { ICredentials } from './credentials.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isLoggedIn = false;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  isLogged() {
    return this.isLoggedIn;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  loginUser(loginCredentials) {
    this.http
      .post<{ message: string; token: string }>(
        'http://localhost:5000/api/auth/login',
        loginCredentials
      )
      .subscribe(
        (response) => {
          console.log('login response', response);
          if (response.token) {
            this.isLoggedIn = true;
            localStorage.setItem('token', response.token);
            this.authStatusListener.next(true);
            this.router.navigate(['/Messages']);
          }
        },
        (error) => {
          console.log('login error', error);
        }
      );
  }

  signupUser(loginCredentials) {
    this.http
      .post<{ message: string; data: object }>(
        'http://localhost:5000/api/auth/signup',
        loginCredentials
      )
      .subscribe(
        (response) => {
          console.log('signup response', response);
        },
        (error) => {
          console.log('signup error', error);
        }
      );
  }
}

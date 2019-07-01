import { Injectable } from '@angular/core';
import { ICredentials } from './credentials.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isLoggedIn = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  isLogged() {
    return this.isLoggedIn;
  }

  logoutUser() {
    this.clearAuthData();
  }

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  autoAuth() {
    const tokenData = { token: localStorage.getItem('token') };

    if (tokenData.token) {
      this.http
        .post<{ verified: boolean }>(
          environment.apiBaseUrl + '/api/auth/verify',
          tokenData
        )
        .subscribe(
          (response) => {
            if (response.verified) {
              this.setAuthData(true, tokenData.token);
            }
          },
          (error) => {}
        );
    }
  }

  loginUser(loginCredentials) {
    return this.http.post<{ message: string; token: string }>(
      environment.apiBaseUrl + '/api/auth/login',
      loginCredentials
    );
  }

  signupUser(loginCredentials) {
    this.http
      .post<{ message: string; data: object }>(
        environment.apiBaseUrl + '/api/auth/signup',
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

  setAuthData(isLoggedIn: boolean, token: string) {
    this.isLoggedIn = isLoggedIn;
    this.token = token;
    localStorage.setItem('token', token);
    this.authStatusListener.next(isLoggedIn);
  }

  clearAuthData() {
    this.isLoggedIn = false;
    localStorage.clear();
    this.authStatusListener.next(false);
  }
}

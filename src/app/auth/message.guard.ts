import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class MessageGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isLogged = this.authService.isLogged();

    if (!isLogged) {
      this.router.navigate(['/Login']);
    }

    return isLogged;
  }
}

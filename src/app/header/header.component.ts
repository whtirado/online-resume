import { Component, OnInit, OnDestroy, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
@Injectable()
export class HeaderComponent implements OnInit, OnDestroy {
  public authStatus = false;
  private authServiceSub: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authServiceSub = this.authService
      .getAuthStatusListener()
      .subscribe((newAuthStatus) => {
        this.authStatus = newAuthStatus;
      });

    if (localStorage.getItem('token')) {
      this.authService.autoAuth();
    }
  }

  logoutUser() {
    this.authService.logoutUser();
  }

  ngOnDestroy() {
    this.authServiceSub.unsubscribe();
  }
}

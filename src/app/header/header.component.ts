import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public authStatus = false;
  private authServiceSub: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authServiceSub = this.authService
      .getAuthStatusListener()
      .subscribe((newAuthStatus) => {
        this.authStatus = newAuthStatus;
        console.log('new auth status', newAuthStatus);
      });
  }

  ngOnDestroy() {
    this.authServiceSub.unsubscribe();
  }
}

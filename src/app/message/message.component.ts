import { Component, OnInit, Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { IMessage } from './message.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
@Injectable()
export class MessageComponent implements OnInit {
  public messages: IMessage[];

  constructor(
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (this.authService.isLogged()) {
      const tokenData = { token: this.authService.getToken() };
      this.messageService.getMessages(tokenData).subscribe(
        (response) => {
          console.log('message response', response);
          this.messages = response.data;
        },
        (error) => {
          this.authService.clearAuthData();
        }
      );
    }
  }
}

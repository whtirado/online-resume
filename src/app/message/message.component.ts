import { Component, OnInit, Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { IMessage } from './message.model';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
@Injectable()
export class MessageComponent implements OnInit {
  public messages: IMessage[] = [];
  public errorMessage = '';

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.authService.isLogged()) {
      const tokenData = { token: this.authService.getToken() };
      this.messageService.getMessages(tokenData).subscribe(
        (response) => {
          this.messages = response.data;
          console.log('get messages response', response);
        },
        (error) => {
          this.authService.clearAuthData();
          this.router.navigate(['/Login']);
        }
      );
    }
  }

  onDelete(messageId: string) {
    this.messageService.deleteMessage(messageId).subscribe(
      (deleteResponse) => {
        console.log('delete successful', deleteResponse);
        const tokenData = { token: this.authService.getToken() };
        this.messageService.getMessages(tokenData).subscribe(
          (getResponse) => {
            this.messages = getResponse.data;
          },
          (error) => {
            this.authService.clearAuthData();
            this.router.navigate(['/Login']);
          }
        );
      },
      (error) => {
        console.log('delete failed', error);
      }
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMessage } from './message.model';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class MessageService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getMessages(tokenData: { token: string }) {
    return this.http.post<{ message: string; data: IMessage[] }>(
      'http://localhost:5000/api/message/list',
      tokenData
    );
  }
}

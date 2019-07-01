import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IContact } from './contact.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ContactService {
  constructor(private http: HttpClient) {}

  sendMessage(message: IContact) {
    return this.http.post<{ message: string }>(
      environment.apiBaseUrl + '/api/contact/message/new',
      message
    );
  }

  getMessage() {
    return this.http.get<any>(
      environment.apiBaseUrl + '/api/contact/message/list'
    );
  }
}

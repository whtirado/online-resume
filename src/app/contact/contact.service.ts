import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IContact } from './contact.model';

@Injectable({ providedIn: 'root' })
export class ContactService {
  constructor(private http: HttpClient) {}

  sendMessage(message: IContact) {
    return this.http.post(
      'http://localhost:5000/api/contact/message/new',
      message
    );
  }

  getMessage() {
    return this.http.get('http://localhost:5000/api/contact/message/list');
  }
}

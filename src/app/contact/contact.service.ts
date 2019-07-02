import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IContact } from './contact.model';

@Injectable({ providedIn: 'root' })
export class ContactService {
  constructor(private http: HttpClient) {}

  sendMessage(message: IContact) {
    return this.http.post<{ message: string }>(
      'https://whtirado-online-resume-api.herokuapp.com/api/contact/message/new',
      message
    );
  }

  getMessage() {
    return this.http.get<any>(
      'https://whtirado-online-resume-api.herokuapp.com/api/contact/message/list'
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IContact } from './contact.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ContactService {
  constructor(private http: HttpClient) {}

  sendMessage(message: IContact) {
    return this.http.post<{ message: string }>(
      environment.baseUrl + '/api/contact/message/new',
      message
    );
  }

  getMessage() {
    return this.http.get<any>(
      environment.baseUrl + '/api/contact/message/list'
    );
  }
}

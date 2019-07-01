import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IContact } from './contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
@Injectable()
export class ContactComponent implements OnInit {
  public isLoading = false;
  public successMessage = '';
  public errorMessage = '';

  constructor(private contactService: ContactService) {}

  ngOnInit() {}

  submitMessage(form: NgForm) {
    this.successMessage = '';
    this.errorMessage = '';
    if (form.valid) {
      this.isLoading = true;
      const message: IContact = {
        date: new Date(),
        isRead: false,
        name: form.value.name,
        email: form.value.email,
        subject: form.value.subject,
        message: form.value.message,
      };

      this.contactService.sendMessage(message).subscribe(
        (response) => {
          form.resetForm();
          this.isLoading = false;
          this.successMessage = response.message;
        },
        (error) => {
          this.errorMessage = error.error.message || 'Server Error';
          this.isLoading = false;
        }
      );
    } else {
      this.errorMessage = 'All fields required';
    }
  }
}

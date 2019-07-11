import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IContact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
@Injectable()
export class ContactComponent implements OnInit {
  public form;
  public isLoading = false;
  public successMessage = '';
  public errorMessage = '';

  constructor(
    private contactService: ContactService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ])
      ),
      email: this.formBuilder.control(
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.maxLength(50),
        ])
      ),
      subject: this.formBuilder.control(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
        ])
      ),
      message: this.formBuilder.control(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(250),
        ])
      ),
    });
  }

  clearModalMessages() {
    this.successMessage = '';
    this.errorMessage = '';
  }

  resetForm(form) {
    this.clearModalMessages();
    this.form.reset();
  }

  submitMessage(form) {
    this.clearModalMessages();
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
          this.resetForm();
          this.isLoading = false;
          this.successMessage = response.message;
        },
        (error) => {
          this.errorMessage = error.error.message || 'Server Error';
          this.isLoading = false;
        }
      );
    }
  }
}

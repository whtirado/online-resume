import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  public isLoading = false;

  constructor() {}

  ngOnInit() {}

  submitMessage(form: NgForm) {
    console.log('message form', form);
  }
}

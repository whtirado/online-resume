import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contact-error',
  templateUrl: './contact.error.component.html',
})
export class ContactErrorComponent {
  @Input() contactFormControl;
}

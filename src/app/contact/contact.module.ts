import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './component/contact.component';
import { ContactErrorComponent } from './error/contact.error.component';

@NgModule({
  imports: [ReactiveFormsModule, CommonModule],
  declarations: [ContactComponent, ContactErrorComponent],
})
export class ContactModule {}

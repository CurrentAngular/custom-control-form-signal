import { Component, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { formModel } from './customer.model';

@Component({
  selector: 'cfc-customer',
  imports: [],
  templateUrl: './customer.html',
  styleUrl: './customer.scss',
})
export class Customer {
  readonly form = form(signal(formModel));
}

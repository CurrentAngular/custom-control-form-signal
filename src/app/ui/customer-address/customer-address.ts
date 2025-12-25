import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Field, FieldTree } from '@angular/forms/signals';
import { Address } from '../../components/customer/models';

@Component({
  selector: 'cfc-customer-address',
  imports: [Field],
  templateUrl: './customer-address.html',
  styleUrl: './customer-address.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerAddress {
  readonly address = input.required<FieldTree<Address>>();
}

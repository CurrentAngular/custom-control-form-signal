import { Component, signal } from '@angular/core';
import {
  form,
  Field,
  required,
  maxLength,
  hidden,
  schema,
  minLength,
  applyWhen,
} from '@angular/forms/signals';
import { formModel, Address } from './models';

const addressSchema = schema<Address>((path) => {
  required(path.city);
  minLength(path.city, 3);

  required(path.street);
  minLength(path.street, 3);

  required(path.zipCode);
  minLength(path.zipCode, 3, { message: 'Zip code must be between 3 and 5 characters long.' });
  maxLength(path.zipCode, 3, { message: 'Zip code must be between 3 and 5 characters long.' });
});

@Component({
  selector: 'cfc-customer',
  imports: [Field],
  templateUrl: './customer.html',
  styleUrl: './customer.scss',
})
export class Customer {
  readonly form = form(signal(formModel), (path) => {
    // first name field
    required(path.firstName, { message: 'First name is required' });
    maxLength(path.firstName, 255);

    // last name
    required(path.lastName, { message: 'Last name is required' });
    maxLength(path.lastName, 255);

    hidden(path.billingAddress, ({ valueOf }) => !valueOf(path.hasBillingAddress));
    // функция applyWhen применяет схему только по условию, которое реализовано в callback-функции
    // в данном случае схема валидации addressSchema применится к контролу billingAddress только с случае, когда значение контрола hasBillingAddress будет равно true
    // функция apply применяет схему валидации к контролу сразу и без каких-либо условий
    applyWhen(path.billingAddress, ({ valueOf }) => valueOf(path.hasBillingAddress), addressSchema);

    hidden(path.shippingAddress, ({ valueOf }) => !valueOf(path.hasShippingAddress));
    // функция applyWhen применяет схему только по условию, которое реализовано в callback-функции
    applyWhen(
      path.shippingAddress,
      ({ valueOf }) => valueOf(path.hasShippingAddress),
      addressSchema
    );
    // path.shippingAddress.note - можно по цепочке дойти до нужного контрола
    // в данном случае добавляем валидацию для отдельного контрола, который не входит в структуру объекта Address, но входит в структуру контрола shippingAddress
    // то есть - контролы billingAddress и shippingAddress имеют три одинаковых поля, поэтому чтобы не повторяться - была одна общая для этих трех полей схема addressSchema
    // которую и применили для контролов billingAddress и shippingAddress
    // у контрола shippingAddress есть одно уникальное поле, поэтому его провалидировали отдельно
    minLength(path.shippingAddress.note, ({ value }) => (value() ? 10 : 0));
  });
}

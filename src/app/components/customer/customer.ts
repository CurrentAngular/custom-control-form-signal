import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  form,
  Field,
  required,
  maxLength,
  hidden,
  minLength,
  applyWhen,
  submit,
  FieldTree,
  customError,
} from '@angular/forms/signals';
import { FormModel, initFormModel } from './models';
import { CustomerAddress } from '../../ui/customer-address/customer-address';
import { addressSchema } from './address.schema';
import { CustomerDto } from './dto/customer.dto';
import { CustomerService } from '../../services/customer.service';
import { catchError, firstValueFrom, map, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'cfc-customer',
  imports: [Field, CustomerAddress],
  templateUrl: './customer.html',
  styleUrl: './customer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Customer {
  readonly #service = inject(CustomerService);

  readonly form = form(signal<FormModel>(initFormModel()), (path) => {
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

  async onSumbit(): Promise<void> {
    await submit(this.form, async (form) => {
      if (this.form().invalid()) {
        return;
      }

      const newCustomer = this.#generateCustomer(form);

      return await firstValueFrom(
        this.#service.createCustomer(newCustomer).pipe(
          map(() => {
            form().reset(); // сбрасываем все состояния контролов формы на дефолтные значения
            form().value.set(initFormModel()); // сбрасываем все значения контролов формы на дефолтные значения

            return null;
          }),
          catchError((error: Error) => {
            const serverError = customError({
              kind: 'server error',
              message:
                error instanceof HttpErrorResponse
                  ? error.error.title
                  : 'An unexpected error occurred, please try again',
            });

            return of(serverError);
          })
        )
      );
    });
  }

  #generateCustomer(form: FieldTree<FormModel>): CustomerDto {
    const {
      firstName,
      lastName,
      hasBillingAddress,
      billingAddress,
      hasShippingAddress,
      shippingAddress,
    } = form().value();

    return {
      firstName,
      lastName,
      hasBillingAddress,
      billingAddress: hasBillingAddress
        ? {
            city: billingAddress.city,
            street: billingAddress.street,
            zipCode: billingAddress.zipCode,
          }
        : null,
      hasShippingAddress,
      shippingAddress: hasShippingAddress
        ? {
            city: shippingAddress.city,
            street: shippingAddress.street,
            zipCode: shippingAddress.zipCode,
            note: shippingAddress.note,
          }
        : null,
    };
  }
}

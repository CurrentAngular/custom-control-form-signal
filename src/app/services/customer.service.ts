import { Injectable } from '@angular/core';
import { CustomerDto } from '../components/customer/dto/customer.dto';
import { Observable, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { customerRequestDtoSchema } from '../components/customer/dto/customer-request.dto';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  createCustomer(customer: CustomerDto): Observable<CustomerDto> {
    // 1. Валидация данных "на входе" сервиса
    const validationResult = customerRequestDtoSchema.safeParse(customer);

    if (!validationResult.success) {
      console.error('Ошибка валидации DTO:', validationResult.error.flatten());

      // Возвращаем ошибку как Observable, чтобы подписчик в компоненте мог ее обработать
      // Можно выбросить HttpErrorResponse для унификации
      return throwError(
        () =>
          new HttpErrorResponse({
            error: { title: 'Invalid Data Format' },
            status: 400,
          })
      );
    }

    // 2. Если валидация прошла успешно, используем валидные данные (result.data)
    const validData = validationResult.data;

    console.log('Отправляем валидные данные на сервер:', validData);

    // Здесь будет реальный HTTP запрос:
    // return this.http.post<CustomerDto>('/api/customers', validData);

    // Для заглушки возвращаем данные
    return of(validData);
  }
}

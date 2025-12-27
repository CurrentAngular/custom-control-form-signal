import { Injectable } from '@angular/core';
import { CustomerDto } from '../components/customer/dto/customer.dto';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  createCustomer(customer: CustomerDto): Observable<CustomerDto> {
    console.log(customer);

    return of(customer);
  }
}

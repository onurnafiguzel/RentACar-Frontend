import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl = 'https://localhost:44367/api/customers';
  constructor(private httpClient: HttpClient) {}

  getCustomerById(): Observable<ListResponseModel<Customer>> {
    let newPath = this.apiUrl + '/getbyid';
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }

  getCustomers(): Observable<ListResponseModel<Customer>> {
    let newPath = this.apiUrl + '/getall';
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }
}
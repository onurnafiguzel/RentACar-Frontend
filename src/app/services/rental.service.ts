import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = 'https://localhost:44367/api/rentals/getrentaldetails';
  constructor(private httpClient: HttpClient) {}

  GetRentals(): Observable<ListResponseModel<Rental>> {
    return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl);
  }

  add(rental: Rental, carId: number): Observable<ResponseModel> {
    rental.id = carId;
    return this.httpClient.post<ResponseModel>(this.apiUrl + '/add', rental);
  }
}

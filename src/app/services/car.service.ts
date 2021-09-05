import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44367/api/cars/';
  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'getcardetails';
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId: number): Observable<ListResponseModel<Car>> {
    let newPah = this.apiUrl + 'getbybrandid?id=' + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPah);
  }

  getCarsByColor(colorId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'getbycolorid?id=' + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarByCarId(carId: number): Observable<ItemResponseModel<Car>> {
    let newPath = this.apiUrl + 'getcarbyid?id=' + carId;
    return this.httpClient.get<ItemResponseModel<Car>>(newPath);
  }

  getCarsByBrandIdAndColorId(
    brandId: number,
    colorId: number
  ): Observable<ListResponseModel<Car>> {
    let newPath =
      this.apiUrl +
      'getcarsbybrandidandcolorid?brandId=' +
      brandId +
      '&colorId=' +
      colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  add(car: Car): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'add', car);
  }

  update(car: Car): Observable<ItemResponseModel<Car>> {
    return this.httpClient.post<ItemResponseModel<Car>>(
      this.apiUrl + 'update',
      car
    );
  }
}

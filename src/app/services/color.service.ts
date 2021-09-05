import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  apiUrl = 'https://localhost:44367/api/colors/';
  constructor(private httpClient: HttpClient) {}

  getColors(): Observable<ListResponseModel<Color>> {
    return this.httpClient.get<ListResponseModel<Color>>(
      this.apiUrl + 'getall'
    );
  }

  add(color: Color): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'add', color);
  }

  getSingleColor(colorId: number): Observable<ItemResponseModel<Color>> {
    return this.httpClient.get<ItemResponseModel<Color>>(
      this.apiUrl + 'getbyid?id=' + colorId
    );
  }

  update(color: Color): Observable<ItemResponseModel<Color>> {
    return this.httpClient.post<ItemResponseModel<Color>>(
      this.apiUrl + 'update',
      color
    );
  }
}

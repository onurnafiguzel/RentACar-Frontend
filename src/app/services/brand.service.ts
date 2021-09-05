import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl="https://localhost:44367/api/brands/";
  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl+"getall");
  }

  add(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",brand)
  }

  getSingleBrand(brandId:number):Observable<ItemResponseModel<Brand>>{
    return this.httpClient.get<ItemResponseModel<Brand>>(this.apiUrl+"getbyid?id="+brandId)
  }

  update(brand:Brand):Observable<ItemResponseModel<Brand>>{
    return this.httpClient.post<ItemResponseModel<Brand>>(this.apiUrl+"update",brand);
  }
}

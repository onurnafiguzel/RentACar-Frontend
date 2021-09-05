import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemResponseModel } from '../models/itemResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'https://localhost:44367/api/users/';
  constructor(private httpClient: HttpClient) {}

  getByEmail(email: string): Observable<User> {
    let newPath = this.apiUrl + 'getbyemail?email=' + email;
    return this.httpClient.get<User>(newPath);
  }

  getById(id: number): Observable<ItemResponseModel<User>> {
    let newPath = this.apiUrl + 'getbyid?id=' + id;
    return this.httpClient.get<ItemResponseModel<User>>(newPath);
  }
  
  update(user:User):Observable<ItemResponseModel<User>>{
    console.log(user);
    return this.httpClient.post<ItemResponseModel<User>>(this.apiUrl+"update",user);
  }
}

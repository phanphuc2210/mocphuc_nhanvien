import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BASE_URL = 'http://localhost:8000/users';

  constructor(private httpClient: HttpClient) { }

  public getAllUsers(role: string): Observable<any> {
    return this.httpClient.get<any>(`${this.BASE_URL}/${role}`);
  }

  public getUser(id:string): Observable<any> {
    return this.httpClient.get<any>(`${this.BASE_URL}/${id}`)
  }

  public editUser(id:string, data:User): Observable<any> {
    return this.httpClient.put<any>(`${this.BASE_URL}/${id}`, data)
  }

  public deleteUser(id:string): Observable<any> {
    return this.httpClient.delete<any>(`${this.BASE_URL}/${id}`)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private NODE_API = 'http://localhost:8000/users';

  constructor(private httpClient: HttpClient) { }

  public getAllUsers(role: string): Observable<any> {
    return this.httpClient.get<any>(`${this.NODE_API}/${role}`);
  }

  public getUser(id:string): Observable<any> {
    return this.httpClient.get<any>(`${this.NODE_API}/${id}`)
  }

  public editUser(id:string, data:User): Observable<any> {
    return this.httpClient.put<any>(`${this.NODE_API}/${id}`, data)
  }

  public deleteUser(id:string): Observable<any> {
    return this.httpClient.delete<any>(`${this.NODE_API}/${id}`)
  }

  public changePassword(id: number, data: any): Observable<any> {
    return this.httpClient.patch<any>(`${this.NODE_API}/${id}/change-password`, data)
  }
}

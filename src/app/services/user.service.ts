import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private NODE_API = environment.apiURL;
  private endpoint = 'users'
  private API_URL = `${this.NODE_API}/${this.endpoint}`;

  constructor(private httpClient: HttpClient) { }

  public getAllUsers(role: string): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.API_URL}?role=${role}`);
  }

  public getUser(id:string): Observable<User> {
    return this.httpClient.get<User>(`${this.API_URL}/${id}`)
  }

  public editUser(id:string, data:User): Observable<any> {
    return this.httpClient.put<any>(`${this.API_URL}/${id}`, data)
  }

  public deleteUser(id:string): Observable<any> {
    return this.httpClient.delete<any>(`${this.API_URL}/${id}`)
  }

  public changePassword(id: number, data: any): Observable<any> {
    return this.httpClient.patch<any>(`${this.API_URL}/${id}/change-password`, data)
  }

  public forgotPassword(data: {email: string, isAdmin: boolean}): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}/forgot-password`, data)
  }

  public resetPassword(data: {newPass: string, resetToken: string}): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}/reset-password`, data)
  }
}

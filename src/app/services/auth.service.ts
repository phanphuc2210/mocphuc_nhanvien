import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL = 'http://localhost:3000/'
  private NODE_API = 'http://localhost:8000/auth/'
  public loginSubject = new BehaviorSubject<boolean>(localStorage.getItem('token')? true : false)
  public userSubject = new BehaviorSubject(
    localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')!) : {}
  )

  constructor(private httpClient: HttpClient) { }

  public register(data: User): Observable<any> {
    return this.httpClient.post<any>(`${this.NODE_API}register`, data)
  }

  public login(data: {}): Observable<any> {
    return this.httpClient.post<any>(`${this.NODE_API}login`, data)
  }
}

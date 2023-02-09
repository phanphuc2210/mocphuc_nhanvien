import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private NODE_API = 'http://localhost:8000/auth/'

  public loginSubject = new BehaviorSubject<boolean>(localStorage.getItem('token')? true : false)
  public userSubject = new BehaviorSubject(
    localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')!) : {}
  )

  constructor(private httpClient: HttpClient, private router: Router) { }

  public register(data: User): Observable<any> {
    return this.httpClient.post<any>(`${this.NODE_API}register`, data)
  }

  public login(data: {}): Observable<any> {
    return this.httpClient.post<any>(`${this.NODE_API}login`, data)
  }

  public logOut(): void {
    localStorage.clear()
    this.loginSubject.next(false)
    this.router.navigate(['/login']);
  }
}

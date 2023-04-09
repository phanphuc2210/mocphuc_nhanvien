import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Payment } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private NODE_API = environment.apiURL;
  private endpoint = 'invoice'
  private API_URL = `${this.NODE_API}/${this.endpoint}`;

  constructor(private http: HttpClient) { }

  public getList(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/list/0`)
  }

  public getDetail(orderId: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${orderId}`)
  }

  public getNextStatus(orderId: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/next-status/${orderId}`)
  }

  public getListStatus(orderId: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/status/${orderId}`)
  }

  public updateStatus(data: {orderId: number, nextStatus: number}): Observable<any> {
    return this.http.patch<any>(`${this.API_URL}/update-status`, data)
  }

  public getStatis(from: string, to: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/statistical?from=${from}&to=${to}`)
  }

  public sendMail(data: Payment): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/send-mail`, data)
  }
}

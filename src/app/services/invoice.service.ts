import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private NODE_API = "http://localhost:8000/cart"

  constructor(private http: HttpClient) { }

  public getList(): Observable<any> {
    return this.http.get<any>(`${this.NODE_API}/invoice/list/0`)
  }

  public getDetail(orderId: number): Observable<any> {
    return this.http.get<any>(`${this.NODE_API}/invoice/${orderId}`)
  }

  public getStatis(from: string, to: string): Observable<any> {
    return this.http.get<any>(`${this.NODE_API}/statistical?from=${from}&to=${to}`)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private NODE_API = "http://localhost:8000/invoice"

  constructor(private http: HttpClient) { }

  public getList(): Observable<any> {
    return this.http.get<any>(`${this.NODE_API}/list/0`)
  }

  public getDetail(orderId: number): Observable<any> {
    return this.http.get<any>(`${this.NODE_API}/${orderId}`)
  }

  public getStatis(from: string, to: string): Observable<any> {
    return this.http.get<any>(`${this.NODE_API}/statistical?from=${from}&to=${to}`)
  }
}

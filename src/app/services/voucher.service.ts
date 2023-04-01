import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Voucher } from '../models/voucher.model';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {
  private NODE_API = environment.apiURL
  private endpoint = 'voucher'
  private API_URL = `${this.NODE_API}/${this.endpoint}`

  constructor(private httpClient: HttpClient) { }

  public getVoucherList(): Observable<Voucher[]> {
    return this.httpClient.get<any>(`${this.API_URL}`)
  }

  public getVoucher(id: string | number): Observable<Voucher> {
    return this.httpClient.get<Voucher>(`${this.API_URL}/${id}`)
  }

  public addVoucher(data: Voucher): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}`, data)
  }

  public updateVoucher(id: string, data: Voucher): Observable<any> {
    return this.httpClient.put<any>(`${this.API_URL}/${id}`, data)
  }
}

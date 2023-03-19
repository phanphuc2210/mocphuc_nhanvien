import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductType } from '../models/productType.model';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  private NODE_API = environment.apiURL
  private endpoint = 'types'
  private API_URL = `${this.NODE_API}/${this.endpoint}`

  constructor(private httpClient: HttpClient) { }

  public getProductTypes(): Observable<ProductType[]> {
    return this.httpClient.get<ProductType[]>(`${this.API_URL}`);
  }

  public getType(id: string): Observable<ProductType> {
    return this.httpClient.get<ProductType>(`${this.API_URL}/${id}`)
  }

  public getParentTypes(): Observable<ProductType[]> {
    return this.httpClient.get<ProductType[]>(`${this.API_URL}/parent`)
  }

  public addType(data: ProductType): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}`, data)
  }

  public updateType(id: string, data: ProductType): Observable<any> {
    return this.httpClient.put<any>(`${this.API_URL}/${id}`, data)
  }

  public deleteType(id: string | number): Observable<any> {
    return this.httpClient.delete<any>(`${this.API_URL}/${id}`)
  }
}

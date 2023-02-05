import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductType } from '../models/productType.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private BASE_URL = "http://localhost:3000/";
  private NODE_API = "http://localhost:8000/";

  constructor(private httpClient: HttpClient) { }

  public uploadImage(data:any): Observable<any> {
    return this.httpClient.post<any>(`${this.NODE_API}upload`, data)
  }

  public getProductTypes(): Observable<any> {
    return this.httpClient.get<any>(`${this.NODE_API}types`);
  }

  public getProduct(id:string): Observable<any> {
    return this.httpClient.get<any>(`${this.NODE_API}products/${id}`);
  }

  public getAllProducts(typeId?: string): Observable<any> {
    const classify = typeId? `typeId=${typeId}` : '';
    return this.httpClient.get<any>(`${this.NODE_API}products?${classify}`).pipe(delay(1000));
  }

  public addNewProduct(data: Product): Observable<any> {
    return this.httpClient.post<any>(`${this.NODE_API}products`, data);
  }

  public updateProduct(id: string, data: Product): Observable<any> {
    return this.httpClient.put<any>(`${this.NODE_API}products/${id}`, data);
  }

  public deleteProduct(id:string): Observable<any> {
    return this.httpClient.delete<any>(`${this.NODE_API}products/${id}`);
  }

  public searchProduct(name?:string, type?:string, priceFrom?: string, priceTo?: string): Observable<any> {
    let search = '';
    if(name) {
      let nameSplit = name.split(' ')
      let nameJoin = nameSplit.join('+')
      search += `name=${nameJoin}`
    }
    if(type) {
      search += `&typeId=${type}`
    }
    if(priceFrom) {
      search += `&gte=${priceFrom}`
    }
    if(priceTo) {
      search += `&lte=${priceTo}`
    }
    return this.httpClient.get<any>(`${this.NODE_API}products?${search}`);
  }
}

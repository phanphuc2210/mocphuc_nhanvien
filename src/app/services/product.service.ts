import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';
import { ProductType } from '../models/productType.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private NODE_API = environment.apiURL;
  private endpoint = 'products'
  private API_URL = `${this.NODE_API}/${this.endpoint}`

  constructor(private httpClient: HttpClient) { }

  public uploadImage(data:any): Observable<any> {
    return this.httpClient.post<any>(`${this.NODE_API}/upload`, data)
  }

  public getProduct(id:string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.API_URL}/${id}`);
  }

  public getAllProducts(typeId?: string): Observable<Product[]> {
    const classify = typeId? `typeId=${typeId}` : '';
    return this.httpClient.get<Product[]>(`${this.API_URL}?${classify}`).pipe(delay(1000));
  }

  public addNewProduct(data: Product): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}`, data);
  }

  public updateProduct(id: string, data: Product): Observable<any> {
    return this.httpClient.put<any>(`${this.API_URL}/${id}`, data);
  }

  public deleteProduct(id:string): Observable<any> {
    return this.httpClient.delete<any>(`${this.API_URL}/${id}`);
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
    return this.httpClient.get<any>(`${this.API_URL}?${search}`);
  }
}

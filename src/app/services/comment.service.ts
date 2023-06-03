import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from 'src/app/models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private NODE_API = environment.apiURL
  private endpoint = 'comments'
  private API_URL = `${this.NODE_API}/${this.endpoint}`

  constructor(private httpClient: HttpClient) { }

  public getComments(productId: number | string): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${this.API_URL}/${productId}`)
  }

  public getAll(from?: string, to?: string, type?: string, wood?: string): Observable<Comment[]> {
    let query = '';
    if(from && to) {
      query += `from=${from}&to=${to}`
    }
    if(type) {
      query += `&typeId=${type}`
    }
    if(wood) {
      query += `&woodId=${wood}`
    }
    return this.httpClient.get<Comment[]>(`${this.API_URL}?${query}`)
  }

  public postComment(data: Comment): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}`, data)
  }

  public analysis(from?: string, to?: string, type?: string, wood?: string): Observable<any> {
    let query = '';
    if(from && to) {
      query += `from=${from}&to=${to}`
    }
    if(type) {
      query += `&typeId=${type}`
    }
    if(wood) {
      query += `&woodId=${wood}`
    }
    return this.httpClient.get<Comment[]>(`${this.API_URL}/analysis?${query}`)
  }
}

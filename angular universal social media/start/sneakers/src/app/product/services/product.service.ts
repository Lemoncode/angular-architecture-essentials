import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

const baseUrl = `${environment.apiUrl}/products`;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(baseUrl);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${baseUrl}/${id}`);
  }
}

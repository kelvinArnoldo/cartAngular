import { product } from '../interfaces/product.interce';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProducsService {
  private apiURL = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  getProducts():Observable<product[]>{
    return this.http.get<product[]>(this.apiURL + 'products');
  }

  updateStock(productId: number, stock: number):Observable<any>{
    const body = {"stock": stock};
    return this.http.patch<any>(this.apiURL + 'products/' + productId,body)
  }

}
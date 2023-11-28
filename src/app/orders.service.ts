import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private apiUrl = 'http://localhost:3000/api/v1/orders';

  constructor(private http: HttpClient) { }

  public getOrders(): Observable<any> {
    return this.http.get(this.apiUrl);
    
  }

  public postProduct(productData: any): Observable<any> {
    return this.http.post(this.apiUrl, JSON.stringify(productData));
  }

  public getOrderById(id:string){
    return this.http.get(`${this.apiUrl}/${id}`);
  }

    // Delete a specific order by ID
    public deleteOrderById(id: string): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${id}`);
    }
  
    // Delete all orders
    public deleteAllOrders(): Observable<any> {
      return this.http.delete(this.apiUrl);
    }

    
    public updateProductById(productId: string, productData: any): Observable<any> {
      const updateUrl = `${this.apiUrl}/product/${productId}`;
      return this.http.patch(updateUrl, productData);
    }

}

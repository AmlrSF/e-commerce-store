import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/v1/customers/';

  constructor(private http: HttpClient) { }

  public login(account : any): Observable<any> {
    return this.http.post(`${this.apiUrl}login`, JSON.stringify(account));
  }

  
  public register(account : any): Observable<any> {
    return this.http.post(`${this.apiUrl}register`, JSON.stringify(account));
  }

}

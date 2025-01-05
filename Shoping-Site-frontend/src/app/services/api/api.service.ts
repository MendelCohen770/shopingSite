import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../Models/product';
import { AuthService } from '../auth/auth.service';
import { User } from '../../Models/user';



@Injectable({
  providedIn: 'root'
})


export class ApiService {

  private usersApiUrl = 'http://localhost:5181/api/users/';
  private productsApiUrl = 'http://localhost:5181/api/products/';

  constructor(private http : HttpClient, private authService: AuthService) { }

  // users
  singUp(userData: any): Observable<any> {
    return this.http.post(`${this.usersApiUrl}signUp`,userData);
  };
  login(userData: any): Observable<any> {
    return this.http.post(`${this.usersApiUrl}login`,userData, { withCredentials: true });
  };
  logout() : Observable<any> {
    return this.http.post(`${this.usersApiUrl}logout`, {} , { withCredentials: true });
  };

  getAllUsers(): Observable<User[]>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getTokenFromCookie()}`);
    return this.http.get<User[]>(`${this.usersApiUrl}getAllUsers`, { withCredentials: true, headers: headers });
  }


  // products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productsApiUrl}`, { withCredentials: true });
  };
  addProduct(newProduct: any): Observable<any>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getTokenFromCookie()}`);
    return this.http.post(`${this.productsApiUrl}create_product`, newProduct, { withCredentials: true, headers: headers });
  };
  deleteProduct(id: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getTokenFromCookie()}`);
    return this.http.get(`${this.productsApiUrl}delete_product/${id}`, { withCredentials: true, headers: headers  });
  }
}

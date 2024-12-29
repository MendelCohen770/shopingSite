import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../Models/product';
import { UserService } from '../user.service';
import { User } from '../../Models/user';



@Injectable({
  providedIn: 'root'
})


export class ApiService {

  private usersApiUrl = 'http://localhost:5181/api/users/';
  private productsApiUrl = 'http://localhost:5181/api/products/';

  constructor(private http : HttpClient, private userService: UserService) { }

  // users
  singUp(userData: any): Observable<any> {
    return this.http.post(`${this.usersApiUrl}singUp`,userData);
  };
  login(userData: any): Observable<any> {
    return this.http.post(`${this.usersApiUrl}login`,userData, { withCredentials: true });
  };
  logout() : Observable<any> {
    return this.http.post(`${this.usersApiUrl}logout`, {} , { withCredentials: true });
  };

  getAllUsers(): Observable<User[]>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getTokenFromCookie()}`);
    return this.http.get<User[]>(`${this.usersApiUrl}getAllUsers`, { withCredentials: true, headers: headers });
  }


  // products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productsApiUrl}`, { withCredentials: true });
  };
  addProduct(newProduct: any): Observable<any>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getTokenFromCookie()}`);
    return this.http.post(`${this.productsApiUrl}create_product`, newProduct, { withCredentials: true, headers: headers });
  };
  searchProduct(name: string): Observable<any> {
    return this.http.get(`${this.productsApiUrl}search_product/${name}`, { withCredentials: true});
  };
  deleteProduct(id: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getTokenFromCookie()}`);
    return this.http.get(`${this.productsApiUrl}delete_product/${id}`, { withCredentials: true, headers: headers  });
  }
}

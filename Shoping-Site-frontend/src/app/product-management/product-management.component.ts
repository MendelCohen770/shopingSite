import { Component } from '@angular/core';
import { Product } from '../Models/product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../services/api/api.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-product-management',
  imports: [FormsModule, CommonModule],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.scss'
})
export class ProductManagementComponent {


  constructor(private router: Router, private apiService: ApiService, private authService: AuthService) { }
  name = '';
  stock = 0;
  price = 0;
  imageUrl = '';
  products: Product[] = [];
  ngOnInit(): void {
    const lastUrl = localStorage.getItem('lastUrl');
    if (this.authService.isLoggedIn() && lastUrl) {
      this.router.navigate([lastUrl]);
    } else {
      this.router.navigate(['login']);
    }
    this.apiService.getProducts().subscribe((products) => {
      this.products = products;
    })
  }



  addProduct() {
    const newProduct = {
      name: this.name,
      description: this.stock,
      price: this.price,
      imageUrl: this.imageUrl,
    }

    if (this.name && this.price && this.imageUrl && this.stock) {
      this.apiService.addProduct(newProduct).subscribe({
        next: (response) => {
          console.log("add product Success!!!", response);
          this.ngOnInit();
        },
        error: (error) => {
          console.log("Error in add product!!!", error);
        }
      })
    } else {
      console.log('You need to fill in all the details!');
    };

  }
  deleteProduct(product: Product) {
    console.log(product);

    this.apiService.deleteProduct(product.id).subscribe({
      next: (response) => {
        console.log("delete product Success!!!", response);
        this.ngOnInit();
      },
      error: (error) => {
        console.log("Error in delete product!!!", error);
      }
    })
  };

}

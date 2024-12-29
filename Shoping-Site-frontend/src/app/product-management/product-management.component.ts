import { Component } from '@angular/core';
import { Product } from '../Models/product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api/api.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-product-management',
  imports: [FormsModule, CommonModule],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.scss'
})
export class ProductManagementComponent {


  constructor(private router: Router, private apiService: ApiService, private authService: AuthService, private route: ActivatedRoute ) { }
  name = '';
  stock = 0;
  price = 0;
  imageUrl = '';
  products: Product[] = [];
  ngOnInit(): void {
    const productsResolver = this.route.snapshot.data['products'];
    if(productsResolver){
      this.products = productsResolver;
    };

    const lastUrl = localStorage.getItem('lastUrl');
    if (this.authService.isLoggedIn() && lastUrl) {
      this.router.navigate([lastUrl]);
    } else {
      this.router.navigate(['login']);
    }
  }


  addProduct() {
    const newProduct = {
      name: this.name,
      stock: this.stock,
      price: this.price,
      imageUrl: this.imageUrl,
    }

    if (this.name && this.price && this.imageUrl && this.stock) {
      this.apiService.addProduct(newProduct).subscribe({
        next: (addedProduct) => {
          console.log("add product Success!!!");
        },
        error: (error) => {
          console.log("Error in add product!!!", error);
        }
      })
    } else {
      console.log('You need to fill in all the details!');
    };
    this.apiService.getProducts().subscribe((products) => {
      this.products = products;
    });
    this.name = '';
    this.stock = 0;
    this.price = 0;
    this.imageUrl = '';
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

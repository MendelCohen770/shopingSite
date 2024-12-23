import { Component } from '@angular/core';
import {Product} from '../Models/product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-management',
  imports: [FormsModule, CommonModule],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.scss'
})
export class ProductManagementComponent {
  constructor(private router : Router) { }

  products: Product[] = [
    { id: 1, name: 'Product 1', description: 'Description 1', price: 100, imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Product 2', description: 'Description 2', price: 200, imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product 3', description: 'Description 3', price: 300, imageUrl: 'https://via.placeholder.com/150' },
    // הוסף מוצרים נוספים כאן
  ];


  newProduct: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
  };

  addProduct() {
    if (this.newProduct.name && this.newProduct.price && this.newProduct.imageUrl) {
      this.newProduct.id = this.products.length + 1;
      this.products.push({ ...this.newProduct });
      this.newProduct = { id: 0, name: '', description: '', price: 0, imageUrl: '' };
    }
  }

  deleteProduct(product: Product) {
    this.products = this.products.filter((p) => p.id !== product.id);
  }
  
}

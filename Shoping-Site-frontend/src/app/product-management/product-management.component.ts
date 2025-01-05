import { Component} from '@angular/core';
import { Product } from '../Models/product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api/api.service';
import { ToastService } from '../services/toast/toast.service';

@Component({
  selector: 'app-product-management',
  imports: [FormsModule, CommonModule],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.scss'
})
export class ProductManagementComponent {

  name: string = '';
  stock: number = 0;
  price: number = 0;
  imageUrl: string = '';
  products: Product[] = [];

  constructor(
    private apiService: ApiService,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.apiService.getProducts().subscribe(products => {
      this.products = products;
    })
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
        next: () => {
          this.toastService.success('product added successfully!!!')
        },
        error: (error) => {
          this.toastService.error('Failed to add product, please try again!!!');
          console.log(error);
        }
      })
    } else {
      this.toastService.warning('Please fill all required fields!!!');
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
    this.apiService.deleteProduct(product.id).subscribe({
      next: () => {
        this.toastService.success('product deleted successfully!!!')
        this.apiService.getProducts().subscribe((products) => {
          this.products = products;
        });
      },
      error: (error) => {
        this.toastService.error('Error in delete product!!!')
        console.log(error);
      }
    })
  };

}

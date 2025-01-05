import { Component} from '@angular/core';
import { Product } from '../Models/product'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-products',
  imports: [FormsModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  noResults: boolean = false;
 

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  this.apiService.getProducts().subscribe((products) => {
        this.products = products;
        this.filteredProducts = products;
      });
    };
      onSearchChange(): void {
    if (this.searchTerm.trim()) { 
      this.filteredProducts = this.products.filter((product) => product.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
      this.noResults = this.filteredProducts.length === 0;
    } else {
      this.filteredProducts = this.products;
      this.noResults = false;
    }
  }
}

import { Component } from '@angular/core';
import { Product } from '../Models/product'; // ייבוא המודל של המוצר
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  imports: [FormsModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  products: Product[] = [
    { id: 1, name: 'Product 1', description: 'Description 1', price: 100, imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Product 2', description: 'Description 2', price: 200, imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product 3', description: 'Description 3', price: 300, imageUrl: 'https://via.placeholder.com/150' },
    // הוסף מוצרים נוספים כאן
  ];

  filteredProducts: Product[] = [];
  searchTerm: string = '';

  constructor(private router : Router) { }

  ngOnInit(): void {
    this.filteredProducts = this.products; // אתחול המוצרים המוצגים
  }
  onSearchChange(): void {
    if (this.searchTerm.trim()) {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredProducts = this.products; // אם החיפוש ריק, מציג את כל המוצרים
    }
  }
  navigateToProductManagement() {
    this.router.navigate(['/manage-products'])
  }
}

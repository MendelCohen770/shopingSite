import { Component } from '@angular/core';
import { Product } from '../Models/product'; // ייבוא המודל של המוצר
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../services/api/api.service';
import { AuthService } from '../services/auth/auth.service';


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

  constructor(private router: Router, private apiService: ApiService, private authService: AuthService) { }

  ngOnInit(): void {
    const lastUrl = localStorage.getItem('lastUrl');
    if (this.authService.isLoggedIn() && lastUrl) {
      this.router.navigate([lastUrl]);
    } else {
      this.router.navigate(['login']);
    }
    this.apiService.getProducts().subscribe((products) => {
      this.products = products;
      this.filteredProducts = products;
    })
  }
  onSearchChange(): void {
    if (this.searchTerm.trim()) {
      this.apiService.searchProduct(this.searchTerm).subscribe({
        next: (products) => {
          if (products.length === 0) {
            this.filteredProducts = [];
            this.noResults = true; // אין תוצאות, מציג הודעה
          } else {
            this.filteredProducts = products;
            this.noResults = false; // יש תוצאות
          }
        },
        error: (error) => {
          console.error("Error fetching products", error);
          this.filteredProducts = [];
          this.noResults = true; // במקרה של שגיאה בשרת
        },
      });
    } else {
      this.filteredProducts = this.products; // אם אין חיפוש, מציג את כל המוצרים
      this.noResults = false; // מאתחל את ההודעה
    }
  }

  


}
